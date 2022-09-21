import styled from "styled-components";

const Loader = () => {
  return <SLoader />;
};

const SLoader = styled.div`
  top: 15rem;
  font-size: 5rem;
  margin: 2rem auto;
  justify-content: center;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #f16301;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 0.7s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
