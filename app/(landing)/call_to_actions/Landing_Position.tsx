import React from 'react';
import PositionBox from '../components/PositionBox';

const LandingPosition: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center px-48 py-16 bg-white border border-aiblue">
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
/* 
<div className="flex flex-col items-center justify-center md:px-20 md:py-14 shadow-md flex">
      <h1 className="large_title">Currently Available Positions</h1>
      <div className="font-koh_santepheap" style={{ marginTop: '20px', color: '#474646' }}>
        <p className="text-5xl mb-4">Data Analyst &nbsp;&nbsp;&nbsp; Front-End &nbsp;&nbsp;&nbsp;       Back-end</p>
       <br/>
       <br/>
        <p className="text-5xl mb-4">&nbsp;&nbsp;&nbsp; Prompt Engineer &nbsp;&nbsp;&nbsp; Full Stack</p>

      </div>
    </div>
*/