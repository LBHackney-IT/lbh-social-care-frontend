jest.mock('components/Icons/TimesCircle', () => () => 'MockedCloseButton');

const MockModal = ({ isOpen, children }) =>
  isOpen ? <div className="modal">{children}</div> : null;

MockModal.setAppElement = jest.fn();

export default MockModal;
