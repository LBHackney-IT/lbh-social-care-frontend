import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import style from './Modal.module.scss';

ReactModal.setAppElement('#root');

const Modal = ({ isOpen, onRequestClose, children }) => (
  <ReactModal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    className={style.modal}
    overlayClassName={style.backdrop}
    shouldCloseOnOverlayClick
  >
    <button className={style.closeButton} onClick={onRequestClose}>
      X
    </button>
    <div>{children}</div>
  </ReactModal>
);

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onRequestClose: PropTypes.func.isRequired,
};

export default Modal;
