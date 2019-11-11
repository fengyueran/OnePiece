import Modal from './Modal';
import dialogMgr from './DialogMgr';
import { Confirm } from './Dialogs';

Modal.confirm = componentProps => {
  dialogMgr.showDialog(
    {
      name: 'Confirm',
      component: Confirm,
      props: {
        dialogStyle: { borderRadius: 3 }
      }
    },
    componentProps
  );
};
export default Modal;
export { dialogMgr };
