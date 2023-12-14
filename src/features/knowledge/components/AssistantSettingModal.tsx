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
import { Assistant } from "../../../utils/Type"

type TopSidePropTypes = {
  applySearch: Function
}

type PropTypes = {
  isOpen: boolean,
  closeModal: () => void,
}

const TopSideButtons = ({ applySearch }: TopSidePropTypes) => {

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState("")

  const removeAppliedFilter = () => {
    setSearchText("")
  }

  const openAddNewPromptModal = () => {
    dispatch(openModal({ title: "Add Assistant", bodyType: MODAL_BODY_TYPES.ASSISTANT_ADD_NEW }))
  }

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter()
    } else {
      applySearch(searchText)
    }
  }, [searchText])

  return (
    <>
      <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
      <button className="btn px-3 btn-sm normal-case btn-primary text-white" onClick={() => openAddNewPromptModal()}>
        <PlusSmallIcon className="w-6 h-6" />
      </button>
    </>
  )
}

function AssistantSettingModal({ isOpen, closeModal }: PropTypes) {

  const { assistants, isLoading } = useSelector((state: RootState) => state.assistant)
  const dispatch: AppDispatch = useDispatch()

  const [assistant, setAssistant] = useState(assistants)

  useEffect(() => {
    setAssistant(assistants);
  }, [assistants])

  // Search according to name
  const applySearch = (value: string) => {
    let filteredPrompts = assistants.filter((t) => { return t.assistant_name.toLowerCase().includes(value.toLowerCase()) })
    setAssistant(filteredPrompts)
  }

  const deleteCurrentAssistant = (id: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this assistant?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.ASSISTANT_DELETE, id }
    }))
  }

  const editCurrentAssistant = (assistant: Assistant) => {
    dispatch(openModal({ title: "Edit Assistant", bodyType: MODAL_BODY_TYPES.ASSISTANT_UPDATE, extraObject: assistant }))
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-infinity w-32 h-32"></span>
      </div>
    );
  }

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box">
        <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
        <TitleCard title="Assistant" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>

          {/* Team Member list in table format loaded constant */}
          {
            assistant.length !== 1 || assistant[0].assistant_name !== "" ? (
              <div className="overflow-x-auto w-full">
                <table className="table w-full table-sm">
                  <thead>
                    <tr className="text-sm">
                      <th className="w-12 text-center">No</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Date</th>
                      <th className="w-12 text-right"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      assistant.map((l, k) => {
                        return (
                          <tr key={k}>
                            <td className="text-center">{k + 1}</td>
                            <td>
                              <div className="font-bold text-center">{l.assistant_name}</div>
                            </td>
                            <td>{l.date}</td>
                            <td className="text-right">
                              <div className="flex">
                                <button className="btn btn-square btn-ghost btn-sm" onClick={() => editCurrentAssistant(l)}><PencilSquareIcon className="w-5" /></button>
                                <button className="btn btn-square btn-ghost btn-sm" onClick={() => deleteCurrentAssistant(l.id)}><TrashIcon className="w-5" /></button>
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
                No Assistant
              </div>
            )
          }
        </TitleCard>

        <div className="modal-action">
          <button className="btn" onClick={() => closeModal()}>Close</button>
        </div>
      </div>
    </div>
  )
}


export default AssistantSettingModal