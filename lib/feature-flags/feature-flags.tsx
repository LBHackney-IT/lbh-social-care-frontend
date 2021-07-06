import React from 'react';
import { useContext } from 'react';

export type FeatureSet = {
  [featureName: string]: {
    isActive: boolean;
  };
};

const FeatureFlagContext = React.createContext<FeatureSet | undefined>(
  undefined
);

export const FeatureFlagProvider: React.FC<{
  features: FeatureSet;
}> = ({ features, children }) => {
  return (
    <FeatureFlagContext.Provider value={features}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const ConditionalFeature: React.FC<{ name: string }> = ({
  name,
  children,
}) => {
  const features = useContext(FeatureFlagContext);

  if (features === undefined) {
    throw new Error(
      'A <FeatureFlagProvider /> must be provided as a parent of this component'
    );
  }

  if (features[name] === undefined) {
    return null;
  }

  if (features[name].isActive === false) {
    return null;
  }

  return <>{children}</>;
};
