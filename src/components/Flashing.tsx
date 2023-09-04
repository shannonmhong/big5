import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";

// Define the flashing animation
const flash = keyframes`
  0% {
    background-color: transparent;
  }
  50% {
    background-color: #c9ab91;
  }
  100% {
    background-color: transparent;
  }
`;

// Create a styled component that applies the flashing animation
const FlashingWrapper = styled.div<{ isFlashing: boolean }>`
  ${({ isFlashing }) =>
    isFlashing &&
    css`
      animation: ${flash} 300ms 3;
    `}
`;

// Flashing component
interface FlashingProps {
  children: ReactNode;
  isFlashing: boolean;
}

const Flashing: React.FC<FlashingProps> = ({ children, isFlashing }) => {
  return <FlashingWrapper isFlashing={isFlashing}>{children}</FlashingWrapper>;
};

export default Flashing;
