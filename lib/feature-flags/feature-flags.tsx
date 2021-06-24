import React from 'react';
import { useContext } from 'react';

const Context =
  React.createContext<
    | {
        [featureName: string]: boolean;
      }
    | undefined
  >(undefined);

export const FeatureFlagProvider: React.FC<{
  features: {
    [featureName: string]: boolean;
  };
}> = ({ features, children }) => {
  return <Context.Provider value={features}>{children}</Context.Provider>;
};

export const ConditionalFeature: React.FC<{ name: string }> = ({
  name,
  children,
}) => {
  const features = useContext(Context);

  if (features === undefined) {
    throw new Error(
      'A <FeatureFlagProvider /> must be provided as a parent of this component'
    );
  }

  if (features[name] === undefined) {
    return null;
  }

  if (features[name] === false) {
    return null;
  }

  return <>{children}</>;
};
