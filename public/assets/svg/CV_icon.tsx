import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#7E7E7E", ...props }: LiveIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 34 34" viewBox="0 0 34 34" id="Cv">
        <path d="M30,4.8C30,2.7,28.3,1,26.2,1H7.8C5.7,1,4,2.7,4,4.8v24.4C4,31.3,5.7,33,7.8,33h18.4c2.1,0,3.8-1.7,3.8-3.8V4.8z M28,29.2
		c0,1-0.8,1.8-1.8,1.8H7.8c-1,0-1.8-0.8-1.8-1.8V4.8C6,3.8,6.8,3,7.8,3h18.4c1,0,1.8,0.8,1.8,1.8V29.2z" fill={strokeColor} 
        className="color000000 svgShape"></path>
        <path d="M10.9 19h11.8c.3 0 .6-.1.8-.4.2-.2.3-.5.2-.8-.4-2.4-1.9-4.3-3.9-5.2.6-.7 1-1.6 1-2.7 0-2.2-1.8-4-4-4s-4 1.8-4 4c0 1 .4 1.9 1 2.7-2 1-3.6 2.9-3.9 5.2 0 .3 0 .6.2.8C10.3 18.9 10.6 19 10.9 19zM14.8 10c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2S14.8 11.1 14.8 10zM16.8 14c2 0 3.8 1.2 4.6 3h-9.2C13 15.2 14.8 14 16.8 14zM25 22H9c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1S25.6 22 25 22zM25 26H9c-.6 0-1 .4-1 1s.4 1 1 1h16c.6 0 1-.4 1-1S25.6 26 25 26z" 
        fill={strokeColor}  
        className="color000000 svgShape"></path>
    </svg>

);

const Memo = memo(SvgComponent);
export default Memo;