import PropTypes from 'prop-types';

jest.mock('components/Icons/TimesCircle', () => () => 'MockedCloseButton');

const MockModal = ({ isOpen, children }) =>
  isOpen ? <div className="modal">{children}</div> : null;

MockModal.setAppElement = jest.fn();

MockModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default MockModal;
