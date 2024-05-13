import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#171717", ...props }: LiveIconProps) => (
    <svg width="100%" height="100%" viewBox="0 0 218 157" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
    <rect width="100%" height="100%" fill="url(#pattern0_1640_108)"/>
    <defs>
    <pattern id="pattern0_1640_108" patternContentUnits="objectBoundingBox" width="0.0733945" height="0.101911">
    <use xlinkHref="#image0_1640_108" transform="scale(0.000458716 0.000636943)"/>
    </pattern>
    <image id="image0_1640_108" width="160" height="160" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGMSURBVHgB7dm9jRNRFAbQ+8YaO6WEdeiILQFXsFsKHcB2AJ1ABVDCZA4c2CUQ27LNu5YR4ADZ81YiOUea0cxobvbp/d0SV9br9bvT6fRUr+f6+nD5PJRShsPh8LJYLLYBr6T8ethsNm/2+/2HGrz3/ywo5VPf9y/z+fxHQKNzADN8u93uW318vLFumE6nSyGkVZe3HPni9vClx0sNNCmr1eqh67pNjHA8Hpd1Tfg9YKRuMpmMHsnqevA5oEFOwfdMvX+pAXwKaNDVXe/oAMbvYxoYpQv4jzKA2xhvCGiQU/DXGCm7IwENMoBfYqRszQU06PIcr4bwc9wpa/SFaXXehMxms493TqdD1gQ0Ogcwe7p93y9vGQnzH31gXku5/nBpzeWI+PaPM8JtblZyvaj1BgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXPsJqmNtQL6srPQAAAAASUVORK5CYII="/>
    </defs>
    </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
