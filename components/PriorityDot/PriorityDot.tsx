export interface Props {
  colour: string;
}

const PriorityDot = ({ colour }: Props): React.ReactElement => {
  const style = {
    height: '12px',
    width: '12px',
    display: 'inline-block',
    backgroundColor: '#bbb',
    borderRadius: '50%',
  };

  style.backgroundColor = colour;

  return <span style={style}></span>;
};

export default PriorityDot;
