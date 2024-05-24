import React from 'react';
import Link from 'next/link';
import DottedBg from '@/app/components/WavedDots';

const LandingStart: React.FC = () => {
  return (
    <div className="bg-transparent relative">
        {/* Front */}
        <div className='relative z-10'>
            {/* Big Text */}
            <div className='text-primarygray text-6xl font-inter font-bold'>
                <p>Start <span className='text-gptgreen'>Forging</span> your </p>
                <p className='my-1'><span className='text-gptgreen'>CV</span> with our </p>
                <p><span className='text-gptgreen'>AI</span> Assisted Service </p>
            </div>
            <div className='xl:pr-72 lg:pr-24 md:pr-10 sm:pr-10'>
                {/* Line */}
                <div className='w-auto h-0.5 bg-primarygray rounded-xl my-3'/>
                {/* Content */}
                <p className='text-secondarygray text-md font-inter'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                </p>
            </div>
            {/* Button */}
            <Link href='/login'>
                <button className="md:block bg-gradient-to-r from-gptgreen to-aiblue text-whitefo text-md w-64 py-2 px-4 rounded-3xl mt-6 delay-50 hover:scale-105 duration-200">
                    Try Our Service
                </button>
            </Link>
        </div>
        {/* Gradient Block */}
        <div className='w-[550px] h-7 absolute top-[38px] left-[20px] z-5'>
            <div className='bg-gradient-to-r from-gptgreen to-aiblue opacity-50 rounded ' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></div>
        </div>
        {/* Dotted Pattern*/}
        <div className='w-[550px] h-[500px] absolute top-[-8px] right-0 z-0 opacity-40 flex flex-row'>
            <DottedBg/>
        </div>
    </div>
  );
};

export default LandingStart;
