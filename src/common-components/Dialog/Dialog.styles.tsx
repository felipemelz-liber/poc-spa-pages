import styled from 'styled-components';

export const DialogHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
`;

export const DialogActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 24px;
  padding-top: 0px;
`;

export const DialogContent = styled.div`
  padding: 24px;
  padding-top: 0px;
  max-width: ${({ maxWidth }) => maxWidth || '522'}px;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-size: 21px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.08px;
  text-align: left;
  color: #4b6f85;
`;
