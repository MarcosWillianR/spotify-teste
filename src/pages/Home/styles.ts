import styled, { css } from 'styled-components';
import {
  MAIN_COLOR1,
  MAIN_COLOR2,
  GREEN_COLOR1,
  GREEN_COLOR2,
  BLUE_COLOR1,
  BLUE_COLOR3,
  FONT_SIZE_14,
  FONT_SIZE_32,
  FONT_SIZE_64,
  FONT_SIZE_80,
} from '../../styles/variables';

interface HamburguerIconProps {
  menuIsOpen: boolean;
}

interface HeaderNavigationProps {
  menuIsOpen: boolean;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export const HamburguerIcon = styled.div<HamburguerIconProps>`
  width: 40px;
  height: 3px;
  background: #fff;
  border-radius: 6px;
  transition: all 0.5s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 40px;
    height: 3px;
    background: #fff;
    border-radius: 6px;
    transition: all 0.5s ease-in-out;
  }

  &:before {
    transform: translateY(-12px);
  }

  &:after {
    transform: translateY(12px);
  }

  ${props =>
    props.menuIsOpen &&
    css`
      transform: translateX(-50px);
      background: transparent;

      &:before {
        transform: rotate(45deg) translate(35px, -35px);
      }

      &:after {
        transform: rotate(-45deg) translate(35px, 35px);
      }
    `}
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
  height: 80px;
  padding: 0 22px;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderNavigation = styled.nav<HeaderNavigationProps>`
  ul {
    display: flex;
    align-items: center;

    li {
      margin-bottom: 1px;

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
    }
  }

  > button {
    display: none;
    position: relative;
    z-index: 99999;
    background: 0;
    border: 0;

    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;

    transition: all 0.5s ease-in-out;
  }

  @media (max-width: 760px) {
    display: flex;
    flex-wrap: wrap;

    ul {
      width: 100%;
      height: 100vh;
      background: rgba(0, 0, 0, 0.9);
      display: ${props => (props.menuIsOpen ? 'flex' : 'none')};
      flex-direction: column;
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;

      li {
        width: 100%;
        text-align: center;
        &:nth-of-type(3) a {
          display: block;
          &:after {
            display: none;
          }
        }

        a {
          font-size: ${FONT_SIZE_32};
          font-weight: 500;
          display: block;
        }

        & + li {
          margin-top: 22px;
        }

        &:last-of-type {
          a {
            font-weight: 700;
          }
        }
      }
    }

    > button {
      width: 100%;
      display: flex;
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

  a {
    text-decoration: none;
    width: 290px;
    margin-top: 32px;
    text-align: center;

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

  @media (max-width: 760px) {
    background-size: 100%;
    height: calc(100vh - 122px);
    min-height: 600px;
    background-position: 85% 110%;

    h1 {
      font-size: ${FONT_SIZE_64};
      line-height: ${FONT_SIZE_64};
      font-weight: 900;
    }

    p {
      max-width: 350px;
      text-align: center;
      margin: 22px;
    }

    a {
      width: 210px;
    }
  }
`;

export const Footer = styled.footer`
  max-width: 1170px;
  min-height: auto;
  margin: 0 auto;
  padding: 38px 22px;

  text-align: center;

  img {
    width: 140px;
  }
`;
