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

  it('should set overflow hidden on the body once open', () => {
    expect(document.documentElement.style.overflow).not.toBe('hidden');
    const { unmount } = render(<Modal {...props} />);
    expect(document.documentElement.style.overflow).toBe('hidden');
    unmount();
    expect(document.documentElement.style.overflow).not.toBe('hidden');
  });
});
