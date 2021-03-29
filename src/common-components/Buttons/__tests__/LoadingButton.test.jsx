import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { PrimaryButton, LoadingSpinner } from 'liber-components';
import LoadingButton from '../LoadingButton';

describe('LoadingButton component tests', () => {
  configure({ adapter: new Adapter() });

  const props = {
    ButtonComponent: PrimaryButton,
    children: 'Nome botão',
    loading: false,
    onClick: sinon.spy(),
    disabled: false,
  };
  const sizes = ['small', 'medium', 'large'];

  it('should render correctly without props', () => {
    const wrapper = shallow(<LoadingButton />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  sizes.forEach(size => {
    it(`should render correctly with all props and size ${size}`, () => {
      const wrapper = shallow(<LoadingButton {...props} size={size} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
  it('should render correctly with disabled prop', () => {
    const wrapper = shallow(<LoadingButton {...props} disabled />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render correctly with custom spinner color', () => {
    const wrapper = shallow(<LoadingButton {...props} spinnerColor="#009dff" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render correctly while loading', () => {
    const wrapper = shallow(<LoadingButton {...props} loading />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  it('should render spinner and be disabled when loading', () => {
    const wrapper = shallow(<LoadingButton {...props} loading />);
    const spinner = wrapper.find(LoadingSpinner);
    expect(spinner.length).toBe(1);
    expect(wrapper.prop('disabled')).toBeTruthy();
  });
  it('should call onClick when clicked', () => {
    const wrapper = shallow(<LoadingButton {...props} />);
    const { onClick } = props;
    wrapper.simulate('click');
    expect(onClick.called).toBeTruthy();
  });
});
