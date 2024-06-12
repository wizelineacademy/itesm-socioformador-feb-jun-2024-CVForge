<<<<<<< HEAD
import React from 'react'

// Icon imports
import MainLogo from '@/public/assets/MainLogo'
=======
import React from "react";

// Icon imports
import MainLogo from "@/public/assets/MainLogo";
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

const UserOptions = () => {
  // Extracted width and height from the Google button's styles
  const buttonStyle = {
<<<<<<< HEAD
    width: '350px',
    height: '48px',
    display: 'flex',
    alignItems: 'center', // Align items vertically in the button
    justifyContent: 'center', // Align items horizontally in the button
  }
=======
    width: "350px",
    height: "48px",
    display: "flex",
    alignItems: "center", // Align items vertically in the button
    justifyContent: "center", // Align items horizontally in the button
  };
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

  return (
    <div
      className="flex h-screen justify-center items-center"
      style={{
<<<<<<< HEAD
        backgroundImage: 'url(/assets/bgimg.png)',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
=======
        backgroundImage: "url(/assets/bgimg.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
      }}
    >
      {/* Centered Content */}
      <div className="text-center">
        {/* Text and button to upload */}
        <div>
          <h1 className="text-4xl font-koh_santepheap mb-8">
<<<<<<< HEAD
            {' '}
=======
            {" "}
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)
            Start creating your Professional
            <br /> CV with the help of our AI now!
          </h1>

          <button
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full bg-transparent mb-8"
            style={buttonStyle}
          >
            Upload CV
          </button>
        </div>
<<<<<<< HEAD
=======

        {/* Two additional buttons */}
        <div>
          <button
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full mb-4"
            style={buttonStyle}
          >
            Button 1
          </button>
          <button
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full"
            style={buttonStyle}
          >
            Button 2
          </button>
        </div>
      </div>
    </div>
  );
};
>>>>>>> affab28 (Installed and Integrated Packages: Husky, Prettier and ESLint)

        {/* Two additional buttons */}
        <div>
          <button
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full mb-4"
            style={buttonStyle}
          >
            Button 1
          </button>
          <button
            className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold rounded-full"
            style={buttonStyle}
          >
            Button 2
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserOptions
