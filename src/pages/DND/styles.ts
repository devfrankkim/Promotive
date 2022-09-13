import styled from "styled-components";
import { palette } from "styles/styles";
import { TDarkMode } from "../../types";

export const FlexCenter = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
export const WrapperTitle = styled.div<TDarkMode>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  :hover {
    .WrapperTitle__edit_delete_div {
      display: block;
      transition: 0.2s;
    }
  }
  :hover {
    transition: 0.2s;
    opacity: 1;
  }

  .WrapperTitle__title {
    border: none;
    display: flex;
    align-items: center;
    position: relative;
    height: 28px;
    font-size: 1.2rem;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    overflow: hidden;
    overflow-wrap: break-word;
    color: ${(props) =>
      props.darkMode ? `${palette.white}` : `${palette.darkPurple}`};
  }

  .WrapperTitle__edit_delete_div {
    position: relative;
    display: none;
  }

  .WrapperTitle__edit_delete__buttons {
    display: flex;
    align-items: center;
    gap: 3px;
    color: ${(props) =>
      props.darkMode ? `${palette.orange}` : `${palette.lightPurple}`};
  }

  .WrapperTitle__edit_delete__buttons .icon {
    :hover {
      opacity: 0.4;
      transition: 0.2s;
    }
  }

  .cancel-icon {
    font-size: 1.2rem;
    position: relative;
    top: -5px;
    :hover {
      opacity: 0.6;
      transition: 0.2s;
    }
  }

  .card.icon {
    font-size: 0.9rem;
    color: ${(props) =>
      props.darkMode ? `${palette.lightPurple}` : `${palette.orange}`};

    :hover {
      opacity: 0.6;
      transition: 0.2s;
    }
  }
`;
