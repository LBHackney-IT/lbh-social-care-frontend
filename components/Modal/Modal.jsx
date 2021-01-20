import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import TimesCircleIcon from 'components/Icons/TimesCircle';

import style from './Modal.module.scss';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose, children }) => {
  useEffect(() => {
    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    return () => (document.documentElement.style.overflow = '');
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

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default Modal;
