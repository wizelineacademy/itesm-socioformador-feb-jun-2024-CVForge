'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const Providers = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider>
}

<<<<<<< HEAD
export default Providers
=======
export default Providers;
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
