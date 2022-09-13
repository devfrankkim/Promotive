import { useRecoilState } from "recoil";
import { darkLightMode } from "recoil/DnDToDoAtom";

import styled from "styled-components";
import { FlexCenter, palette } from "styles/styles";

import { TDarkMode } from "types";
import { TABLET } from "utils/responsiveness";

const DarkMode = () => {
  const [isDarkMode, isSetDarkMode] = useRecoilState(darkLightMode);

  return (
    <Wrapper darkMode={isDarkMode}>
      <div className="switch">
        <label className="theme-switch" htmlFor="checkbox">
          <input type="checkbox" id="checkbox" />
          <div
            className="slider round"
            onClick={() => isSetDarkMode((prev: any) => !prev)}
          >
            <span className="sunMode"></span>
            <span className="moonMode"></span>
          </div>
        </label>
      </div>
    </Wrapper>
  );
};

export default DarkMode;

const Wrapper = styled.div<TDarkMode>`
  span {
    user-select: none;
    position: relative;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    align-items: center;
    justify-content: center;
    text-align: center;
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
    display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  }

  .switch {
    ${FlexCenter}
    z-index: 9999;
    height: 4rem;
    /* right: 3rem; */
    /* top: 2rem; */

    /* @media ${TABLET} {
      right: 8rem;
    } */
  }

  .theme-switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 25px;
    padding-right: 4.65rem;

    @media ${TABLET} {
      width: 60px;
    }
  }

  .theme-switch input {
    display: none;
  }

  .slider {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9999;
    background: white;
    width: 75px;
    height: 26px;
    background-color: ${(props) => props.theme.darkBG};
    /* box-shadow: ${(props) => props.darkMode && props.theme.darkBoxShadow}; */
    cursor: pointer;
  }

  .slider.round {
    border-radius: 34px;
    align-items: center;
    justify-content: space-around;
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
    display: flex; /* NEW, Spec - Firefox, Chrome, Opera */
  }

  .sunMode {
    align-items: center;
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
    display: flex; /* NEW, Spec - Firefox, Chrome, Opera */

    opacity: ${(props) => props.darkMode && 0};
    transition: 0.3s;
    font-size: 0.6rem;
    background: ${palette.orange};

    @media ${TABLET} {
      font-size: 50px;
    }
  }

  .moonMode {
    align-items: center;
    display: -webkit-box; /* OLD - iOS 6-, Safari 3.1-6, BB7 */
    display: -ms-flexbox; /* TWEENER - IE 10 */
    display: -webkit-flex; /* NEW - Safari 6.1+. iOS 7.1+, BB10 */
    display: flex; /* NEW, Spec - Firefox, Chrome, Opera */

    background: ${palette.lightPurple};
    transform: ${(props) => props.darkMode && "translateX(1px)"};
    opacity: ${(props) => (props.darkMode ? 1 : 0)};
    transition: 0.3s;
    font-size: 0.6rem;

    @media ${TABLET} {
      font-size: 50px;
    }
  }
`;
