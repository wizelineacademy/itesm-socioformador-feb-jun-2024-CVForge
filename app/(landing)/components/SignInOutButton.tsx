"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
const SignInOutButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 items-center">
        <p className="text-secondarygray">{session.user.email}</p>
        
        <button onClick={() => signOut()} className="hidden md:block bg-gradient-to-r from-gptgreen to-aiblue text-whitefo font-bold w-40 py-2 px-4 rounded-3xl delay-50 hover:scale-105 duration-200">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div className="flex gap-4 items-center">
      <div className="w-[140px]"/>
      <button onClick={() => signIn()} className="hidden md:block bg-gradient-to-r from-gptgreen to-aiblue text-whitefo font-bold w-40 py-2 px-4 rounded-3xl delay-50 hover:scale-105 duration-200">
        Sign In
      </button>
    </div>
  );
};

export default SignInOutButton;