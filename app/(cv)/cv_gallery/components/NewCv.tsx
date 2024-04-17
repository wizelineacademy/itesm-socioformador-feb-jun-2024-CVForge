import React from 'react';

const NewCv: React.FC = () => {
 return (
    <div className="flex flex-col items-center">
      <div className="w-40 h-56 bg-white shadow-md flex items-center justify-center">
        <span className="text-4xl text-outlinegray">+</span>
      </div>
      <p className="mt-2 text-center text-primarygray">New CV</p>
    </div>
 );
};

export default NewCv;
//      <div className="relative w-20 h-50 bg-white shadow-md flex items-center justify-center">
