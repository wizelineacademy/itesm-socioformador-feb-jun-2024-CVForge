'use client'
import '@/style/globals.css'
import React from 'react'

// Component imports
import UserOptions from './components/UserOptions'

const Auth: React.FC = ({}) => {
  return (
    <main className="w-full h-full">
      <UserOptions />
    </main>
  )
}

export default Auth
