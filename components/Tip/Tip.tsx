import React from 'react';
import Tippy from '@tippyjs/react';

interface Props {
  delay?: number;
  interactive?: boolean;
  content: React.ReactChild;
  children: React.ReactElement; // ReactChild into ReactElement to get line 26 working
}

const Tip = ({
  delay = 300,
  interactive = false,
  children,
  content,
  ...props
}: Props): React.ReactElement => {
  return (
    <Tippy delay={delay} content={content} interactive={interactive} {...props}>
      {children}
    </Tippy>
  );
};

export default Tip;
