import * as React from 'react'
import { SVGProps, memo } from 'react'

interface LiveIconProps extends SVGProps<SVGSVGElement> {
  strokeColor?: string
  flipDegree: number // Degree to flip the icon when activated
}

const SvgComponent = ({
  strokeColor = '#7E7E7E',
  flipDegree = 0,
  ...props
}: LiveIconProps) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: flipDegree ? `rotate(${flipDegree}deg)` : 'none' }}
  >
    <path
      d="M19.92 15.05L13.4 8.53001C12.63 7.76001 11.37 7.76001 10.6 8.53001L4.08 15.05"
      stroke={strokeColor}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Memo = memo(SvgComponent)
export default Memo
