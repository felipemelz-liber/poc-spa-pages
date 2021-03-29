import styled from 'styled-components';

export const SectionText = styled.span`
  font-family: Roboto;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.38;
  letter-spacing: 0.01px;
  text-align: left;
  color: rgba(35, 39, 47, 0.87);
  margin-bottom: 16px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Line = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`;

export const Wrap = styled(Line)`
  min-width: 332px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;
