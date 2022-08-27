import React from "react";
import styled from "styled-components";
import { Card } from "styles/styles";

const SkeletonCard = () => {
  return <SkeletonCardBox />;
};

export default SkeletonCard;

const SkeletonCardBox = styled.div`
  ${Card}

  background: #e3dac9;
  height: 100px;
  width: 100px;

  @keyframes skeletonAnimation {
    0% {
      background-position: 0% 90%;
    }
    50% {
      background-position: 100% 90%;
      transform: scale3d(1.1, 1.1, 10);
    }
    100% {
      background-position: 0% 90%;
    }
  }

  animation: skeletonAnimation 2s ease infinite;
`;
