import { ChangeEvent, useState } from "react"

type PropTypes = {
  labelTitle: string,
  labelStyle?: string,
  containerStyle: string,
  defaultValue: string,
  placeholder?: string,
  updateFormValue: (updateType: string, value: string | File) => void,
  updateType: string,
  acceptedFile: string
}

function InputFile({ labelTitle, labelStyle, containerStyle, defaultValue, placeholder, updateFormValue, acceptedFile }: PropTypes) {

  const [value, setValue] = useState(defaultValue)

  const updateInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setValue(e.target.files[0].name)
      updateFormValue("file", e.target.files[0])
    }
  }

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}> {labelTitle} </span>
      </label>
      <input type="file" value={value} placeholder={placeholder || ""} onChange={(e) => updateInputValue(e)} className="file-input file-input-bordered w-full" accept={acceptedFile} />
    </div>
  )
}


export default InputFile