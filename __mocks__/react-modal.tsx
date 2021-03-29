import React from 'react';

jest.mock('components/Icons/TimesCircle', () => () => 'MockedCloseButton');

interface Props {
  isOpen?: boolean;
  children: React.ReactChild;
}

const MockModal = ({ isOpen, children }: Props): React.ReactElement | null =>
  isOpen ? <div className="modal">{children}</div> : null;

MockModal.setAppElement = jest.fn();

export default MockModal;
