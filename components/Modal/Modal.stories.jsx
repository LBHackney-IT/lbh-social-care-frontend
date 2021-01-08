import { useState } from 'react';

import Modal from './Modal';

export default {
  title: 'Modal',
  component: Modal,
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Show the Modal</button>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)}>
        I am the content of the Modal
      </Modal>
    </>
  );
};
