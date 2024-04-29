import React from 'react';
import Search_Icon from '@/public/assets/svg/Search_Icon';
import Filter_Icon from '@/public/assets/svg/Filter_Icon';

const SearchBar: React.FC = () => {
 return (
    <div className="flex flex-row justify-center w-full">
      <div className="flex flex-auto my-10">
        <div className="flex items-center px-2 py-2 bg-white rounded-lg w-full shadow-md">
          <div className='w-5 h-5'>
              <Search_Icon strokeColor='#7E7E7E'/>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="text-secondarygray flex-grow bg-transparent outline-none px-2"
          />
        </div>
        <div className="flex items-center px-3 py-2 bg-white rounded-lg ml-4 shadow-md"> 
          <div className='w-6 h-6'>
              <Filter_Icon strokeColor='#7E7E7E'/>
          </div>
        </div>
      </div>
    </div>
 );
};
//w-11/12 max-w-4xl mx-auto
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