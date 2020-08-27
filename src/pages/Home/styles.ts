import styled from 'styled-components';
import {
  MAIN_COLOR1,
  MAIN_COLOR2,
  GREEN_COLOR1,
  GREEN_COLOR2,
  BLUE_COLOR1,
  BLUE_COLOR3,
  FONT_SIZE_14,
  FONT_SIZE_80,
} from '../../styles/variables';

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const Header = styled.header`
  width: 100%;
  max-height: 80px;
  background: ${MAIN_COLOR2};

  position: fixed;

  img {
    width: 132px;
  }
`;

export const HeaderContent = styled.div`
  padding: 0 22px;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderNavigation = styled.nav`
  ul {
    display: flex;
    align-items: center;

    li {
      margin-bottom: 1px;

      &:nth-of-type(3) {
        a {
          display: flex;
          align-items: center;
          &:after {
            content: '';
            display: inline-block;
            width: 1px;
            height: 16px;
            background-color: ${MAIN_COLOR1};
            margin-left: 34px;
          }
        }
      }

      a {
        text-decoration: none;
      }

      button {
        border: 0;
        background: 0;
      }

      a,
      button {
        font-weight: 700;

        color: ${MAIN_COLOR1};
        padding: 30px 17px;

        transition: color 0.35s;

        &:hover {
          color: ${GREEN_COLOR2};
        }
      }
    }
  }
`;

export const MainContent = styled.main`
  height: 100%;
  min-height: 840px;
  width: 100%;
  padding: 28px 22px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background: url('https://www.scdn.co/i/home/lieVariants/bursts.svg') no-repeat;
  background-color: ${BLUE_COLOR3};
  background-size: 165%;
  background-position: 43% 0%;

  h1 {
    text-align: center;

    font-size: calc(${FONT_SIZE_80} * 2);
    line-height: calc(${FONT_SIZE_80} * 2 + 10);
    font-weight: 900;
  }

  h1,
  p {
    color: ${GREEN_COLOR1};
  }

  button {
    width: 290px;
    margin-top: 32px;

    border: 0;
    background: ${GREEN_COLOR1};
    color: ${BLUE_COLOR1};
    font-weight: 700;
    font-size: ${FONT_SIZE_14};
    text-transform: uppercase;
    border-radius: 100px;
    padding: 16px 40px;

    transition: all 0.35s;

    &:hover {
      background: ${MAIN_COLOR1};
    }
  }
`;

export const Footer = styled.footer`
  max-width: 1170px;
  margin: 0 auto;
  padding: 38px 22px;

  text-align: center;

  img {
    width: 140px;
  }
`;
