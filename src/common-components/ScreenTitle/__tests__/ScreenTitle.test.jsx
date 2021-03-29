import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import Icon from '@mdi/react';
import ScreenTitle from '../ScreenTitle';

describe('ScreenTitle component tests', () => {
  configure({ adapter: new Adapter() });

  const handleBack = sinon.spy();

  it('should render ScreenTitle correctly without props', () => {
    const wrapper = shallow(<ScreenTitle />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render ScreenTitle correctly with props', () => {
    const wrapper = shallow(<ScreenTitle handleBack={handleBack}>Mock Title</ScreenTitle>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call onFilter when clicking on FilterButton', () => {
    const wrapper = shallow(<ScreenTitle handleBack={handleBack}>Mock Title</ScreenTitle>);
    expect(toJson(wrapper)).toMatchSnapshot();
    const backButton = wrapper.find(Icon);
    backButton.simulate('click');
    expect(handleBack.called).toBeTruthy();
  });
});
