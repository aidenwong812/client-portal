import { MODAL_BODY_TYPES } from '../utils/globalConstantUtil'
import { useSelector, useDispatch } from 'react-redux'
import { closeModal } from '../features/common/modalSlice'
import ConfirmationModalBody from '../features/common/components/ConfirmationModalBody'
import AddPrePromptModalBody from '../features/prompts/components/AddPrePromptModalBody'
import AddCloserPromptModalBody from '../features/prompts/components/AddCloserPromptModalBody'
import AddPushPromptModalBody from '../features/prompts/components/AddPushPromptModalBody'
import AddKnowledgeModalBody from '../features/knowledge/components/AddKnowledgeModalBody'
import AddAssistantModalBody from '../features/assistants/components/AddAssistantModalBody'
import { RootState } from '../app/store'


function ModalLayout() {
  const { isOpen, bodyType, size, extraObject, title } = useSelector((state: RootState) => state.modal)
  const dispatch = useDispatch()

  const close = () => {
    dispatch(closeModal())
  }

  return (
    <>
      {/* The button to open modal */}

      {/* Put this part before </body> tag */}
      <div className={`modal ${isOpen ? "modal-open" : ""}`}>
        <div className={`modal-box  ${size === 'lg' ? 'max-w-5xl' : ''}`}>
          <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => close()}>✕</button>
          <h3 className="font-semibold text-2xl pb-6 text-center">{title}</h3>

          {/* Loading modal body according to different modal type */}
          {
            {
              [MODAL_BODY_TYPES.PRE_PROMPT_ADD_NEW]: <AddPrePromptModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.PRE_PROMPT_UPDATE]: <AddPrePromptModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.CLOSER_PROMPT_ADD_NEW]: <AddCloserPromptModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.CLOSER_PROMPT_UPDATE]: <AddCloserPromptModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.PUSH_PROMPT_ADD_NEW]: <AddPushPromptModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.PUSH_PROMPT_UPDATE]: <AddPushPromptModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.KNOWLEDGE_ADD_NEW]: <AddKnowledgeModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.KNOWLEDGE_UPDATE]: <AddKnowledgeModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.ASSISTANT_ADD_NEW]: <AddAssistantModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.ASSISTANT_UPDATE]: <AddAssistantModalBody closeModal={close} extraObject={extraObject} />,
              [MODAL_BODY_TYPES.CONFIRMATION]: <ConfirmationModalBody extraObject={extraObject} closeModal={close} />,
              [MODAL_BODY_TYPES.DEFAULT]: <div></div>
            }[bodyType]
          }
        </div>
      </div>
    </>
  )
}

export default ModalLayout