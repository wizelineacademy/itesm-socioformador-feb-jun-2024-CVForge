import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {cv} from '@prisma/client'
import {deleteCV} from "@/services/cvService";


const DropdownMenu: React.FC<{ cvDetail: cv}> = () => {
 const [isOpen, setIsOpen] = useState(false);

 const toggleDropdown = () => {
    setIsOpen(!isOpen);
 };
 //Deleting a CV
 const handleCVDelete = async(cvId: string) => {
    const deletedCV = await deleteCV(cvId);
    setCvs((prevCvs) => prevCvs.filter(cv => cv.cv_id !== cvId));
    console.log("cv deleted");
  };

 return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={toggleDropdown}>
          <BsThreeDotsVertical className="h-5 w-5 text-secondarygray" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 w-44 rounded-md shadow-lg bg-white">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className="block px-4 py-2 text-sm text-secondarygray hover:bg-gray-100 hover:text-primarygray" role="menuitem">Roadmap</a>
            <a href="#" className="block px-4 py-2 text-sm text-secondarygray hover:bg-gray-100 hover:text-primarygray" role="menuitem">Download</a>
            <a href="#" className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-800" role="menuitem" onClick={() => {onDelete(cvDetail.cv_id)}}>Delete</a>
          </div>
        </div>
      )}
    </div>
 );
};

export default DropdownMenu;
//export const CVDetail: React.FC<{ cvDetail: cv; onClose: () => void; onDelete: (cvId: string) => void }> = ({ cvDetail, onClose, onDelete}) => {
