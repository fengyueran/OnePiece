import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  modalEnterCss,
  modalFadeCss,
  opacityIncreaseCss,
  opacityDecreaseCss
} from './animation';

const BaseModal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1314;
  overflow: auto;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  display: ${({ modalDisplay }) => (modalDisplay ? 'flex' : 'none')};
  align-items: ${({ centered }) => (centered ? 'center' : 'flex-start')};
  ${({ visible }) => (visible ? opacityIncreaseCss : opacityDecreaseCss)};
`;

const Dialog = styled.div`
  position: relative;
  width: 520px;
  background: #fff;
  margin: 50px auto;
  ${({ visible }) => (visible ? modalEnterCss : modalFadeCss)};
`;

const propTypes = {
  portal: PropTypes.bool,
  visible: PropTypes.bool,
  centered: PropTypes.bool,
  children: PropTypes.node,
  afterClose: PropTypes.func,
  style: PropTypes.instanceOf(Object)
};

const ModalDialog = ({
  portal,
  visible,
  centered,
  afterClose,
  children,
  style
}) => {
  const dialogRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDisplay, setModalDisplay] = useState(portal);

  useEffect(() => {
    if (visible && !portal) {
      setModalDisplay(true);
      return;
    }
    setModalVisible(visible);
  }, [portal, visible]);

  useEffect(() => {
    if (modalDisplay) {
      setModalVisible(true);
    }
  }, [modalDisplay]);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    const onTransitionend = () => {
      if (!modalVisible) {
        setModalDisplay(false);
      }
      if (afterClose) {
        afterClose();
      }
    };

    dialogNode.addEventListener('animationend', onTransitionend);
    return () => {
      dialogNode.removeEventListener('animationend', onTransitionend);
    };
  }, [afterClose, modalVisible]);

  return (
    <BaseModal
      visible={modalVisible}
      modalDisplay={modalDisplay}
      centered={centered}
    >
      <Dialog
        portal={portal}
        visible={modalVisible}
        ref={dialogRef}
        style={style}
      >
        {children}
      </Dialog>
    </BaseModal>
  );
};

ModalDialog.propTypes = propTypes;

export default ModalDialog;
