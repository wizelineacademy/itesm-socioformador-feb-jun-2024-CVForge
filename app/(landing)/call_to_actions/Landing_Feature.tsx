import React from 'react';

const LandingFeature: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center md:px-20 md:py-20 bg-white shadow-lg">
      <h1 className="large_title">Features</h1>

      <div className="flex flex-col md:flex-row justify-around items-center">
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px', borderRadius: '50px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 1" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
        </div>
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 2" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
        </div>
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 3" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's </p>
        </div>
      </div>
    </div>
  );
};

export default LandingFeature;