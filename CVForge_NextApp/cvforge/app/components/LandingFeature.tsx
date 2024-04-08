import React from 'react';

const LandingFeature: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center md:px-20 md:py-20 bg-white">
      <h1 className="font-koh_santepheap text-5xl font-bold mb-8">Features</h1>

      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient"  style={{borderWidth: '4px'}}>
          <img src="/AIlogo.png" alt="Feature 1" className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Artificial Intelligence</h2>
          <p className="text-lg text-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
        </div>
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient"  style={{borderWidth: '4px'}}>
          <img src="/AIlogo.png" alt="Feature 2" className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Artificial Intelligence</h2>
          <p className="text-lg text-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
        </div>
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient"  style={{borderWidth: '4px'}}>
          <img src="/AIlogo.png" alt="Feature 3" className="w-12 h-12 mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Artificial Intelligence</h2>
          <p className="text-lg text-left">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
        </div>
      </div>
    </div>
  );
};

export default LandingFeature;
