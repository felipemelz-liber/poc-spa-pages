import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import SelectTag from '../SelectTag';
import { Tag } from '../SelectTag.styles';

describe('SelectTag tests', () => {
  configure({ adapter: new Adapter() });
  const onChange = sinon.spy();

  it('should render correctly without props', () => {
    const wrapper = shallow(<SelectTag />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render correctly with props', () => {
    const wrapper = shallow(<SelectTag selected />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call onchange on tag click', () => {
    const wrapper = shallow(<SelectTag selected onChange={onChange} />);
    const tag = wrapper.find(Tag);
    tag.simulate('click');

    expect(onChange.called).toBeTruthy();
  });
});
