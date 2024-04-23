import React from 'react';
import {cv} from "@prisma/client"

interface ExistingCVProps {
  title: string;
}

const ExistingCV: React.FC<{cvProp: cv}> = ({ cvProp }) => {
  return (
     <div className="flex flex-col items-center">
       <div className="w-44 h-60 bg-white shadow-md flex items-center justify-center rounded-md">
       </div>
       <p className="mt-2 text-center text-primarygray">{cvProp.title}</p>
     </div>
  );
 };
 
 export default ExistingCV;