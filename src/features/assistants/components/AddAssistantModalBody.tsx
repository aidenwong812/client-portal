import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { AppDispatch } from "../../../app/store"
import { addNewAssistant, updateAssistant } from "../assistantsSlice"

const INITIAL_ASSISTANT_OBJ = {
  assistant_name: "",
  date: ""
}

type PropTypes = {
  closeModal: () => void,
  extraObject?: {
    id?: string
    assistant_name: string,
  }
}

function AddAssistantModalBody({ closeModal, extraObject }: PropTypes) {
  const dispatch: AppDispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  const isNew = extraObject ? false : true

  const [errorMessage, setErrorMessage] = useState("")
  const [assistant, setAssistant] = useState(extraObject ? extraObject : INITIAL_ASSISTANT_OBJ)

  const saveNewAssistant = () => {
    if (assistant.assistant_name.trim() === "") return setErrorMessage("Assistant Name required!")
    else {
      let newAssistant = {
        assistant_name: assistant.assistant_name,
      }

      if (isNew) {
        dispatch(addNewAssistant(newAssistant))
          .then(res => {
            if (res.payload?.id)
              dispatch(showNotification({ message: "New Assistant Added!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
      } else {
        dispatch(updateAssistant(newAssistant))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Assistant Updated!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
      }

      closeModal()
    }
  }

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("")
    setAssistant({ ...assistant, [updateType]: value })
  }

  return (
    <>
      <InputText type="text" defaultValue={assistant.assistant_name} updateType="assistant_name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => saveNewAssistant()}>Save</button>
      </div>
    </>
  )
}

export default AddAssistantModalBody