import styled from 'styled-components';
import { TEXT_COLOR } from '../CommonStyles';

export const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 160px;
  margin: 24px 0 -80px 0;
`;

export const LimiterContainer = styled.div`
  width: 100%;
  min-width: 930px;
`;

export const ConfirmationContent = styled.div`
  font-family: Roboto;
  font-size: 16px;
  line-height: 1.38;
  letter-spacing: 0.06px;
  color: ${TEXT_COLOR};
  width: 408px;
`;
