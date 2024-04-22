import React from 'react';

interface ExistingCVProps {
  title: string;
}

const ExistingCV: React.FC<ExistingCVProps> = ({ title }) => {
  return (
     <div className="flex flex-col items-center">
       <div className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md">
       </div>
       <p className="mt-2 text-center text-primarygray">{title}</p>
     </div>
  );
 };
 
 export default ExistingCV;