'use client'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
const SignInOutButton = () => {
  const { data: session } = useSession()

  if (session && session.user) {
    return (
      <div className="flex gap-4 items-center xl:text-sm lg:text-sm md:text-md sm:text-xs">
        <p className="text-secondarygray hover:underline">
          {session.user.email}
        </p>
        <button
          onClick={() => signOut()}
          className="hidden md:block bg-gradient-to-r from-gptgreen to-aiblue text-whitefo font-bold py-2 px-4 rounded-3xl delay-50 hover:scale-105 duration-200 w-40"
        >
          Sign Out
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex gap-4 items-center xl:text-sm lg:text-sm md:text-md sm:text-xs">
        <button
          onClick={() => signIn()}
          className="hidden md:block bg-gradient-to-r from-gptgreen to-aiblue text-whitefo font-bold py-2 px-4 rounded-3xl delay-50 hover:scale-105 duration-200 w-40"
        >
          Sign In
        </button>
      </div>
    )
  }
}
//xl:text-xl lg:text-lg md:text-md sm:text-sm

export default SignInOutButton
