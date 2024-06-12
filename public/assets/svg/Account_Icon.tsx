import * as React from 'react'
import { SVGProps, memo } from 'react'

interface LiveIconProps extends SVGProps<SVGSVGElement> {
  strokeColor?: string
}

const SvgComponent = ({ strokeColor = '#7E7E7E', ...props }: LiveIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" id="Account">
    <path
      d="M24 8c-4.42 0-8 3.58-8 8 0 4.41 3.58 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm0 20c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8z"
      fill={strokeColor}
      className="color000000 svgShape"
    ></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
)

const Memo = memo(SvgComponent)
export default Memo
