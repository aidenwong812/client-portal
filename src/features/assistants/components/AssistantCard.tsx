import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon"
import { useDispatch } from 'react-redux'
import { openModal } from '../../common/modalSlice'
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from '../../../utils/globalConstantUtil'

type PropTypes = {
  assistant: {
    id: string,
    assistant_name: string,
    date?: string
  }
}

function AssistantCard({ assistant }: PropTypes) {

  const dispatch = useDispatch();

  const deleteCurrentAssistant = (id: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this assistant?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.KNOWLEDGE_DELETE, id }
    }))
  }

  const editCurrentAssistant = () => {
    dispatch(openModal({ title: "Edit Assistant", bodyType: MODAL_BODY_TYPES.ASSISTANT_UPDATE, extraObject: { id: assistant.id, assistant_name: assistant.assistant_name } }))
  }

  return (
    <div className="group relative">
      <div className="card card-compact bg-base-100 shadow-xl transition duration-300 ease-in-out group-hover:opacity-30 group">
        <figure><img className="w-48 h-48" src="/logo.png" alt="bot" /></figure>
        <div className="card-body">
          <h2 className="card-title">{assistant.assistant_name}</h2>
          <p>Last edited 3 days ago</p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full hidden justify-center group-hover:flex group-hover:block">
        <div className="flex items-center gap-4">
          <button className="btn btn-circle" onClick={() => editCurrentAssistant()}>
            <PencilSquareIcon className='w-6 h-6' />
          </button>
          <button className="btn btn-circle" onClick={() => deleteCurrentAssistant(assistant.id)}>
            <TrashIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssistantCard