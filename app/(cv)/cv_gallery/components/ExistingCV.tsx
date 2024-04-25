"use-client";
import React from "react";
import { cv } from "@prisma/client";

interface ExistingCVProps {
  cvProp: cv;
  handleCVSelection: (cvId: string) => void;
}

const ExistingCV: React.FC<ExistingCVProps> = ({
  cvProp,
  handleCVSelection,
}) => {
  const handleClick = () => {
    handleCVSelection(cvProp.cv_id);
  };
  return (
    <div onClick={handleClick} className="flex flex-col items-center">
      <div className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md">
        {/* You can add content here */}
      </div>
      <p className="mt-2 w-28 text-center text-primarygray truncate ...">{cvProp.title}</p>
    </div>
  );
};

export default ExistingCV;
