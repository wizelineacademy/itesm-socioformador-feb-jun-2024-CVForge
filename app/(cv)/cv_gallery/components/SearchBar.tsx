<<<<<<< HEAD
import React from 'react'
import Search_Icon from '@/public/assets/svg/Search_Icon'
import Filter_Icon from '@/public/assets/svg/Filter_Icon'
=======
import React from "react";
import Search_Icon from "@/public/assets/svg/Search_Icon";
import Filter_Icon from "@/public/assets/svg/Filter_Icon";
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

interface SearchBarProps {
  onSearchChange?: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  return (
    <div className="flex flex-row justify-center w-full mx-5 pr-10">
      <div className="flex flex-auto my-10">
        <div className="flex items-center px-2 py-2 bg-white rounded-lg w-full shadow-md">
          <div className="w-5 h-5">
            <Search_Icon strokeColor="#7E7E7E" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="text-secondarygray flex-grow bg-transparent outline-none px-2"
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
        <div className="flex items-center px-3 py-2 bg-white rounded-lg ml-4 shadow-md">
          <div className="w-6 h-6">
            <Filter_Icon strokeColor="#7E7E7E" />
          </div>
        </div>
      </div>
    </div>
<<<<<<< HEAD
  )
}
export default SearchBar
=======
  );
};
export default SearchBar;
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
