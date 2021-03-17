import { createRef, RefObject } from 'react';

const useResizeObserverMocked = (): { ref: RefObject<HTMLDivElement> } => {
  return { ref: createRef<HTMLDivElement>() };
};

export default useResizeObserverMocked;
