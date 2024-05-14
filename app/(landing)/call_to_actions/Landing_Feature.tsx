import React from 'react';
import FeatureCard from '../components/FeatureBox';
import Search_Icon from '@/public/assets/svg/Search_Icon';


const LandingFeature: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center px-48 py-16 bg-white border border-aiblue">
      <h1 className="large_title pb-5">Features</h1>
        <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-10 overflow-y-auto">
          <FeatureCard
            title="Ai Assistance"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
            svgImage={Search_Icon}
          />
          <FeatureCard
            title="Ai Assistance"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
            svgImage={Search_Icon}
          />
          <FeatureCard
            title="Ai Assistance"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
            svgImage={Search_Icon}
          />
          <FeatureCard
            title="Ai Assistance"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
            svgImage={Search_Icon}
          />
          <FeatureCard
            title="Ai Assistance"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
            svgImage={Search_Icon}
          />
          <FeatureCard
            title="Ai Assistance"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's "
            svgImage={Search_Icon}
          />
        </div>
      
    </div>
  );
};

export default LandingFeature;
/*
<div className="flex flex-col md:flex-row justify-around items-center">
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px', borderRadius: '50px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 1" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s </p>
        </div>
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 2" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s </p>
        </div>
        <div className="bg-white-200 p-6 rounded-lg m-4 md:w-1/4 border-gradient" style={{ borderWidth: '4px' }}>
          <img src="./assets/AIlogo.png" alt="Feature 3" className="w-20 h-20 mb-4" />
          <h2 className="sub_title">Artificial Intelligence</h2>
          <p className="txt_regular_s">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s </p>
        </div>
      </div>
*/