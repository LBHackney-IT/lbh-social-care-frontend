import s from './NumberedSteps.module.scss';

interface Props {
  nodes: React.ReactElement[];
}

const NumberedSteps = ({ nodes }: Props): React.ReactElement => (
  <ol className={s.steps}>
    {nodes.map((node, i) => (
      <li key={i} className={s.steps__event}>
        {node}
      </li>
    ))}
  </ol>
);

export default NumberedSteps;
