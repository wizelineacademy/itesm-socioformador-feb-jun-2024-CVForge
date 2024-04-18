import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#171717", ...props }: LiveIconProps) => (
    <svg width="100%" height="100%" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.625 3.79167H11.375" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M1.625 6.5H11.375" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M1.625 9.20834H11.375" stroke={strokeColor} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
