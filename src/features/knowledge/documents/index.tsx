// import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../../components/Cards/TitleCard"
import SearchBar from "../../../components/Input/SearchBar"
// import { CheckIcon } from "@heroicons/react/24/solid"
// import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PlusSmallIcon from '@heroicons/react/24/outline/PlusSmallIcon'
import { FaceFrownIcon } from "@heroicons/react/24/outline"
import { openModal } from "../../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil"
import { AppDispatch, RootState } from "../../../app/store"
import { getKnowledgeContent } from "../knowledgeSlice"
import { getAssistantContent } from "../../assistants/assistantsSlice"
import AssistantSettingModal from "../components/AssistantSettingModal"

type PropTypes = {
  applySearch: (value: string) => void,
  selected: string
}

const TopSideButtons = ({ applySearch, selected }: PropTypes) => {

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState("")

  const removeAppliedFilter = () => {
    setSearchText("")
  }

  const openAddNewKnowledgeModal = (type_of_knowledge: string, assistant_id: string) => {
    dispatch(openModal({ title: "Add New Knowledge", bodyType: MODAL_BODY_TYPES.KNOWLEDGE_ADD_NEW, extraObject: { type: type_of_knowledge, assistant_id: assistant_id } }))
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
      <div className="dropdown dropdown-bottom dropdown-end">
        <button tabIndex={0} className="btn px-3 btn-sm normal-case btn-primary text-white sm:px-6" disabled={selected === "-1"}>
          <PlusSmallIcon className="w-6 h-6 sm:hidden" />
          <span className="hidden sm:block">Add New</span>
        </button>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow w-32 bg-primary text-white mt-1 rounded-xl">
          <li><button onClick={() => openAddNewKnowledgeModal('URL', selected)}>URL</button></li>
          <li><button onClick={() => openAddNewKnowledgeModal('file', selected)}>File</button></li>
        </ul>
      </div>
    </div>
  )
}


function Documents() {

  const { knowledges, isLoading } = useSelector((state: RootState) => state.knowledge)
  const { assistants } = useSelector((state: RootState) => state.assistant)
  const dispatch: AppDispatch = useDispatch()

  const [knowledgeBase, setKnowledgeBase] = useState(knowledges)
  const [selectedAssistance, setSelectedAssistance] = useState("-1")
  const [assistantModalOpen, setAssistantModalOpen] = useState(false)

  useEffect(() => {
    dispatch(getAssistantContent())
  }, [])

  useEffect(() => {
    dispatch(getKnowledgeContent(selectedAssistance))
  }, [selectedAssistance])

  useEffect(() => {
    setKnowledgeBase(knowledges)
  }, [knowledges])

  // Search according to name
  const applySearch = (value: string) => {
    const filteredKnowledges = knowledges.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) || t.name.toLowerCase().includes(value.toLowerCase()) })
    setKnowledgeBase(filteredKnowledges)
  }

  // const getStatus = (status: string) => {
  //   switch (status) {
  //     case 'pending':
  //       return <span className="loading loading-spinner text-primary"></span>
  //     case 'success':
  //       return <CheckIcon className="w-8 h-8 text-accent" />
  //     case 'fail':
  //       return <XMarkIcon className="w-8 h-8 text-secondary" />
  //     default:
  //       return null
  //   }
  // }

  const deleteCurrentKnowledge = (id: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this knowledge base?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.KNOWLEDGE_DELETE, id }
    }))
  }

  const changeSelectedAssistant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAssistance(e.target.value)
  }

  const handleAssistantModalOpen = () => {
    setAssistantModalOpen(false);
  }

  const assistantsSelect = (
    <div className="flex items-center">
      <select className="select select-bordered select-sm max-w-xs mr-5 input-sm w-full" value={selectedAssistance} onChange={e => changeSelectedAssistant(e)}>
        <option disabled value='-1'>Choose Assistant</option>
        {
          assistants.map(assistant => assistant.assistant_name && (
            <option key={assistant.id} value={assistant.id}>{assistant.assistant_name}</option>
          ))
        }
      </select>
    </div>
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-infinity w-32 h-32"></span>
      </div>
    );
  }

  return (
    <>
      <TitleCard title={assistantsSelect} topMargin="mt-2" TopSideButtons={<TopSideButtons selected={selectedAssistance} applySearch={applySearch} />}>

        {/* Team Member list in table format loaded constant */}
        {
          knowledgeBase.length !== 1 || knowledgeBase[0].name !== "" ? (
            <div className="overflow-x-auto w-full">
              <table className="table w-full table-sm lg:table-lg">
                <thead>
                  <tr className="text-sm">
                    <th className="w-12 text-center">No</th>
                    <th className="text-center">Name</th>
                    <th className="text-center">Type</th>
                    {/* <th className="text-center">Status</th> */}
                    <th className="text-center">Date</th>
                    <th className="w-12 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    knowledgeBase.map((l, k) => l.id && (
                      <tr key={k}>
                        <td className="text-center">{k + 1}</td>
                        <td>
                          <div className="font-bold">{l.name}</div>
                        </td>
                        <td>{l.type_of_knowledge}</td>
                        {/* <td>{getStatus(l.status)}</td> */}
                        <td>{l.date}</td>
                        <td className="text-right">
                          <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentKnowledge(l.id)}>
                            <TrashIcon className="w-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-2xl flex justify-center items-center gap-2 text-center">
              <FaceFrownIcon className="w-12 h-12" />
              No Knowledge Base
            </div>
          )}
      </TitleCard>
      <AssistantSettingModal isOpen={assistantModalOpen} closeModal={handleAssistantModalOpen} />
    </>
  )
}

export default Documents