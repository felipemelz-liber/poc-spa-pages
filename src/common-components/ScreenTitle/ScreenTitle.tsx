import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import { handleThemeFromObject as getTheme } from 'liber-components';

const Container = styled.span`
  font-family: Roboto;
  font-size: 32px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.41;
  letter-spacing: 0.13px;
  color: ${({ theme }) => getTheme(theme, 'colors.primary', '#009dff')};
  margin: 24px 0px;

  width: 100%;
  display: flex;
  align-items: center;

  & > svg {
    width: 32px;
    height: 32px;
    fill: ${({ theme }) => getTheme(theme, 'colors.primary', '#009dff')};
    margin-right: 16px;
    margin-bottom: 2px;
    cursor: pointer;
  }
`;

const ScreenTitle = ({ handleBack, children }) => (
  <Container onClick={handleBack}>
    {handleBack && <Icon data-testid="page-back-button"  path={mdiArrowLeft} />}
    {children}
  </Container>
);

ScreenTitle.propTypes = {
  handleBack: PropTypes.func,
  children: PropTypes.node,
};

ScreenTitle.defaultProps = {
  handleBack: null,
  children: <div />,
};

export default ScreenTitle;
