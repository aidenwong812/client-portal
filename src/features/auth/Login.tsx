import { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
// import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

function Login() {

  const INITIAL_LOGIN_OBJ = {
    password: "",
    email: ""
  }

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

  const submitForm = (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (loginObj.email.trim() === "") return setErrorMessage("Email Id is required!")
    if (loginObj.password.trim() === "") return setErrorMessage("Password is required!")
    else {
      setLoading(true)
      // Call API to check user credentials and save token in localstorage
      localStorage.setItem("token", "DumyTokenHere")
      setLoading(false)
      window.location.href = '/app/assistants'
    }
  }

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("")
    setLoginObj({ ...loginObj, [updateType]: value })
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-[90%] shadow-xl sm:max-w-xl">
        <div className="grid grid-cols-1  bg-base-100 rounded-xl">
          {/* <div className=''>
            <LandingIntro />
          </div> */}
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
            <form onSubmit={(e) => submitForm(e)}>

              <div className="mb-4">

                <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />

                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

              </div>

              <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

              <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login