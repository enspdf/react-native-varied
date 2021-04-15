import React, {useState, createContext} from 'react';

interface ImageColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImageColors;
  previousColors: ImageColors;
  setMainColors: (colors: ImageColors) => void;
  setPreviousMainColors: (colors: ImageColors) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({children}: {children: React.ReactNode}) => {
  const [colors, setColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });
  const [previousColors, setPreviousColors] = useState<ImageColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });
  const setMainColors = (colors: ImageColors) => {
    setColors(colors);
  };
  const setPreviousMainColors = (colors: ImageColors) => {
    setPreviousColors(colors);
  };

  return (
    <GradientContext.Provider
      value={{colors, previousColors, setMainColors, setPreviousMainColors}}>
      {children}
    </GradientContext.Provider>
  );
};
