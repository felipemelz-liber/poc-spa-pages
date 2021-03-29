import styled from 'styled-components';
import { FlatButton } from 'liber-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Info = styled.div`
  width: 100%;
  padding: 4px 0;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.05px;
  color: #2d2d2d;
`;

export const FullBar = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background-color: #008000;
`;

export const UsedBar = styled(FullBar)`
  background-color: #da2d16;
  width: ${({ usagePercent }) => (usagePercent ? `${usagePercent * 100}%` : 0)};
`;

export const Button = styled(FlatButton)`
  width: fit-content;
  font-size: 12px;
  margin-top: 4px;
  padding: 0 8px 0 4px;

  svg {
    width: 14px;
    height: 14px;
  }
`;
