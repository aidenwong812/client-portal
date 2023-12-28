// import { useState } from "react"
import { MinusSmallIcon, PlusSmallIcon, TrashIcon } from "@heroicons/react/24/outline"

type PropTypes = {
  id: string,
  // defaultValue: string,
  // updateFormValue: (updateType: string, value: string) => void,
  handleDelete: (id: string) => void,
  // updateType: string
}

function InputFAQ({ id, handleDelete }: PropTypes) {

  // const [value, setValue] = useState(defaultValue)

  // const updateInputValue = (val: string) => {
  //   setValue(val)
  //   updateFormValue(updateType, val)
  // }

  return (
    <div className="collapse bg-base-200 rounded-md border border-gray-700">
      <input type="checkbox" className="peer" />
      <div className="collapse-title font-semibold text-sm flex items-center justify-between py-2">
        <span>FAQ</span>
      </div>
      <button className="btn btn-square btn-xs absolute right-10 top-4 z-10" onClick={() => handleDelete(id)}>
        <TrashIcon className="w-4 h-4 text-red-500" />
      </button>
      <button className="btn btn-square btn-xs peer-checked:hidden absolute right-3 top-4">
        <PlusSmallIcon className="w-4 h-4" />
      </button>
      <button className="btn btn-square btn-xs hidden peer-checked:block absolute right-2 top-4">
        <MinusSmallIcon className="w-4 h-4" />
      </button>
      <div className="collapse-content border-t border-gray-700">
        <div className="form-control w-full mt-4 flex flex-row items-center">
          <label className="label w-1/6">
            <span className="label-text text-base-content"> Question </span>
          </label>
          <input type="text" className="input input-sm input-bordered w-5/6" />
        </div>
        <div className="form-control w-full mt-4 flex flex-row items-center">
          <label className="label w-1/6">
            <span className="label-text text-base-content"> Answer </span>
          </label>
          <input type="text" className="input input-sm input-bordered w-5/6" />
        </div>
      </div>
    </div>
  )
}


export default InputFAQ