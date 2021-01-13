import { render, fireEvent } from '@testing-library/react';

import Modal from './Modal';

describe(`Modal`, () => {
  const props = {
    onRequestClose: jest.fn(),
    isOpen: true,
    children: <p>I am the content!</p>,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const { asFragment } = render(<Modal {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should trigger onRequestClose', () => {
    const { getByRole } = render(<Modal {...props} />);
    fireEvent.click(getByRole('button'));
    expect(props.onRequestClose).toHaveBeenCalled();
  });
});
