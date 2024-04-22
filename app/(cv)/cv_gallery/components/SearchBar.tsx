import React from 'react';
import Search_Icon from '@/public/assets/svg/Search_Icon.tsx';
import Filter_Icon from '@/public/assets/svg/Filter_Icon.tsx';

const SearchBar: React.FC = () => {
 return (
    <div className="flex flex-row items-left bg-editorgray fixed w-full">
      <div className="flex flex-row m-10 mx-12">
        <div className="flex items-center px-2 py-2 bg-white rounded-lg">
          <div className='w-5 h-5'>
              <Search_Icon strokeColor='#7E7E7E'/>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="text-secondarygray flex-grow bg-transparent outline-none px-2"
          />
        </div>
        <div className="flex items-center px-3 py-2 bg-white rounded-lg ml-4">
          <div className='w-6 h-6'>
              <Filter_Icon strokeColor='#7E7E7E'/>
          </div>
        </div>
      </div>
    </div>
 );
};

export default SearchBar;



/*
<div className="w-full px-12 py-12 text-secondarygray">
        <div className="flex items-center">
          <div className='w-5 h-5 '>
              <Search_Icon strokeColor='#D9D9D9'/>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-secondarygray bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-outlinegray focus:border-transparent shadow-md"
          />
        </div>
      </div>
*/