import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { fade } from '../utils';
import Row from '../Row';
import Button from '../Button';

const Head = styled.h4`
  padding: 1rem;
  font-size: 1.2rem;
  margin: 0;
`;

const Content = styled.p`
  padding: 0 1rem 1rem 1rem;
`;

const ButtonWrapper = styled(Row)`
  padding: 0.8rem 1rem;
  justify-content: flex-end;
`;

const fadeColor = fade('#337ab7', 0.6);
const OkBtn = styled(Button)`
  background: #337ab7;
  color: #fff;
  border: 1px solid;
  border-color: #337ab7;
  box-shadow: none;
  background-clip: padding-box;
  padding: 4px 16px;
  &:hover {
    border-color: ${fadeColor};
    background-color: ${fadeColor};
  }
`;

const CancelBtn = styled(Button)`
  background: none;
  border: 1px #c1b6b6 solid;
  padding: 4px 16px;
  box-shadow: none;
`;

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  onOk: PropTypes.func,
  onClose: PropTypes.func,
  closeDialog: PropTypes.func.isRequired
};
const defaultProps = {
  title: '这是标题',
  content: '这是内容'
};

const Confirm = ({ title, content, onOk, onClose, closeDialog }) => {
  const handleOkClick = useCallback(() => {
    if (onOk) {
      onOk();
    }
    closeDialog();
  }, [closeDialog, onOk]);
  const handleCancelClick = useCallback(() => {
    if (onClose) {
      onClose();
    }
    closeDialog();
  }, [closeDialog, onClose]);
  return (
    <>
      <Head>{title}</Head>
      <Content>{content}</Content>
      <ButtonWrapper>
        <CancelBtn onClick={handleCancelClick}>取消</CancelBtn>
        <OkBtn onClick={handleOkClick}>确定</OkBtn>
      </ButtonWrapper>
    </>
  );
};

Confirm.propTypes = propTypes;
Confirm.defaultProps = defaultProps;

export { Confirm };
