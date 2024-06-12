import React from 'react'

interface CardProps {
  title: string
}

const PositionBox: React.FC<CardProps> = ({ title }) => {
  return (
    <div className="bg-editorgray px-2 py-1 rounded-lg text-primarygray text-xl shadow-sm m-2">
      <p>{title}</p>
    </div>
  )
}

export default PositionBox
