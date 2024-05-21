import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#171717", ...props }: LiveIconProps) => (
    <svg width="100%" height="100%" viewBox="0 0 15 149" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="15" height="149" fill="url(#pattern0_1681_54)"/>
    <defs>
    <pattern id="pattern0_1681_54" patternContentUnits="objectBoundingBox" width="1.06667" height="0.107383">
    <use xlinkHref="#image0_1681_54" transform="scale(0.0133333 0.00134228)"/>
    </pattern>
    <image id="image0_1681_54" width="80" height="80" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAEkSURBVHgB7dfNTcNAEIbhb5cGoAN3QI7cTCpISqED7A5wFxxJBbiEdIBLoAKbGbygyIfIP6do30faaON4Lp8ma0/QRFVVz8MwHGwd7WuRLp9DCL5q+70T/oW/jQVzb6G92nq5WhDCWwryWxgD9PD6vv+07W5m3TnGuCdEKfqHd57mh+d2qSZ7wbqosO770gqpC1tlLG7pJAv+qMx5gEv+ulMHZc7PwC0BFspcFDbxADut5C/XypwHeNJ6BGg+tJJPJMrcXdu2XVmWD7Z/0jJNXdfvytzvQ8S6sFpynvm9XiOMAfpMa6HsbdvMqGn8XubgUZheSKOdd+TjxUt2Z+vk52XuoxsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALg9PzshXZOGqQqOAAAAAElFTkSuQmCC"/>
    </defs>
    </svg>
);

const Memo = memo(SvgComponent);
export default Memo;


