import React from 'react';
import ReactDOM from 'react-dom';
import Modal from './Modal';

const dialogMgr = (() => {
  const _dialogGroup = {};
  const closeDialogByName = dialogName => {
    const closeDialogHandler = _dialogGroup[dialogName];
    if (closeDialogHandler) {
      closeDialogHandler();
      delete _dialogGroup[dialogName];
    } else {
      console.warn(`The dialog ${dialogName} is not exist`);
    }
  };

  const showDialog = (dialogInfo = {}, componentProps) => {
    const { name, component: Component, props } = dialogInfo;
    if (!name) {
      throw new Error('Dialog name is missing');
    }
    if (!Component) {
      throw new Error('component is missing');
    }
    const hasDialog = _dialogGroup[name];
    if (hasDialog) {
      throw new Error(`A dialog with the same name already exists: ${name}`);
    }

    let modalNode = document.createElement('div');
    document.body.appendChild(modalNode);

    const render = (modalProps, closeDialog) => {
      ReactDOM.render(
        <Modal {...modalProps} {...props}>
          <Component closeDialog={closeDialog} {...componentProps} />
        </Modal>,
        modalNode
      );
    };

    const closeDialog = () => {
      const removeNode = () => {
        delete _dialogGroup[name];
        ReactDOM.unmountComponentAtNode(modalNode);
        modalNode.parentNode.removeChild(modalNode);
        modalNode = null;
      };
      render({ visible: false, afterClose: removeNode });
    };
    _dialogGroup[name] = closeDialog;

    render({ visible: true, portal: true }, closeDialog);

    return { closeDialog };
  };
  return {
    showDialog,
    closeDialogByName
  };
})();

export default dialogMgr;
