import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding: 16px 8px 0px 8px;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const FlashAlert = styled.div`
  min-height: 64px;
  border-radius: 4px;
  box-shadow: 0 2px 6px 0 rgba(35, 39, 47, 0.64);
  background-color: #f9fafa;
  margin: 0 4px 24px 4px;
  padding: 12px 12px 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  line-height: 1.38;
  letter-spacing: 0.06px;
  text-align: left;
  color: rgba(35, 39, 47, 0.64);
  border-left: #009dff solid 4px;
`;
