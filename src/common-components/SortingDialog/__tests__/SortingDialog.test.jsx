import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import SortingDialog from '..';
import Dialog from '../../Dialog/Dialog';

describe('SortingDialog tests', () => {
  configure({ adapter: new Adapter() });
  const onClose = sinon.spy();
  const setSorting = sinon.spy();
  const props = {
    onClose,
    setSorting,
    columns: [
      {
        label: 'Column One',
        value: 'col_1',
      },
      {
        label: 'Column Two',
        value: 'col_2',
      },
    ],
  };

  afterEach(() => {
    sinon.resetHistory();
  });

  it('should render correctly without props', () => {
    const wrapper = shallow(<SortingDialog />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call changeSorting on confirm', () => {
    const wrapper = shallow(<SortingDialog {...props} />);
    const confProps = wrapper.find(Dialog).prop('confirmationButtonProps');
    confProps.onConfirm();

    expect(setSorting.called).toBeTruthy();
  });

  it('should call onClose on dialog close', () => {
    const wrapper = shallow(<SortingDialog {...props} />);
    wrapper.find(Dialog).simulate('close');

    expect(onClose.called).toBeTruthy();
  });
});
