import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import * as styles from '../styles';

describe('SortingDialog styled components tests', () => {
  configure({ adapter: new Adapter() });

  Object.keys(styles).forEach(style => {
    const Component = styles[style];
    it(`should render ${style} correctly`, () => {
      const wrapper = shallow(<Component />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
