import React, { useContext } from 'react';

export type ConditionalFeature = {
  name: string;
  condition: boolean;
};

const FeatureContext = React.createContext<{ features: ConditionalFeature[] }>({
  features: [],
});

export const FeatureProvider: React.FC<{ features: ConditionalFeature[] }> = ({
  children,
  features,
}) => {
  return (
    <FeatureContext.Provider value={{ features }}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatureFlags = (): {
  isFeatureActive: (featureName: string) => boolean;
} => {
  const { features } = useContext(FeatureContext);

  const isFeatureActive = (featureName: string) => {
    const feature = features.find(({ name }) => name === featureName);
    if (!feature) {
      return false;
    }

    return feature.condition || false;
  };

  return {
    isFeatureActive,
  };
};
