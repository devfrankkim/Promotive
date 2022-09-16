import styled from "styled-components";
import { boxShadow, FlexCenter } from "styles/styles";

type TStyle = {
  position: string;
  right: string;
  top: string;
  width: string;
  height: string;
};

type TSkeletonStyle = {
  styles: {
    position: string;
    right: string;
    top: string;
    width: string;
    height: string;
  };
};

export const getSkeletonCards = (cards: number, skeletonStyles: TStyle) => {
  return [cards].map((_, idx) => (
    <div key={idx}>
      <SkeletonCard styles={skeletonStyles} />
    </div>
  ));
};

const SkeletonCard = ({ styles }: TSkeletonStyle) => {
  //  ====== Skeleton  =======

  return <SkeletonCardBox styles={styles} />;
};

export default SkeletonCard;

const SkeletonCardBox = styled.div<TSkeletonStyle>`
  ${boxShadow.type3};
  border-radius: 5px;

  width: ${(props) => props.styles.width};
  height: ${(props) => props.styles.height};
  position: ${(props) => props.styles.position};
  right: ${(props) => props.styles.right};
  top: ${(props) => props.styles.top};

  background: grey;

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
