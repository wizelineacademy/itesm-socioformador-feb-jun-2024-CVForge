"use-client";
import React, { useState } from 'react';
import { cv } from "@prisma/client";
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from './Dropdown';

interface ExistingCVProps {
  cvProp: cv;
  deleteFunction: ((cvId: string) => void);
}

const ExistingCV: React.FC<ExistingCVProps> = ({
  cvProp, deleteFunction}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md">
      </div>
      <div className="flex flex-row p-2">
        <p className="w-36 text-center text-primarygray truncate ...">{cvProp.title}</p>
        <div>
          <Dropdown cvProp={cvProp} deleteFunction={deleteFunction} />
        </div>
      </div>
    </div>
  );
};

export default ExistingCV;
