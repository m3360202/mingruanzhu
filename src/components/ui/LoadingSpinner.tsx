import React from 'react';
import styled from 'styled-components';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "hold on, loading...", 
  size = 'medium',
  className = ''
}) => {
  return (
    <StyledWrapper className={`loading-container ${size} ${className}`}>
      <span className="loader" />
      <p className="loading-message">{message}</p>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  .loader {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .loader::after,
  .loader::before {
    content: "";
    display: inline-block;
    background-color: #fff;
    background-image: radial-gradient(circle 14px, #0d161b 100%, transparent 0);
    background-repeat: no-repeat;
    border-radius: 50%;
    animation: eyeMove 10s infinite, blink 10s infinite;
  }

  .loading-message {
    font-size: 16px;
    color: #666;
    text-align: center;
    margin: 0;
    font-weight: 400;
  }

  /* Size variants */
  &.small .loader {
    width: 72px;
  }
  &.small .loader::after,
  &.small .loader::before {
    width: 32px;
    height: 32px;
    background-image: radial-gradient(circle 10px, #0d161b 100%, transparent 0);
  }
  &.small .loading-message {
    font-size: 14px;
  }

  &.medium .loader {
    width: 108px;
  }
  &.medium .loader::after,
  &.medium .loader::before {
    width: 48px;
    height: 48px;
    background-image: radial-gradient(circle 14px, #0d161b 100%, transparent 0);
  }
  &.medium .loading-message {
    font-size: 16px;
  }

  &.large .loader {
    width: 144px;
  }
  &.large .loader::after,
  &.large .loader::before {
    width: 64px;
    height: 64px;
    background-image: radial-gradient(circle 18px, #0d161b 100%, transparent 0);
  }
  &.large .loading-message {
    font-size: 18px;
  }

  @keyframes eyeMove {
    0%,
    10% {
      background-position: 0px 0px;
    }
    13%,
    40% {
      background-position: -15px 0px;
    }
    43%,
    70% {
      background-position: 15px 0px;
    }
    73%,
    90% {
      background-position: 0px 15px;
    }
    93%,
    100% {
      background-position: 0px 0px;
    }
  }

  @keyframes blink {
    0%,
    10%,
    12%,
    20%,
    22%,
    40%,
    42%,
    60%,
    62%,
    70%,
    72%,
    90%,
    92%,
    98%,
    100% {
      height: var(--eye-height, 48px);
    }
    11%,
    21%,
    41%,
    61%,
    71%,
    91%,
    99% {
      height: calc(var(--eye-height, 48px) * 0.375);
    }
  }

  /* Update eye height for different sizes */
  &.small .loader::after,
  &.small .loader::before {
    --eye-height: 32px;
  }
  &.medium .loader::after,
  &.medium .loader::before {
    --eye-height: 48px;
  }
  &.large .loader::after,
  &.large .loader::before {
    --eye-height: 64px;
  }
`;

export default LoadingSpinner; 