import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { LoadingContainer } from '../LoadingButton.styles';

describe('LoadingButton style tests', () => {
  configure({ adapter: new Adapter() });

  const widths = [0, 10, 55];

  it(`should render LoadingButton without props correctly`, () => {
    const wrapper = shallow(<LoadingContainer />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
  widths.forEach(width => {
    it(`should render LoadingButton with width ${width}px correctly`, () => {
      const wrapper = shallow(<LoadingContainer minWidth={width} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
