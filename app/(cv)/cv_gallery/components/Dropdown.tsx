
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {cv} from '@prisma/client'
import { RiRoadMapLine } from "react-icons/ri";
import { MdOutlineSimCardDownload } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";


interface DropdownProps {
  cvProp: cv;
  deleteFunction: ((cvId: string) => void);
}

const Dropdown: React.FC<DropdownProps> = ({cvProp, deleteFunction}) => {
 const [isOpen, setIsOpen] = useState(false);

 const toggleDropdown = () => {
    setIsOpen(!isOpen);
 };
 const handleCVDelete = () => {
  setIsOpen(false);
  deleteFunction(cvProp.cv_id);
 } 
 return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" onClick={toggleDropdown}>
          <BsThreeDotsVertical className="h-5 w-5 text-secondarygray" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-2 w-44 rounded-md shadow-lg bg-white">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="#" className=" flex flex-row block px-4 py-2 text-sm text-secondarygray hover:bg-gray-100 hover:text-primarygray" role="menuitem">
              <RiRoadMapLine/>
              <p className='pl-2'>Roadmap</p>
            </a>
            <a href="#" className="flex flex-row block px-4 py-2 text-sm text-secondarygray hover:bg-gray-100 hover:text-primarygray" role="menuitem">
              <MdOutlineSimCardDownload />
              <p className='pl-2'>Download</p>
            </a>
            <a href="#" className="flex flex-row block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 hover:text-red-800" role="menuitem" onClick={() => {handleCVDelete()}}>
            <IoTrashOutline />
              <p className='pl-2'>Delete</p>
            </a>
          </div>
        </div>
      )}
    </div>
 );
};

export default Dropdown;
//export const CVDetail: React.FC<{ cvDetail: cv; onClose: () => void; onDelete: (cvId: string) => void }> = ({ cvDetail, onClose, onDelete}) => {
