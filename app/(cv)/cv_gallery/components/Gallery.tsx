import React from 'react';
import NewCv from './NewCv';

const Gallery: React.FC = () => {
 // Define the state array for NewCv components
 const newCvComponents = Array.from({ length: 12 }, (_, index) => <NewCv key={index} />);

 return (
    <div className="flex flex-col items-center min-h-screen bg-editorgray pb-10">
      <div className="grid grid-cols-5 gap-10 overflow-y-auto">
        {newCvComponents}
      </div>
    </div>
 );
};

export default Gallery;
