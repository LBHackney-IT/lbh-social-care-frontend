const Spinner = () => (
  <svg
    width="50"
    height="50"
    viewBox="0 0 42 42"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#00703c"
  >
    <g fill="none" fillRule="evenodd">
      <g transform="translate(3 3)" strokeWidth="5">
        <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(112.708 18 18)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="1s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
);

export default Spinner;
