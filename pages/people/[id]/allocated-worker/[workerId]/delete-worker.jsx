import Button from 'components/Form/Button/Button';
import Textarea from '../../../../../components/Form/TextArea/TextArea';

const DeleteWorker = () => {
  return (
    <div>
      <h1>Reason for worker deallocation</h1>
      <p>Placeholder case name</p>
      <h2>Deallocation details</h2>
      <ul>
        <li>Worker deallocated:</li>
        <li>Deallocated by:</li>
        <li>Deallocation date: </li>
      </ul>
      <p>Allocated Status</p>
      <h2>What is the reason for this worker to be deallocated?</h2>
      <Textarea />
      <Button label="Save deallocation" />
    </div>
  );
};

export default DeleteWorker;
