import * as React from "react";
import type { SVGProps } from "react";
const Share = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    className="prefix__icon"
    viewBox="0 0 1024 1024"
    {...props}
  >
    <path
      fill="currentColor"
      d="M618.667 288a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h298.667zM704 480a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h384zM533.333 672a32 32 0 0 1 0 64H320a32 32 0 0 1 0-64h213.333z"
    />
    <path
      fill="currentColor"
      d="M768 85.333a128 128 0 0 1 128 128v597.334a128 128 0 0 1-128 128H256a128 128 0 0 1-128-128V213.333a128 128 0 0 1 128-128h512zm0 64H256a64 64 0 0 0-64 64v597.334a64 64 0 0 0 64 64h512a64 64 0 0 0 64-64V213.333a64 64 0 0 0-64-64z"
    />
  </svg>
);
export default Share;
