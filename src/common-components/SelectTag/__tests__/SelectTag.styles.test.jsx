import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import * as Components from '../SelectTag.styles';

describe('SelectTag styled components test', () => {
  configure({ adapter: new Adapter() });
  Object.keys(Components).forEach(componentName => {
    const Component = Components[componentName];
    it(`should render ${componentName} correctly`, () => {
      const wrapper = shallow(<Component />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
