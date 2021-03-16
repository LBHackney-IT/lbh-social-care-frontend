/* istanbul ignore file */

const colors = {
  default: '#fff',
  green: '#01674e',
  black: '#000',
};

interface Props {
  color?: keyof typeof colors;
}

const UpArrow = ({ color = 'default' }: Props): React.ReactElement => (
  <svg
    className="up-arrow-icon"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="284.929px"
    height="284.929px"
    viewBox="0 0 284.929 284.929"
  >
    <g>
      <path
        fill={colors[color]}
        d="M282.082,195.285L149.028,62.24c-1.901-1.903-4.088-2.856-6.562-2.856s-4.665,0.953-6.567,2.856L2.856,195.285
		C0.95,197.191,0,199.378,0,201.853c0,2.474,0.953,4.664,2.856,6.566l14.272,14.271c1.903,1.903,4.093,2.854,6.567,2.854
		c2.474,0,4.664-0.951,6.567-2.854l112.204-112.202l112.208,112.209c1.902,1.903,4.093,2.848,6.563,2.848
		c2.478,0,4.668-0.951,6.57-2.848l14.274-14.277c1.902-1.902,2.847-4.093,2.847-6.566
		C284.929,199.378,283.984,197.188,282.082,195.285z"
      />
    </g>
  </svg>
);

export default UpArrow;
