import * as React from "react";
import { SVGProps, memo } from "react";

interface LiveIconProps extends SVGProps<SVGSVGElement> {
    strokeColor?: string;
}

const SvgComponent = ({ strokeColor = "#7E7E7E", ...props }: LiveIconProps) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.01 17C11.16 17 10.3 16.78 9.63 16.35L3.61 12.42C2.49 11.69 1.82 10.46 1.82 9.11997C1.82 7.77997 2.49 6.54997 3.61 5.81997L9.64 1.89997C10.98 1.02997 13.07 1.02997 14.4 1.90997L20.39 5.83997C21.5 6.56997 22.17 7.79997 22.17 9.12997C22.17 10.46 21.5 11.69 20.39 12.42L14.4 16.35C13.73 16.79 12.87 17 12.01 17ZM12.01 2.74997C11.44 2.74997 10.87 2.87997 10.46 3.15997L4.44 7.07997C3.74 7.53997 3.33 8.27997 3.33 9.11997C3.33 9.95997 3.73 10.7 4.44 11.16L10.46 15.09C11.29 15.63 12.75 15.63 13.58 15.09L19.57 11.16C20.27 10.7 20.67 9.95997 20.67 9.11997C20.67 8.27997 20.27 7.53997 19.57 7.07997L13.58 3.14997C13.16 2.88997 12.59 2.74997 12.01 2.74997Z" fill={strokeColor} />
        <path d="M12 22.75C11.56 22.75 11.11 22.69 10.75 22.57L7.56 21.51C6.05 21.01 4.86 19.36 4.87 17.77L4.88 13.08C4.88 12.67 5.22 12.33 5.63 12.33C6.04 12.33 6.38 12.67 6.38 13.08L6.37 17.77C6.37 18.71 7.15 19.79 8.04 20.09L11.23 21.15C11.63 21.28 12.37 21.28 12.77 21.15L15.96 20.09C16.85 19.79 17.63 18.71 17.63 17.78V13.14C17.63 12.73 17.97 12.39 18.38 12.39C18.79 12.39 19.13 12.73 19.13 13.14V17.78C19.13 19.37 17.95 21.01 16.44 21.52L13.25 22.58C12.89 22.69 12.44 22.75 12 22.75Z" fill={strokeColor} />
        <path d="M21.4 15.75C20.99 15.75 20.65 15.41 20.65 15V9C20.65 8.59 20.99 8.25 21.4 8.25C21.81 8.25 22.15 8.59 22.15 9V15C22.15 15.41 21.81 15.75 21.4 15.75Z" fill={strokeColor} />
    </svg>


);

const Memo = memo(SvgComponent);
export default Memo;
