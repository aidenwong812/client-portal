import CloserPrompts from "./components/CloserPrompts"
import PrePrompts from "./components/PrePrompts"
import PushPrompts from "./components/PushPrompts"

function Prompts() {
  return (
    <div className="grid">
      <div role="tablist" className="tabs tabs-lifted justify-self-start w-full lg:tabs-lg">
        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="PrePrompts" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <PrePrompts />
        </div>

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="CloserPrompts" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <CloserPrompts />
        </div>

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="PushPrompts" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <PushPrompts />
        </div>
      </div>
    </div>
  )
}

export default Prompts