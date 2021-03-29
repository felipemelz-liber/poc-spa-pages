import styled, { css } from 'styled-components';
import { handleThemeFromObject } from 'liber-components';
import { TEXT_COLOR } from '../CommonStyles';

const WHITE = '#f9fafa';
const HEADER_COLOR = '#4b6f85';

const getPrimaryColor = ({ theme }) => handleThemeFromObject(theme, 'colors.primary', '#009dff');

export const Container = styled.div`
  width: 100%;

  * {
    font-family: Roboto;
  }
`;

export const Subtitle = styled.div`
  font-size: 16px;
  line-height: 1.38;
  letter-spacing: 0.06px;
  color: ${TEXT_COLOR};
  margin-bottom: 52px;
`;

export const CardsRow = styled.div`
  margin-bottom: 32px;
  display: flex;

  & > div {
    margin-right: 26px;
  }
`;

export const SelectableCard = styled.div`
  width: 200px;
  border-radius: 4px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  svg {
    width: 18px;
    height: 18px;
    margin: 0 8px 4px 0;
  }

  ${({ selected }) =>
    selected
      ? css`
          border: solid 1px ${getPrimaryColor};
          background-color: ${getPrimaryColor};
          * {
            color: ${WHITE} !important;
          }
          svg {
            fill: ${WHITE};
          }
        `
      : css`
          cursor: pointer;
          border: solid 1px #cdd7df;
          svg {
            fill: ${HEADER_COLOR};
          }
        `}
`;

export const Text = styled.div`
  color: ${HEADER_COLOR};
  font-weight: 500;
  font-size: 16px;
`;
