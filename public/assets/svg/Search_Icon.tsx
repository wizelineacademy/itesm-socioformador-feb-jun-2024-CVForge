import * as React from 'react'
import { SVGProps, memo } from 'react'

interface LiveIconProps extends SVGProps<SVGSVGElement> {
  strokeColor?: string
}

const SvgComponent = ({ strokeColor = '#171717', ...props }: LiveIconProps) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 11 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.79171 8.75C6.97783 8.75 8.75004 6.97779 8.75004 4.79167C8.75004 2.60554 6.97783 0.833332 4.79171 0.833332C2.60558 0.833332 0.833374 2.60554 0.833374 4.79167C0.833374 6.97779 2.60558 8.75 4.79171 8.75Z"
      stroke={strokeColor}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.16671 9.16667L8.33337 8.33334"
      stroke={strokeColor}
      strokeWidth="1.3"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
)

const Memo = memo(SvgComponent)
export default Memo
