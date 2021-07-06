import { render, fireEvent } from '@testing-library/react';

import BackButton from './BackButton';

const mockHandler = jest.fn();
global.history.back = mockHandler;

describe('BackButton', () => {
  it('should render properly', async () => {
    const { asFragment } = render(<BackButton />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should trigger history back on click', () => {
    const { getByText } = render(<BackButton />);
    const button = getByText('Go back');
    fireEvent.click(button);
    expect(history.back).toHaveBeenCalled();
  });
});
