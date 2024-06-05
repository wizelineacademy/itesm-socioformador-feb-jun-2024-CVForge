import React from 'react';

interface CardProps {
    title: string;
    content: string;
    svgImage: React.ElementType; 
  }

const FeatureCard: React.FC<CardProps> = ({ title, content, svgImage: SvgImageComponent }) => {
  return (
    <div>
        <div className=' w-12 h-12 border border-gptgreen border-[5px] rounded-md p-1'>
            <SvgImageComponent className="card-svg text-3xl" />
        </div>
        <h2 className="text-xl font-bold text-primarygray my-1">{title}</h2>
        <p className="text-secondarygray">{content}</p>
    </div>
  );
};

export default FeatureCard;
