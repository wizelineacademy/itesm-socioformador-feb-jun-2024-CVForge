"use client"
import { setCurrentTab } from "@/contexts/cv/sidebar/currentTab"
import { useDispatch } from "react-redux"
import React, { useEffect, useState } from "react"
import Gallery from "./components/Gallery"
import SearchBar from "./components/SearchBar"
import GalleryLoading from "@/app/components/loading"
import { useSession } from "next-auth/react"

const Menu: React.FC = ({}) => {
  const { data: session } = useSession()
  const dispatch = useDispatch()
  dispatch(setCurrentTab("cv_gallery"))

  const [searchQuery, setSearchQuery] = useState("")
  const handleSearchInputChange = (query: string) => {
    setSearchQuery(query)
  }

  if (session && session.user) {
    return (
      <div className="flex h-screen overflow-y-scroll justify-center">
        <div className="flex flex-col">
          <SearchBar onSearchChange={handleSearchInputChange} />
          <Gallery searchQuery={searchQuery} />
        </div>
      </div>
    )
  } else {
    return <GalleryLoading />
  }
}

export default Menu
