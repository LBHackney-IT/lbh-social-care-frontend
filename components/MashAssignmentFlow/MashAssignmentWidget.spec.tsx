// user starts input text
// (search term state)
// onchange (search term state changes), results are fetched
// results are rendered

import { fireEvent, render, screen } from '@testing-library/react';
import { mockedMashReferral } from 'factories/mashReferral';
import MashAssignmentWidget from './MashAssignmentWidget';

// user selects appropriate results
// (selected id stored in state)
// user confirms
// (id sent to API)
// result is saved

it('should show results based on input', () => {
  //arrange
  //render the component
  render(
    <MashAssignmentWidget
      mashReferral={mockedMashReferral}
      assignWorkerToReferral={jest.fn()}
    />
  );
  //act
  //type in a search term
  fireEvent.click(screen.getByText('Assign'));
  fireEvent.change(screen.getByPlaceholderText("Type worker's name"), {
    target: { value: 'Sample Input' },
  });

  //assert
  //results that match input
  screen.getByText('Sample Input');
});
