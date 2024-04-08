import React from 'react';

const LandingPosition: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center md:px-20 md:py-14 shadow-md flex">
      <h1 className="font-koh_santepheap text-5xl font-bold mb-8">Currently Available Positions</h1>
      <div className="font-koh_santepheap" style={{ marginTop: '20px', color: '#474646' }}>
        <p className="text-5xl mb-4">Data Analyst &nbsp;&nbsp;&nbsp; Front-End &nbsp;&nbsp;&nbsp;       Back-end</p>
       <br/>
       <br/>
        <p className="text-5xl mb-4">&nbsp;&nbsp;&nbsp; Prompt Engineer &nbsp;&nbsp;&nbsp; Full Stack</p>

        {/* Add more positions as needed */}
      </div>
    </div>
  );
};

export default LandingPosition;
