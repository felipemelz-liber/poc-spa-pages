import React from 'react';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import { Modal, FlatButton } from 'liber-components';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import Dialog from '../Dialog';
import LoadingButton from '../../Buttons/LoadingButton';

describe('Dialog tests', () => {
  configure({ adapter: new Adapter() });
  const onClose = sinon.spy();
  const onConfirm = sinon.spy();

  const props = {
    onClose,
    confirmationButtonProps: {
      onConfirm,
    },
  };

  afterEach(() => {
    sinon.resetHistory();
  });

  it('should render correctly without props', () => {
    const wrapper = shallow(<Dialog />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call onClose on modal leave', () => {
    const wrapper = shallow(<Dialog {...props} />);
    wrapper.find(Modal).simulate('leaved');
    expect(onClose.called).toBeTruthy();
  });

  it('should call onClose on CancelButton click', () => {
    const wrapper = shallow(<Dialog {...props} />);
    wrapper.find(FlatButton).simulate('click');
    expect(onClose.called).toBeTruthy();
  });

  it('should call onConfirm on ConfirmButton click', () => {
    const wrapper = shallow(<Dialog {...props} />);
    wrapper.find(LoadingButton).simulate('click');
    expect(onConfirm.called).toBeTruthy();
  });

  it('should disable ConfirmButton if disabled is true on confirmationButtonProps', () => {
    const disabledProps = {
      confirmationButtonProps: {
        disabled: true,
      },
    };
    const wrapper = shallow(<Dialog {...disabledProps} />);
    const confirmButton = wrapper.find(LoadingButton);
    expect(confirmButton.props().disabled).toBeTruthy();
  });
});
