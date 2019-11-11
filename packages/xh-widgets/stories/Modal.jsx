import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Modal, { dialogMgr } from '../src/Modal';
import Button from '../src/Button';

const StyledModal = styled.div`
  width: 100%;
  height: 250px;
  background: #59c6d4;
`;

const CustomModal = () => {
  return (
    <StyledModal>
      <Button
        onClick={() => {
          dialogMgr.closeDialogByName('test');
        }}
      >
        Close
      </Button>
    </StyledModal>
  );
};

const propTypes = {
  portal: PropTypes.bool,
  visible: PropTypes.bool,
  centered: PropTypes.bool,
  afterClose: PropTypes.func,
  maskStyle: PropTypes.instanceOf(Object),
  dialogStyle: PropTypes.instanceOf(Object)
};

const ModalDemo = (
  props
  //   afterClose
  //   children
) => {
  const [visible, setVisible] = useState(props.visible);
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(!visible);
        }}
        style={{ zIndex: 5000 }}
      >
        Open Modal
      </Button>
      <Button
        onClick={() => {
          dialogMgr.showDialog({
            name: 'test',
            component: CustomModal
          });
        }}
        style={{ zIndex: 5000 }}
      >
        Open Modal with dialogMgr
      </Button>
      <Button
        onClick={() => {
          Modal.confirm({
            title: '这是Modal Confirm 的标题',
            content: '这是Modal Confirm的内容'
          });
        }}
        style={{ zIndex: 5000 }}
      >
        Modal.confirm
      </Button>
      <Modal visible={visible} {...props}>
        <StyledModal />
      </Modal>
    </div>
  );
};

ModalDemo.propTypes = propTypes;

export default ModalDemo;
