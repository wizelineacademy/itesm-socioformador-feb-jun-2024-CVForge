<<<<<<< HEAD
import React from 'react'

interface CardProps {
  title: string
=======
import React from "react";

interface CardProps {
  title: string;
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
}

const PositionBox: React.FC<CardProps> = ({ title }) => {
  return (
    <div className="bg-editorgray px-2 py-1 rounded-lg text-primarygray text-xl shadow-sm m-2">
      <p>{title}</p>
    </div>
<<<<<<< HEAD
  )
}
=======
  );
};
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

export default PositionBox
