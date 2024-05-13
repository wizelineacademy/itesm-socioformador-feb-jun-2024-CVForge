import React from 'react';

interface CardProps {
    title: string;
    content: string;
    svgImage: React.ElementType; // Assuming the SVG image is a URL string
  }

const FeatureCard: React.FC<CardProps> = ({ title, content, svgImage: SvgImageComponent }) => {
  return (
    <div>
        <div className=' w-12 h-12 border border-gptgreen border-[5px] rounded-md p-1'>
            <SvgImageComponent className="card-svg" />
        </div>
        <h2 className="text-xl font-bold text-priimarygray my-1">{title}</h2>
        <p className="text-secondarygray">{content}</p>
    </div>
  );
};

export default FeatureCard;
