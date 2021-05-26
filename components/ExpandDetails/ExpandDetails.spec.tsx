import { render, fireEvent } from '@testing-library/react';

import ExpandDetails from './ExpandDetails';

describe(`ExpandDetails`, () => {
  const props = {
    label: 'Show intructions',
    triggerLabel: 'guidance',
    children: <p>I am the content!</p>,
  };

  it('should render properly', () => {
    const { asFragment } = render(<ExpandDetails {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should change the trigger label on hide', () => {
    const { getByText, queryByText } = render(
      <ExpandDetails isDefaultOpen {...props} />
    );
    expect(queryByText('Show guidance')).not.toBeInTheDocument();
    fireEvent.click(getByText('Hide guidance'));
    expect(queryByText('Show guidance')).toBeInTheDocument();
  });
});
