import React from "react";
import styled from "styled-components";
import { boxShadow } from "styles/styles";

const Box = styled.div`
  user-select: none;
  padding: 2rem;
  margin: 1rem 0;
  border-radius: 20px;

  ${boxShadow.type1}
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: -webkit-flex;
`;

const ErrorBox = () => {
  return (
    <Box>
      <ImageBox>
        <p style={{ textAlign: "center", lineHeight: "1.2rem" }}>
          Error <br />
          Try again..
        </p>
      </ImageBox>
    </Box>
  );
};

export default ErrorBox;
