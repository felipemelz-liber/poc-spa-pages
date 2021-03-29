import styled from 'styled-components';
import { LoadingBunny, Button as ButtonBase } from 'liber-components';

export const TEXT_COLOR = '#6287a7';

export const PaddingLeft = styled.div`
  padding-left: 16px;
  width: fit-content;
`;

export const IconButton = styled(ButtonBase).attrs(() => ({
  version: 2,
  size: 'large',
}))`
  padding: 4px;
  border-radius: 50%;
  color: ${TEXT_COLOR};

  svg {
    fill: ${TEXT_COLOR} !important;
    width: 20px;
    height: 20px;
  }
`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: ${({ loading }) => (loading ? 'none' : null)};
  opacity: ${({ loading }) => (loading ? '0.3' : '1')};
  background-color: white;
  transition: opacity 150ms ease-in-out;
  z-index: 201;
  position: relative;
`;

export const Bunny = styled(LoadingBunny).attrs(() => ({ loop: true }))`
  width: 200px;
  height: 250px;
  position: absolute;
  z-index: 202;
`;
