import Button from 'components/Form/Button/Button';
import Textarea from '../../../../../components/Form/TextArea/TextArea';

const DeleteWorker = () => {
  return (
    <div>
      <h1 className="govuk-heading-l">Reason for worker deallocation</h1>
      <p className="govuk-body govuk-!-font-weight-bold">Case:</p>
      <h2>Deallocation details</h2>
      <ul className="govuk-list">
        <li className="govuk-!-font-weight-bold">Worker deallocated:</li>
        <li className="govuk-!-font-weight-bold">Deallocated by:</li>
        <li className="govuk-!-font-weight-bold">Deallocation date: </li>
      </ul>
      <p className="govuk-body govuk-!-font-weight-bold">Allocated Status:</p>
      <h2>What is the reason for this worker to be deallocated?</h2>
      <Textarea />
      <Button label="Save deallocation" />
    </div>
  );
};

export default DeleteWorker;
