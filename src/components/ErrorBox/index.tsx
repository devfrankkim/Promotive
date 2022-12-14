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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
  display: -ms-flexbox; /* TWEENER - IE 10 */
  display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
  display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
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
