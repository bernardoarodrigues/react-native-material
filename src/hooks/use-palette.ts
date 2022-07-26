import { useTheme } from '../base/ThemeContext';

export const usePalette = () => {
  return useTheme().palette;
};
