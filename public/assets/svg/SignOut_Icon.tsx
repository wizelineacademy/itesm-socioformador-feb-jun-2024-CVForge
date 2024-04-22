import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#7E7E7E", ...props }: LiveIconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" id="SignOut">
        <path d="M17,2H7C5.3,2,4,3.3,4,5v6h8.6l-2.3-2.3c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l4,4c0.4,0.4,0.4,1,0,1.4c0,0,0,0,0,0
	l-4,4c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l2.3-2.3H4v6c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3V5C20,3.3,18.7,2,17,2z" 
    fill={strokeColor} className="color000000 svgShape"></path></svg>


);

const Memo = memo(SvgComponent);
export default Memo;
