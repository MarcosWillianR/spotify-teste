import styled from 'styled-components';
import {
  LIGHT_COLOR1,
  MAIN_COLOR1,
  MAIN_COLOR2,
  DARK_COLOR1,
  DARK_COLOR2,
  DARK_COLOR3,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_64,
} from '../../styles/variables';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  max-width: 1170px;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  min-height: 340px;
  padding: 32px 22px;
  background: linear-gradient(to bottom, ${DARK_COLOR1}, ${MAIN_COLOR2} 95%);
  border-bottom: 1px solid rgba(0, 0, 0, 0.8);

  display: flex;
  align-items: flex-end;
`;

export const ImageContainer = styled.div`
  width: 232px;
  height: 232px;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);

  background: ${DARK_COLOR2};

  img {
    max-width: 100%;
  }
`;

export const TitleContainer = styled.div`
  margin-left: 22px;
  h2,
  button {
    text-transform: uppercase;
    font-size: ${FONT_SIZE_12};
    font-weight: 700;
  }

  h1 {
    font-size: ${FONT_SIZE_64};
    line-height: ${FONT_SIZE_64};
    margin: 32px 0 22px 0;
    font-weight: 900;
  }

  strong {
    font-size: ${FONT_SIZE_12};
    font-weight: 700;
  }

  button {
    font-size: ${FONT_SIZE_14};
    background: ${MAIN_COLOR2};
    color: ${MAIN_COLOR1};

    padding: 6px 16px;
    border: 1px solid ${DARK_COLOR1};
    border-radius: 100px;
    margin-left: 12px;

    transition: background-color 0.5s ease;

    &:hover {
      background: ${DARK_COLOR3};
    }
  }
`;
