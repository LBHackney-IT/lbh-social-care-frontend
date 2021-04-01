import { render, fireEvent, waitFor } from '@testing-library/react';

import ExpandDetails from './ExpandDetails';

describe(`ExpandDetails`, () => {
  const props = {
    label: 'Show intructions',
    children: <p>I am the content!</p>,
  };

  it('should render properly', () => {
    const { asFragment } = render(<ExpandDetails {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should expand and collapse properly', async () => {
    const { getByText, getByRole, queryByText } = render(
      <ExpandDetails {...props} />
    );
    expect(queryByText('I am the content!')).not.toBeInTheDocument();
    fireEvent.click(getByRole('button'));
    expect(queryByText('I am the content!')).toBeInTheDocument();
  });
});
