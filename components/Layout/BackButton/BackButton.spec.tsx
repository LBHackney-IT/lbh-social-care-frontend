import { render, fireEvent } from '@testing-library/react';

import Router from 'next/router';

import BackButton from './BackButton';

jest.mock('next/router', () => ({
  back: jest.fn(),
}));

describe('BackButton', () => {
  it('should render properly', async () => {
    const { asFragment } = render(<BackButton />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should trigger history back on click', () => {
    const { getByText } = render(<BackButton />);
    const button = getByText('Go back');
    fireEvent.click(button);
    expect(Router.back).toHaveBeenCalled();
  });
});
