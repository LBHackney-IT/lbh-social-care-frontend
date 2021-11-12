import { render, screen } from '@testing-library/react';
import MainCard from './MainCard';
import { mockedMashReferrals } from 'factories/mashReferral';

describe('MainCard', () => {
  it('renders contact component correctly', () => {
    render(<MainCard filter="contact" mashReferrals={mockedMashReferrals} />);
    expect(screen.getByTestId('ContactCard'));
  });
});
it('renders initial decision component correctly', () => {
  render(
    <MainCard filter="initial-decision" mashReferrals={mockedMashReferrals} />
  );
  expect(screen.getByTestId('InitialDecisionCard'));
});
it('renders screening decision component correctly', () => {
  render(
    <MainCard filter="screening-decision" mashReferrals={mockedMashReferrals} />
  );
  expect(screen.getByTestId('ScreeningCard'));
});

it('renders final decision component correctly', () => {
  render(
    <MainCard filter="final-decision" mashReferrals={mockedMashReferrals} />
  );
  expect(screen.getByTestId('FinalDecisionCard'));
});
