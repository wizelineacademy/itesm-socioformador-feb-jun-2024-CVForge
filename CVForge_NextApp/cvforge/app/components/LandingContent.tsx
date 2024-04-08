import React from 'react';

const LandingContent: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center md:px-20 md:py-20 shadow-md flex">
      <div className="md:w-1/2 md:mr-6 mb-6 md:mb-0">
        <h1 className="font-inter text-3xl font-bold mb-2">What we do</h1>
        <br/>
        <p className="font-inter text-3xl justify-left mb-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        </p>
        <br/>
        <br/>
        <br/>
        <button className="object-right bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-bold w-full md:w-auto py-3 px-20 rounded-full">
Try our Service        </button>
      </div>
      <div className="md:w-1/2 md:ml-6">
        <img
          src="/landingimg.png"
          alt="Your Image"
          className="w-full rounded-md"
        />
      </div>
    </div>
  );
};

export default LandingContent;
