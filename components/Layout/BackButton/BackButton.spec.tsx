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
    const { getByRole } = render(<BackButton />);
    const button = getByRole('button');
    fireEvent.click(button);
    expect(Router.back).toHaveBeenCalled();
  });
});
