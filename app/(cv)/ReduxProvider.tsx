<<<<<<< HEAD
'use client'
=======
"use client";
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

import { Provider } from 'react-redux'
import { store } from '@/contexts/cv/store'

type ReduxProviderProps = {
<<<<<<< HEAD
  children: React.ReactNode
}

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}
=======
  children: React.ReactNode;
};

const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

export default ReduxProvider
