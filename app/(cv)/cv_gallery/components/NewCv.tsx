import React from 'react';

interface NewCvProps {
  handleFormToggle: () => void;
}

const NewCv: React.FC<NewCvProps> = ({ handleFormToggle }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Button with onClick event to toggle the form */}
      <button className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md"
        onClick={handleFormToggle}
      >
        <span className="text-4xl text-outlinegray">+</span>
      </button>
      <p className="mt-2 text-center text-primarygray">New CV</p>
    </div>
  );
};

export default NewCv;

//      <div className="relative w-20 h-50 bg-white shadow-md flex items-center justify-center">
