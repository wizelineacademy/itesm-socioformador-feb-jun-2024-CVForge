"use-client";
import React, { useState } from 'react';
import { cv } from "@prisma/client";
import Dropdown from './Dropdown';

interface ExistingCVProps {
  cvProp: cv;
  deleteFunction: ((cvId: string) => void);
}

const ExistingCV: React.FC<ExistingCVProps> = ({ cvProp, deleteFunction }) => {
  const [isHovered, setIsHovered] = useState(false);
 
  return (
     <div className="flex flex-col items-center mx-5">
       <a href={`cv/${cvProp.cv_id}`}
         className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md relative cursor-pointer"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
       >
         {isHovered && (
           <div className="absolute top-0 right-0 p-3 z-10" onClick={(e) => e.preventDefault()}>
             <Dropdown cvProp={cvProp} deleteFunction={deleteFunction} />
           </div>
         )}
       </a>
       <div className="flex flex-row p-2">
         <p className="w-36 text-center text-primarygray truncate ...">{cvProp.title}</p>
       </div>
     </div>
  );
 };

export default ExistingCV;
