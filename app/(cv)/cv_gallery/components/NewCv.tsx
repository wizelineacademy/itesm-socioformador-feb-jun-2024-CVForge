import React from 'react'

interface NewCvProps {
  handleFormToggle: () => void
}

const NewCv: React.FC<NewCvProps> = ({ handleFormToggle }) => {
  return (
    <div className="flex flex-col items-center mx-5 ">
      {/* Button with onClick event to toggle the form */}
      <button
        className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md"
        onClick={handleFormToggle}
      >
        <span className="text-4xl text-outlinegray delay-50">+</span>
      </button>
      <p className="mt-2 text-center text-primarygray">New CV</p>
    </div>
  )
}

export default NewCv
