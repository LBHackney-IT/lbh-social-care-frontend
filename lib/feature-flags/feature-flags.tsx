import React from 'react';
import { useContext } from 'react';

const Context = React.createContext({});

export const FeatureFlagContext: React.FC<{
  features: {
    [featureName: string]: boolean;
  };
}> = ({ features, children }) => {
  return <Context.Provider value={features}>{children}</Context.Provider>;
};

export const ConditionalFeature = ({ name }: { name: string }) => {
  const features = useContext(Context);

  if (features[name] === undefined) {
    return null;
  }

  if (features[name] === false) {
    return null;
  }

  return <div data-testid="expectedElement">This should be visible!</div>;
};
