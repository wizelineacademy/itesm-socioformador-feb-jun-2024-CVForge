import React from 'react';
import PositionBox from '../components/PositionBox';

const LandingPosition: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-white ">
      <h1 className="large_title ">Currently Available Positions</h1>
      <div className='carousel w-full'>
        <div className='carousel__inner'>
          <PositionBox title="Data Analyst"/>
          <PositionBox title="Front-End Developer"/>
          <PositionBox title="Prompt Engineer"/>
          <PositionBox title="Full Stack Developer"/>
          <PositionBox title="Back-End Developer"/>
          <PositionBox title="Data Analyst"/>
          <PositionBox title="Front-End Developer"/>
          <PositionBox title="Prompt Engineer"/>
          <PositionBox title="Full Stack Developer"/>
          <PositionBox title="Back-End Developer"/>
        </div>
      </div>
    </div>
  );
};
export default LandingPosition;
