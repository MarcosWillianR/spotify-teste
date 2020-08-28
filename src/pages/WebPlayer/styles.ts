import styled, { css } from 'styled-components';
import ReactPlayer from 'react-player';

import {
  MAIN_COLOR1,
  MAIN_COLOR2,
  DARK_COLOR1,
  DARK_COLOR2,
  DARK_COLOR3,
  DARK_COLOR4,
  DARK_COLOR5,
  FONT_SIZE_12,
  FONT_SIZE_14,
  FONT_SIZE_16,
  FONT_SIZE_64,
} from '../../styles/variables';

interface MainTrackListItemProps {
  isActive: boolean;
}

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  max-width: 1170px;
  margin: 0 auto;

  position: relative;
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

export const MainTrackList = styled.div`
  padding: 32px 22px;
  display: grid;
  grid-template-columns: 60px minmax(500px, 1fr) repeat(3, minmax(100px, 1fr));
  max-width: 100%;
  padding-bottom: 90px;

  > strong {
    padding: 0 8px 22px 8px;
    margin-bottom: 22px;
    text-transform: uppercase;
    color: ${DARK_COLOR4};
    font-weight: 400;
    font-size: ${FONT_SIZE_12};
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);

    &:nth-of-type(4) {
      text-align: center;
    }

    &:nth-of-type(5) {
      text-align: right;
    }
  }
`;

export const MainTrackListItem = styled.div<MainTrackListItemProps>`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 60px minmax(500px, 1fr) repeat(3, minmax(100px, 1fr));
  align-items: center;
  height: 56px;
  padding: 0 8px;
  border-radius: 4px;

  &:hover {
    background: ${DARK_COLOR5};

    span,
    p,
    strong {
      color: ${MAIN_COLOR1};
    }

    button {
      color: transparent;
      svg {
        color: ${MAIN_COLOR1};
      }
    }
  }

  button {
    height: 100%;
    border: 0;
    background: 0;
    font-size: ${FONT_SIZE_16};
    text-align: left;
    color: ${DARK_COLOR4};
    display: flex;
    align-items: center;

    svg {
      color: transparent;
      width: 22px;
      height: 22px;
    }
  }

  > span {
    font-size: ${FONT_SIZE_14};
    color: ${DARK_COLOR4};

    &:nth-of-type(2) {
      text-align: center;
    }

    &:nth-of-type(3) {
      text-align: right;
    }
  }

  ${props =>
    props.isActive &&
    css`
      background: ${DARK_COLOR5};

      span,
      p,
      strong {
        color: ${MAIN_COLOR1};
      }

      button {
        color: transparent;
        svg {
          color: ${MAIN_COLOR1};
        }
      }
    `}
`;

export const ArtistProfile = styled.div`
  display: flex;
  flex-wrap: wrap;

  img {
    width: 40px;
    height: 40px;
    margin-right: 16px;
  }
`;

export const MusicAndArtistNameContainer = styled.div`
  p {
    font-size: ${FONT_SIZE_16};
    color: ${MAIN_COLOR1};
    font-weight: 700;
    max-width: 400px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  strong {
    width: 100%;
    font-size: ${FONT_SIZE_14};
    color: ${DARK_COLOR4};
    font-weight: 400;
  }
`;

export const PlayerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99999;

  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  max-width: 1170px;
  margin: 0 auto;
`;

export const Player = styled(ReactPlayer)``;
