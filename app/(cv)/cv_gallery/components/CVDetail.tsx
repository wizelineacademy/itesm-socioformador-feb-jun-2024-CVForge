import React from 'react'
import {cv} from '@prisma/client'

export const CVDetail: React.FC<{ cvDetail: cv; onClose: () => void; onDelete: (cvId: string) => void }> = ({ cvDetail, onClose, onDelete}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2>{cvDetail.title}</h2>
        <p>{cvDetail.cv_id}</p>
        {/* Add other fields as needed */}
        <button type='button' onClick={() => {onDelete(cvDetail.cv_id)}}>Delete</button>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
