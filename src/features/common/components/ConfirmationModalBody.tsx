import { useDispatch } from 'react-redux'
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { showNotification } from '../headerSlice'
import { deletePrePrompt } from '../../prompts/prePromptsSlice'
import { deleteCloserPrompt } from '../../prompts/closerPromptsSlice'
import { deletePushPrompt } from '../../prompts/pushPromptsSlice'
import { AppDispatch } from '../../../app/store'
import { deleteKnowledge } from '../../knowledge/knowledgeSlice'
import { deleteAssistant } from '../../assistants/assistantsSlice'

type PropTypes = {
  extraObject: {
    message: string,
    type: string,
    id: string
  },
  closeModal: () => void
}

function ConfirmationModalBody({ extraObject, closeModal }: PropTypes) {

  const dispatch: AppDispatch = useDispatch()

  const { message, type, id } = extraObject

  const proceedWithYes = async () => {
    switch (type) {
      case CONFIRMATION_MODAL_CLOSE_TYPES.PRE_PROMPT_DELETE:
        dispatch(deletePrePrompt(id))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Prompt Deleted!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          });
        break;
      case CONFIRMATION_MODAL_CLOSE_TYPES.CLOSER_PROMPT_DELETE:
        dispatch(deleteCloserPrompt(id))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Prompt Deleted!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          });
        break;
      case CONFIRMATION_MODAL_CLOSE_TYPES.PUSH_PROMPT_DELETE:
        dispatch(deletePushPrompt(id))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Prompt Deleted!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          });
        break;
      case CONFIRMATION_MODAL_CLOSE_TYPES.KNOWLEDGE_DELETE:
        dispatch(deleteKnowledge(id))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Knowledge Base Deleted!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          });
        break;
      case CONFIRMATION_MODAL_CLOSE_TYPES.ASSISTANT_DELETE:
        dispatch(deleteAssistant(id))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Assistant Deleted!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          });
        break;
      default: break;
    }
    closeModal()
  }

  return (
    <>
      <p className=' text-xl mt-0 text-center'>
        {message}
      </p>

      <div className="modal-action mt-8 gap-8">

        <button className="btn btn-outline" onClick={() => closeModal()}>Cancel</button>

        <button className="btn btn-primary w-20" onClick={() => proceedWithYes()}>Yes</button>

      </div>
    </>
  )
}

export default ConfirmationModalBody