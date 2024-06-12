'use-client'
import React, { useState, useEffect } from 'react'
import { cv } from '@prisma/client'
import Dropdown from './Dropdown'
import Image from 'next/image' // Import the Image component from next/image

interface ExistingCVProps {
  cvProp: cv
  deleteFunction: (cvId: string) => void
}

const cvData = [
  { id: 'CV_Juan', imageUrl: '/assets/moccvs/CV-Juan.jpg' },
  { id: 'CV_Franco', imageUrl: '/assets/moccvs/CV-Franco.jpg' },
  { id: 'CV_Yuvan', imageUrl: '/assets/moccvs/CV-Yuvan.jpg' },
  { id: 'CV_Gael', imageUrl: '/assets/moccvs/CV-Gael.jpg' },
  { id: 'CV_Jerry', imageUrl: '/assets/moccvs/CV-Jerry.jpg' },
]

const ExistingCV: React.FC<ExistingCVProps> = ({ cvProp, deleteFunction }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedCv, setSelectedCv] = useState(null)

  const selectRandomCv = () => {
    const randomIndex = Math.floor(Math.random() * cvData.length)
    setSelectedCv(cvData[randomIndex])
  }

  useEffect(() => {
    selectRandomCv()
  }, [])

  return (
    <div className="flex flex-col items-center mx-5">
      <a
        href={`cv/${cvProp.cv_id}`}
        className="relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {selectedCv ? (
          <div className="w-44 h-60 relative">
            <Image
              src={selectedCv.imageUrl}
              alt={selectedCv.id}
              layout="fill"
              objectFit="cover"
              className="rounded-md shadow-md"
            />
          </div>
        ) : (
          <div className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md relative cursor-pointer"></div>
        )}
        {isHovered && (
          <div
            className="absolute top-0 right-0 p-3 z-10"
            onClick={(e) => e.preventDefault()}
          >
            <Dropdown cvProp={cvProp} deleteFunction={deleteFunction} />
          </div>
        )}
      </a>
      <div className="flex flex-row p-2">
        <p className="w-36 text-center text-primarygray truncate...">
          {cvProp.title}
        </p>
      </div>
    </div>
  )
}

export default ExistingCV
