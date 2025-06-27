import React, { useState } from "react";
import styled, { keyframes } from 'styled-components';
import { useTheme } from '@mui/material';

interface ActionButtonProps {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  className,
  children,
  disabled = false
}) => {
  const theme = useTheme();
  const [isRippling, setIsRippling] = useState(false);
  
  const handleClick = () => {
    if (disabled) return;
    
    // Create ripple effect
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 500);
    
    // Call the original onClick handler
    if (onClick) onClick();
  };
  
  return (
    <StyledWrapper
      className={className}
      $primaryColor={theme.palette.primary.main}
    >
      <button
        className="button type1"
        onClick={handleClick}
        disabled={disabled}
      >
        <span className="btn-txt">{children}</span>
        {isRippling && <span className="ripple"></span>}
      </button>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  $primaryColor: string;
}

const rippleEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.6;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
`;

const StyledWrapper = styled.div<StyledWrapperProps>`
  .button {
    height: 40px;
    width: 200px;
    position: relative;
    background-color: transparent;
    cursor: pointer;
    border: 1px solid #252525;
    overflow: hidden;
    border-radius: 5px;
    color: #333;
    transition: color 0.5s ease-in-out, box-shadow 0.5s ease-in-out,
      border 0.5s ease-in-out, transform 0.2s ease-in-out;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    &:active {
      transform: scale(0.97);
      box-shadow: inset 0 0 8px rgba(0, 0, 0, 0.2);
    }

    &:active .btn-txt {
      opacity: 0.8;
      transform: translateY(1px);
    }
  }

  .ripple {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    transform: scale(0);
    animation: ${rippleEffect} 0.5s linear;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
    z-index: 0;
  }

  .btn-txt {
    z-index: 1;
    font-weight: 800;
    letter-spacing: 2px;
    position: relative;
  }

  .type1::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.$primaryColor || "#1976d2"};
    border-radius: 5px;
    opacity: 0;
    transform: scale(0.1);
    transform-origin: center;
    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out,
      filter 0.2s ease-in-out;
    z-index: -1;
  }

  .button:hover {
    box-shadow: 0 0 10px 2px ${(props) => props.$primaryColor || "#1976d2"};
    color: ${(props) => props.$primaryColor || "#1976d2"};
    border: 1px solid transparent;
  }

  .type1:hover::after {
    opacity: 1;
    transform: scale(1);
  }

  .type1:active::after {
    opacity: 1;
    transform: scale(1);
    filter: brightness(0.85);
  }
`;

export default ActionButton; 