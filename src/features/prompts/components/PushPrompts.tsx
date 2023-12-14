// import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../../components/Cards/TitleCard"
import SearchBar from "../../../components/Input/SearchBar"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon"
import PlusSmallIcon from '@heroicons/react/24/outline/PlusSmallIcon'
import { FaceFrownIcon } from "@heroicons/react/24/outline"
import { openModal } from "../../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil"
import { AppDispatch, RootState } from "../../../app/store"
import { getPushPromptsContent } from "../pushPromptsSlice"
import { Prompt } from "../../../utils/Type"

type PropTypes = {
  applySearch: Function
}

const TopSideButtons = ({ applySearch }: PropTypes) => {

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState("")

  const removeAppliedFilter = () => {
    setSearchText("")
  }

  const openAddNewPromptModal = () => {
    dispatch(openModal({ title: "Add New Prompt", bodyType: MODAL_BODY_TYPES.PUSH_PROMPT_ADD_NEW }))
  }

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter()
    } else {
      applySearch(searchText)
    }
  }, [searchText])

  return (
    <div className="flex items-center">
      <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
      <button className="btn px-3 btn-sm normal-case btn-primary text-white sm:px-6" onClick={() => openAddNewPromptModal()}>
        <PlusSmallIcon className="w-6 h-6 sm:hidden" />
        <span className="hidden sm:block">Add New</span>
      </button>
    </div>
  )
}

function PushPrompts() {

  const { pushPrompts, isLoading } = useSelector((state: RootState) => state.pushPrompt)
  const dispatch: AppDispatch = useDispatch()

  const [prompts, setPrompts] = useState(pushPrompts)

  useEffect(() => {
    dispatch(getPushPromptsContent())
  }, [])

  useEffect(() => {
    setPrompts(pushPrompts);
  }, [pushPrompts])

  // Search according to name
  const applySearch = (value: string) => {
    let filteredPrompts = pushPrompts.filter((t) => { return t.prompt.toLowerCase().includes(value.toLowerCase()) })
    setPrompts(filteredPrompts)
  }

  const deleteCurrentPrompt = (id: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this prompt?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.PUSH_PROMPT_DELETE, id }
    }))
  }

  const editCurrentPrompt = (prompt: Prompt) => {
    dispatch(openModal({ title: "Edit Prompt", bodyType: MODAL_BODY_TYPES.PUSH_PROMPT_UPDATE, extraObject: prompt }))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-infinity w-32 h-32"></span>
      </div>
    );
  }

  return (
    <TitleCard title="PushPrompts" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>

      {/* Team Member list in table format loaded constant */}
      {
        prompts.length !== 1 || prompts[0].title !== "" ? (
          <div className="overflow-x-auto w-full">
            <table className="table w-full table-sm lg:table-lg">
              <thead>
                <tr className="text-sm">
                  <th className="w-12 text-center">No</th>
                  <th className="text-center">Prompt</th>
                  <th className="text-center">Date</th>
                  <th className="w-12 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {
                  prompts.map((l, k) => {
                    return (
                      <tr key={k}>
                        <td className="text-center">{k + 1}</td>
                        <td>{l.prompt}</td>
                        <td>{l.date}</td>
                        <td className="text-right">
                          <div className="flex">
                            <button className="btn btn-square btn-ghost btn-sm" onClick={() => editCurrentPrompt(l)}><PencilSquareIcon className="w-5" /></button>
                            <button className="btn btn-square btn-ghost btn-sm" onClick={() => deleteCurrentPrompt(l.id)}><TrashIcon className="w-5" /></button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-2xl flex justify-center items-center gap-2 text-center">
            <FaceFrownIcon className="w-12 h-12" />
            No PushPrompt
          </div>
        )
      }
    </TitleCard>
  )
}


export default PushPrompts