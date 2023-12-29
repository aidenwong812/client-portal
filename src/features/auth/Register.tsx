import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'

function Register() {

  const INITIAL_REGISTER_OBJ = {
    name: "",
    password: "",
    email: ""
  }

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ)

  const navigate = useNavigate()

  const handleAuth = () => {
    setErrorMessage("")

    if (registerObj.name.trim() === "") return setErrorMessage("Name is required!")
    if (registerObj.email.trim() === "") return setErrorMessage("Email is required!")
    if (registerObj.password.trim() === "") return setErrorMessage("Password is required!")
    else {
      // setLoading(true)
      // Call API to check user credentials and save token in localstorage
      // axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/register`, {
      //   name: registerObj.name,
      //   email: registerObj.email,
      //   password: registerObj.password,
      // })
      //   .then(res => {
      //     console.log(res);
      //     if (res.status === 201) {
      //       localStorage.setItem("token", res.data.result)
      //       setLoading(false)
      navigate('/app/assistants')
      //   }
      //   setLoading(false)
      // })
      // .catch(err => {
      //   console.log(err);
      //   setLoading(false)
      //   if (err?.response) {
      //     if (err.response?.status === 409) {
      //       return setErrorMessage("User already exists!")
      //     }
      //   }
      // })
    }
  }

  const handleGoogleAuth = useGoogleLogin({
    onSuccess: tokenResponse => {
      console.log(tokenResponse);
      axios.get('https://www.googleapis.com/oauth2/v2/userinfo?access_token=' + tokenResponse.access_token)
        .then(res => {
          if (res.data) {
            if (!res.data.verified_email) return setErrorMessage("Please verify your email!")

            // axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/google_auth`, {
            //   email: res.data.email,
            //   name: res.data.name
            // })
            //   .then(res => {
            //     if (res.status === 200 || res.status === 201) {
            //       localStorage.setItem("token", res.data.result)
            //       setLoading(false)
                  navigate('/app/assistants')
              //   }
              //   setLoading(false)
              // })
          }
        })
        .catch(err => {
          setLoading(false)
          if (err.response.data.result) {
            setErrorMessage(err.response.data.result)
          }
        })
      // axios.post(`${import.meta.env.VITE_SERVER_ENDPOINT}/login_oauth`, {
      //   googleToken: tokenResponse,
      // })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => console.log(err));
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("")
    setRegisterObj({ ...registerObj, [updateType]: value })
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-[90%] shadow-xl sm:max-w-xl">
        <div className="grid grid-cols-1 bg-base-100 rounded-xl">
          {/* <div className=''>
                        <LandingIntro />
                    </div> */}
          <div className='py-24 px-10'>
            <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
            <div className='flex flex-col'>

              <div className="mb-4">

                <InputText type='text' defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

                <InputText type='email' defaultValue={registerObj.email} updateType="email" containerStyle="mt-4" labelTitle="Email" updateFormValue={updateFormValue} />

                <InputText type="password" defaultValue={registerObj.password} updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

              </div>

              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button
                className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}
                onClick={() => handleAuth()}
              >
                SIGN UP
              </button>
              <button
                className={"btn btn-primary mt-2 w-full" + (loading ? " loading" : "")}
                onClick={() => handleGoogleAuth()}
              >
                <i className="fab fa-google" />
                <p>SIGN UP WITH GOOGLE</p>
              </button>

              <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">SIGN IN</span></Link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register