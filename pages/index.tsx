import React, { ChangeEvent, FC, useContext, useEffect, useState } from 'react'
import { CheckIcon, LockClosedIcon, UserIcon } from '@heroicons/react/outline'
import { toast } from 'react-toastify'
import { useMachine } from '@xstate/react'
import AuthContext from '../context/auth-context'
import HeadFile from '../components/head-file'
import loginMachine from '../stateMachines/loginStateMachine'
import { supabase } from '../utils/superbase'

export const Login: FC = () => {
  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext)
  const [current, send] = useMachine(loginMachine)

  const [email, setEmail] = useState<string>('')
  const [userPass, setUserPass] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const _handleLogin = async () => {
    try {
      send('LOAD')
      const { error } = await supabase.auth.signIn({ email })
      if (error) {
        send('FAIL')
        setErrorMessage(error.message)
        // toast.error(error)
        throw error
      }
      send('SUCCESS')
      toast.success('Check your email for the login link!')
    } catch (error) {
      send('FAIL')
      setErrorMessage(error.error_description || error.message)
      // toast.error(error.error_description || error.message)
    } finally {
      send('DONE')
    }
  }

  useEffect(() => {
    console.log(GLOBAL_OBJ)
    let userData = JSON.parse(String(localStorage.getItem('supabase.auth.token')))
    console.log(userData)
    if (userData?.expiresAt * 1000 > new Date().getTime()) {
      console.log('user logged in')
      AUTH_LOGIN({
        isLoggedIn: true,
        token: userData.currentSession.access_token,
        data: {
          user_id: userData.currentSession.user.id,
          email: userData.currentSession.user.email,
          phone_number: userData.currentSession.user.phone
        }
      })
    } else {
      console.log('user not logged in/session expired')
    }
  }, [])

  useEffect(() => {
    console.log(GLOBAL_OBJ)
  }, [GLOBAL_OBJ])

  return (
    <>
      <HeadFile title="ION MOBILITY TEST" />
      <div className="w-screen min-h-screen bg-green-600 flex justify-center items-center p-8">
        {!current.matches('success') && (
          <form
            autoComplete="false"
            className="w-full max-w-lg bg-white rounded-lg p-4 text-center space-y-8"
          >
            <h1 className="font-bold text-2xl text-green-900">Sign in</h1>

            <div className="flex flex-col space-y-3">
              <div className="relative flex flex-col box-border w-full p-0 font-medium text-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    <UserIcon className="w-4 h-4" />
                  </span>
                </div>
                <input
                  id="userEmail"
                  className="border-solid border focus:ring-2 outline-none border-green-100 rounded-lg py-3 pl-9 pr-12  text-sm w-full"
                  value={email}
                  type="text"
                  placeholder="Email"
                  onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                    send('START')
                    setEmail(ev.target.value)
                  }}
                />
              </div>
              <div className="relative flex flex-col box-border w-full p-0 font-medium text-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">
                    <LockClosedIcon className="w-4 h-4" />
                  </span>
                </div>
                <input
                  id="userPass"
                  className="border-solid border focus:ring-2 outline-none border-green-100 rounded-lg py-3 pl-9 pr-12  text-sm w-full"
                  value={userPass}
                  type="password"
                  placeholder="Password"
                  onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                    send('START')
                    setUserPass(ev.target.value)
                  }}
                />
                {current.matches('failure') && <em className="text-red-500">{errorMessage}</em>}
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg py-3 bg-green-700 hover:bg-green-800 text-white rounded-swoove outline-none font-medium text-sm flex justify-center items-center capitalize"
              onClick={(ev) => {
                ev.preventDefault()
                _handleLogin()
              }}
            >
              {current.matches('loading') && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              sign in
            </button>
          </form>
        )}

        {current.matches('success') && (
          <div className="w-full max-w-lg bg-white rounded-lg p-4 text-center space-y-8 flex flex-col justify-center items-center">
            <div className="bg-green-200 p-6 rounded-full">
              <CheckIcon className="w-8 h-8" />
            </div>
            <p className="text-lg">Login successful</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Login
