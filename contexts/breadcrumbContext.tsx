import React, { useContext, createContext } from 'react';

interface ContextType {
  goBackUrl: string | false;
}

const BreadcrumbContext = createContext<ContextType>({
  goBackUrl: false,
});

export const BreadcrumbProvider = ({
  children,
}: {
  children: React.ReactChild;
}): React.ReactElement => {
  //   const [goBackUrl, setGoBackUrl] = useState<string | false>(false);

  let goBackUrl;

  return (
    <BreadcrumbContext.Provider value={{ goBackUrl }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = (goBackUrl: string): ContextType =>
  useContext(BreadcrumbContext);

export default BreadcrumbContext;
