import React from 'react';
import PropTypes from 'prop-types';
import BackDrop from './BackDrop';
import ModalDialog from './ModalDialog';

const propTypes = {
  portal: PropTypes.bool,
  visible: PropTypes.bool,
  centered: PropTypes.bool,
  afterClose: PropTypes.func,
  maskStyle: PropTypes.instanceOf(Object),
  dialogStyle: PropTypes.instanceOf(Object),
  children: PropTypes.node
};

const Modal = ({
  portal,
  visible,
  centered,
  maskStyle,
  dialogStyle,
  afterClose,
  children
}) => {
  return (
    <>
      <BackDrop portal={portal} visible={visible} style={maskStyle} />
      <ModalDialog
        portal={portal}
        visible={visible}
        centered={centered}
        style={dialogStyle}
        afterClose={afterClose}
      >
        {children}
      </ModalDialog>
    </>
  );
};

Modal.propTypes = propTypes;

export default Modal;
