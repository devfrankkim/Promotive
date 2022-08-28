import React from "react";
import styled from "styled-components";
import { boxShadow, Card, Skeleton } from "styles/styles";

export const getSkeletonCards = (cards: number = 1) =>
  [cards].map((_, idx) => (
    <div key={idx}>
      <SkeletonCard />
    </div>
  ));

const SkeletonCard = () => {
  //  ====== Skeleton  =======

  return <SkeletonCardBox />;
};

export default SkeletonCard;

const SkeletonCardBox = styled.div`
  ${Card}
  ${Skeleton}

  @keyframes skeletonAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
      transform: scale3d(1.1, 1.1, 10);
    }
    100% {
      background-position: 0% 90%;
    }
  }

  animation: skeletonAnimation 2s ease infinite;
`;
