'use client'
import { setCurrentTab } from '@/contexts/cv/sidebar/currentTab'
import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import GalleryLoading from '@/app/components/loading'
import { useSession } from 'next-auth/react'

const Menu: React.FC = ({}) => {
<<<<<<< HEAD
  const { data: session } = useSession()
  const dispatch = useDispatch()
  dispatch(setCurrentTab('cv_gallery'))
=======
  const { data: session } = useSession();
  const dispatch = useDispatch();
  dispatch(setCurrentTab("cv_gallery"));
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  const [searchQuery, setSearchQuery] = useState('')
  const handleSearchInputChange = (query: string) => {
<<<<<<< HEAD
    setSearchQuery(query)
  }
=======
    setSearchQuery(query);
  };
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  if (session && session.user) {
    return (
      <div className="flex h-screen overflow-y-scroll justify-center">
        <div className="flex flex-col">
          <SearchBar onSearchChange={handleSearchInputChange} />
          <Gallery searchQuery={searchQuery} />
        </div>
      </div>
    );
  } else {
<<<<<<< HEAD
    return <GalleryLoading />
=======
    return <GalleryLoading />;
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
  }
};

<<<<<<< HEAD
export default Menu
=======
export default Menu;
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
