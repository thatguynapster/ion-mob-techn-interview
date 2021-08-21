import HeadFile from '../components/head-file'
import React, { ChangeEvent, FC, useContext, useEffect } from 'react'
import AuthContext from '../context/auth-context'
import { LockClosedIcon, UserIcon } from '@heroicons/react/outline'

export const Login: FC = () => {
  const { GLOBAL_OBJ, AUTH_LOGIN } = useContext(AuthContext)

  const initialize = () => {}

  // useEffect(() => {
  //   initialize()
  //   GLOBAL_OBJ?.isLoggedIn && navigate('home')
  // }, [GLOBAL_OBJ])

  return (
    <>
      <HeadFile title="ION MOBILITY TEST" />
      <div className="w-screen min-h-screen bg-green-600 flex justify-center items-center p-8">
        <div className="w-full max-w-lg bg-white rounded-lg p-4 text-center space-y-8">
          <h1 className="font-bold text-2xl text-green-900">Sign in</h1>

          <div className="flex flex-col space-y-3">
            <div className="relative flex flex-col box-border w-full p-0 font-medium text-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  <UserIcon className="w-4 h-4" />
                </span>
              </div>
              <input
                id={'id'}
                className="border-solid border focus:ring-2 outline-none border-green-100 rounded-lg py-3 pl-9 pr-12  text-sm w-full"
                value=""
                type="text"
                placeholder="Email"
                onChange={(ev: ChangeEvent<HTMLInputElement>) => {}}
              />
            </div>
            <div className="relative flex flex-col box-border w-full p-0 font-medium text-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">
                  <LockClosedIcon className="w-4 h-4" />
                </span>
              </div>
              <input
                id={'id'}
                className="border-solid border focus:ring-2 outline-none border-green-100 rounded-lg py-3 pl-9 pr-12  text-sm w-full"
                value=""
                type="text"
                placeholder="Password"
                onChange={(ev: ChangeEvent<HTMLInputElement>) => {}}
              />
            </div>
          </div>

          <button className="w-full rounded-lg py-3 bg-green-700 hover:bg-green-800 text-white rounded-swoove outline-none font-medium text-sm flex justify-center items-center">
            sign in
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
