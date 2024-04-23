import React from 'react'
interface Cv {
  cv_id: string;
  title: string;
}

interface CvDetail extends Cv {
  desired_position_id: string;
}
const CVDetail: React.FC<{ cv: CvDetail; onClose: () => void }> = ({ cv, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2>{cv.title}</h2>
        <p>{cv.cv_id}</p>
        {/* Add other fields as needed */}
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
