"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
const SignInOutButton = () => {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto items-center">
        <p className="text-sky-600">{session.user.email}</p>
        
        <button onClick={() => signOut()} className="hidden md:block bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold w-40 py-2 px-4 rounded">
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn()} className="hidden md:block bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold w-40 py-2 px-4 rounded">
      Sign In
    </button>
  );
};

export default SignInOutButton;