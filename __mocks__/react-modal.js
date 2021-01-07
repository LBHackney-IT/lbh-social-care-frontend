const MockModal = ({ children }) => <div className="modal">{children}</div>;

MockModal.setAppElement = jest.fn();

export default MockModal;
