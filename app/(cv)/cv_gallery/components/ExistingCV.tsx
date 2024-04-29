"use-client";
import React, { useState } from 'react';
import { cv } from "@prisma/client";
import { BsThreeDotsVertical } from "react-icons/bs";
import DropdownMenu from './Dropdown';

interface ExistingCVProps {
  cvProp: cv;
}

const ExistingCV: React.FC<ExistingCVProps> = ({
  cvProp,
}) => {

  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md">
      </div>
      <div className="flex flex-row p-2">
        <p className="w-36 text-center text-primarygray truncate ...">{cvProp.title}</p>
        <div>
          <DropdownMenu cvDetail={cvProp} />
        </div>
      </div>
    </div>
  );
};

export default ExistingCV;
