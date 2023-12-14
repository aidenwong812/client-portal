import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewKnowledge, updateKnowledge } from "../knowledgeSlice"
import { AppDispatch } from "../../../app/store"

const INITIAL_KNOWLEDGE_OBJ = {
  name: "",
  type: "",
  status: "",
  date: ""
}

type PropTypes = {
  closeModal: () => void,
  extraObject: {
    id?: string
    name: string,
    type: string,
    status: string,
    assistant_id: string
  }
}

function AddKnowledgeModalBody({ closeModal, extraObject }: PropTypes) {
  const dispatch: AppDispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  const isNew = extraObject?.id ? false : true

  const [errorMessage, setErrorMessage] = useState("")
  const [knowledge, setKnowledge] = useState(extraObject ? extraObject : INITIAL_KNOWLEDGE_OBJ)
  const [file, setFile] = useState<File>()

  const saveNewKnowledge = () => {
    if (knowledge.name.trim() === "") return setErrorMessage("Incorrect Input!")
    else {
      let newKnowledge = {
        name: knowledge.name,
        type_of_knowledge: knowledge.type,
        assistant_id: extraObject.assistant_id,
        status: "pending",
        file: file
      }

      if (isNew) {
        dispatch(addNewKnowledge(newKnowledge))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "New Knowledge Base Added!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
      } else {
        dispatch(updateKnowledge(newKnowledge))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Knowledge Base Updated!", status: 1 }))
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

  const updateFormValue = (updateType: string, value: string | File) => {
    setErrorMessage("")
    setKnowledge({ ...knowledge, [updateType]: value })
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
      setKnowledge({ ...knowledge, name: e.target.files[0].name });
    }
  }

  return (
    <>
      {
        knowledge.type === "URL" ? (
          <InputText type="text" defaultValue={knowledge.name ? knowledge.name : ""} updateType="name" containerStyle="mt-4" labelTitle="URL" updateFormValue={updateFormValue} />
        ) : (
          // <InputFile defaultValue={knowledge.name ? knowledge.name : ""} updateType="name" containerStyle="mt-4" labelTitle="File" updateFormValue={updateFormValue} acceptedFile=".txt, .xlsx" />
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text text-base-content"> File </span>
            </label>
            <input type="file" onChange={(e) => handleFile(e)} className="file-input file-input-bordered w-full" />
          </div>
        )
      }

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => saveNewKnowledge()}>Save</button>
      </div>
    </>
  )
}

export default AddKnowledgeModalBody