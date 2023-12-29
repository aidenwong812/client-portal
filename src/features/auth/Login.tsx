import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from "@react-oauth/google"
// import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import axios from 'axios';

function Login() {

  const INITIAL_LOGIN_OBJ = {
    password: "",
    email: ""
  }

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)

  const navigate = useNavigate()

  const handleAuth = () => {
    setErrorMessage("")

    if (loginObj.email.trim() === "") return setErrorMessage("Email is required!")
    if (loginObj.password.trim() === "") return setErrorMessage("Password is required!")
    else {
      // setLoading(true)
      // Call API to check user credentials and save token in localstorage
      // axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/login`, {
      //   email: loginObj.email,
      //   password: loginObj.password
      // })
      //   .then(res => {
      //     if (res.status === 200) {
      //       localStorage.setItem("token", res.data.result)
      //       setLoading(false)
            navigate('/app/assistants')
        //   }
        //   setLoading(false)
        // })
        // .catch(err => {
        //   console.log(err);
        //   setLoading(false)
        //   if (err.response.data.result) {
        //     setErrorMessage(err.response.data.result)
        //   }
        // })
    }
  }

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: tokenResponse => {
      axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + tokenResponse.access_token)
        .then(res => {
          if (res.data) {
            if (!res.data.verified_email) return setErrorMessage("Please verify your email!")

            axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/google_auth`, {
              name: res.data.name,
              email: res.data.email,
            })
              .then(res => {
                if (res.status === 200 || res.status === 201) {
                  localStorage.setItem("token", res.data.result)
                  setLoading(false)
                  navigate('/app/assistants')
                }
                setLoading(false)
              })
          }
        })
        .catch(err => {
          console.log(err);
          setLoading(false)
          if (err.response.data.result) {
            setErrorMessage(err.response.data.result)
          }
        })
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("")
    setLoginObj({ ...loginObj, [updateType]: value })
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-[90%] shadow-xl sm:max-w-xl">
        <div className="grid grid-cols-1 bg-base-100 rounded-xl">
          {/* <div className=''>
            <LandingIntro />
          </div> */}
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
            <div className='flex flex-col'>

              <div className="mb-4">

                <InputText type="email" defaultValue={loginObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />

                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

              </div>

              <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                className="btn mt-2 w-full btn-primary"
                onClick={() => handleAuth()}
              >
                <span className={loading ? "loading loading-spinner" : ""}>
                  SIGN IN
                </span>
              </button>
              <button
                className="btn btn-primary mt-2 w-full"
                onClick={() => handleGoogleAuth()}
              >
                <i className="fab fa-google" />
                <p>SIGN IN WITH GOOGLE</p>
              </button>

              <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">SIGNUP</span></Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login