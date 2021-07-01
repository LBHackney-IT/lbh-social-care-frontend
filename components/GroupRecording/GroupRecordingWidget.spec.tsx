import GroupRecordingWidget from './GroupRecordingWidget';
import { render, screen } from '@testing-library/react';
import { mockedResident } from 'factories/residents';

// TODO: once the group recording widget is production ready, write its tests

describe('GroupRecordingWidget', () => {
  it('shows one person initially', () => {
    render(<GroupRecordingWidget initialPeople={[mockedResident]} />);
    expect(screen.getByText('Bart Simpson'));
    expect(screen.getByText('Link another person'));
  });
  //   testing around the API call
  //   test works with both a legacy or a mocked resident
  //   it("allows people to be added and removed", () => {})
  //   it("allows widgets to be expanded and collapsed when there are more than one", () => {})
});
