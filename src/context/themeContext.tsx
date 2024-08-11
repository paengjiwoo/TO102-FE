import { createContext, ReactNode, useState } from "react";

const DEFAULT_THEME_NAME = "light";

interface State {
  themeName: string;
}

export const ThemeContext = createContext<State>({
  themeName: DEFAULT_THEME_NAME,
});

export const ToHundredThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName] = useState<string>(DEFAULT_THEME_NAME);

  return (
    <ThemeContext.Provider value={{ themeName }}>
      {children}
    </ThemeContext.Provider>
  );
};
