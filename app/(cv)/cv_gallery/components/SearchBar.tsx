import React from 'react';
import Search_Icon from '@/public/assets/svg/Search_Icon.tsx';

const SearchBar: React.FC = () => {
 return (
    <div className="flex flex-col items-center bg-editorgray">
      <div className="w-full px-12 py-12 text-secondarygray">
        <div className="flex items-center">
          <div className='w-5 h-5'>
              <Search_Icon strokeColor='#D9D9D9'/>
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-secondarygray bg-white rounded-md focus:outline-none focus:ring-2 focus:ring-outlinegray focus:border-transparent shadow-md"
          />
        </div>
      </div>
    </div>
 );
};

export default SearchBar;
