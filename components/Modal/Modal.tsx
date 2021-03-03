import { useEffect } from 'react';
import ReactModal from 'react-modal';

import TimesCircleIcon from 'components/Icons/TimesCircle';

import style from './Modal.module.scss';

ReactModal.setAppElement('#root');

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactChild;
}

const Modal = ({
  isOpen,
  onRequestClose,
  children,
}: Props): React.ReactElement => {
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={style.modal}
      overlayClassName={style.backdrop}
      shouldCloseOnOverlayClick
    >
      <button className={style.closeButton} onClick={onRequestClose}>
        <TimesCircleIcon color="border" />
      </button>
      <div>{children}</div>
    </ReactModal>
  );
};

export default Modal;
