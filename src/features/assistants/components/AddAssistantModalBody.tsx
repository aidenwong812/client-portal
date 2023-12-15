import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { AppDispatch } from "../../../app/store"
import { addNewAssistant, updateAssistant } from "../assistantsSlice"

const INITIAL_ASSISTANT_OBJ = {
  assistant_name: "",
  description: "",
  mainColor: "blue",
  launcherImage: "/logo.png",
  assistantImage: "/logo.png",
  assistantAvatar: "/logo.png",
  greeting: "How can I help you",
  date: ""
}

type PropTypes = {
  closeModal: () => void,
  extraObject?: {
    id?: string
    assistant_name: string,
    description: string,
    mainColor: string,
    launcherImage: string,
    assistantImage: string,
    assistantAvatar: string,
    greeting: string,
  }
}

interface MainColors {
  [key: string]: string
}

const mainColors: MainColors = {
  blue: "from-blue-400 to-blue-600",
  sky: "from-sky-800 to-sky-900",
  green: "from-green-400 to-green-600",
  orange: "from-orange-400 to-orange-600",
  red: "from-red-400 to-red-600",
  pink: "from-pink-400 to-pink-600",
};

function AddAssistantModalBody({ closeModal, extraObject }: PropTypes) {
  const dispatch: AppDispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  const isNew = extraObject ? false : true

  const [errorMessage, setErrorMessage] = useState("")
  const [assistant, setAssistant] = useState(extraObject ? extraObject : INITIAL_ASSISTANT_OBJ)

  const handleMainColor = (color: string) => {
    setAssistant({ ...assistant, mainColor: color })
  }

  const handleFile = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target.files) {
      // setAssistant({ ...assistant, [type]: e.target.files[0].name })
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onloadend = function () {
        setAssistant({ ...assistant, [type]: reader.result })
      }
    }
  }

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
      <InputText type="text" defaultValue={assistant.assistant_name} updateType="assistant_name" containerStyle="mt-1" labelTitle="Name" updateFormValue={updateFormValue} />

      <InputText type="text" defaultValue={assistant.description} updateType="description" containerStyle="mt-1" labelTitle="Description" updateFormValue={updateFormValue} />

      <InputText type="text" defaultValue={assistant.greeting} updateType="greeting" containerStyle="mt-1" labelTitle="Greeting" updateFormValue={updateFormValue} />

      <div className="mt-2">
        <label className="label">
          <span className="label-text text-base-content">Main Color</span>
        </label>
        <div className="flex items-center gap-2">
          {Object.keys(mainColors).map((color) => (
            <span
              key={color}
              className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${mainColors[color]
                } ${assistant.mainColor === color ? "border-black" : "border-transparent"
                }`}
              onClick={() => handleMainColor(color)}
            />
          ))}
        </div>
      </div>

      <div className="mt-2">
        <label className="label">
          <span className="label-text text-base-content">Launcher</span>
        </label>
        <div className="flex gap-5">
          <img className="w-12 h-12 rounded-full" src={assistant.launcherImage} alt="Launcher Image" />
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, 'launcherImage')} className="file-input file-input-bordered" />
        </div>
      </div>

      <div className="mt-2">
        <label className="label">
          <span className="label-text text-base-content">Assistant Image</span>
        </label>
        <div className="flex gap-5">
          <img className="w-12 h-12 rounded-full" src={assistant.assistantImage} alt="Assistant Image" />
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, 'assistantImage')} className="file-input file-input-bordered" />
        </div>
      </div>

      <div className="mt-2">
        <label className="label">
          <span className="label-text text-base-content">Assistant Avatar</span>
        </label>
        <div className="flex gap-5">
          <img className="w-12 h-12 rounded-full" src={assistant.assistantAvatar} alt="Assistant Avatar" />
          <input type="file" accept="image/*" onChange={(e) => handleFile(e, 'assistantAvatar')} className="file-input file-input-bordered" />
        </div>
      </div>

      <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => saveNewAssistant()}>Save</button>
      </div>
    </>
  )
}

export default AddAssistantModalBody