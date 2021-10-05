import ReviewAddCaseStatusForm from './ReviewAddCaseStatusForm';
import { render } from '@testing-library/react';
import { residentFactory } from 'factories/residents';

const mockedResident = residentFactory.build();

describe('ReviewAddRelationshipForm', () => {
  describe('CIN case status review page', () => {
    it('displays the form name', () => {
      const { getByText } = render(
        <ReviewAddCaseStatusForm
          title="Review case status details"
          personId={mockedResident.id}
          formAnswers={{
            type: 'CIN',
            startDate: '2020-12-01',
            notes: 'blabla',
          }}
        />
      );

      expect(getByText('Review case status details')).toBeInTheDocument();
      expect(
        getByText('Do you want to add this case status?')
      ).toBeInTheDocument();
    });

    it('displays type, date and notes', () => {
      const { getByText } = render(
        <ReviewAddCaseStatusForm
          title="Review case status details"
          personId={mockedResident.id}
          formAnswers={{
            type: 'CIN',
            startDate: '2020-12-01',
            notes: 'blabla',
          }}
        />
      );

      expect(getByText('Child in need')).toBeInTheDocument();
      expect(getByText('blabla')).toBeInTheDocument();
      expect(getByText('01 Dec 2020')).toBeInTheDocument();
    });
  });

  describe('CP case status review page', () => {
    it('displays type and date when CP is selected', () => {
      const { getByText } = render(
        <ReviewAddCaseStatusForm
          title="Review case status details"
          personId={mockedResident.id}
          formAnswers={{
            type: 'CP',
            startDate: '2020-12-01',
            category: 'C1',
          }}
        />
      );

      expect(getByText('Child protection')).toBeInTheDocument();
      expect(getByText('01 Dec 2020')).toBeInTheDocument();
    });

    it('displays selected category when CP is selected', () => {
      const { getByText } = render(
        <ReviewAddCaseStatusForm
          title="Review case status details"
          personId={mockedResident.id}
          formAnswers={{
            type: 'CP',
            startDate: '2020-12-01',
            category: 'C1',
          }}
        />
      );

      expect(getByText('Neglect')).toBeInTheDocument();
      expect(getByText('01 Dec 2020')).toBeInTheDocument();
    });
  });

  describe('LAC case status review page', () => {
    it('displays LAC legal status and placement type when an LAC status is being reviewed', () => {
      const { getByText } = render(
        <ReviewAddCaseStatusForm
          title="Review case status details"
          personId={mockedResident.id}
          formAnswers={{
            type: 'LAC',
            startDate: '2021-01-01',
            legalStatus: 'C2',
            placementType: 'K1',
          }}
        />
      );

      expect(getByText('C2: Full care order')).toBeInTheDocument();
      expect(getByText("K1: Secure children's homes")).toBeInTheDocument();
      expect(getByText('01 Jan 2021')).toBeInTheDocument();
    });

    it('Does not display LAC legal status and placement type when LAC status has not been selected', () => {
      const { getByText, queryByText } = render(
        <ReviewAddCaseStatusForm
          title="Review case status details"
          personId={mockedResident.id}
          formAnswers={{
            type: 'CIN',
            startDate: '2021-01-01',
            legalStatus: 'C2',
            placementType: 'K1',
          }}
        />
      );

      expect(queryByText('C2: Full care order')).not.toBeInTheDocument();
      expect(
        queryByText("K1: Secure children's homes")
      ).not.toBeInTheDocument();
      expect(getByText('01 Jan 2021')).toBeInTheDocument();
    });
  });
});
