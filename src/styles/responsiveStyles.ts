import { keyframes, css, SerializedStyles } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-100%);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const animationStyles = css`
  animation-duration: 0.5s; /* Adjust the duration as needed */
  animation-timing-function: ease-in-out;
`;

export const animatedStyles = (isAppearing: boolean): SerializedStyles => css`
  ${animationStyles};
  animation-name: ${isAppearing ? fadeIn : fadeOut};
`;
