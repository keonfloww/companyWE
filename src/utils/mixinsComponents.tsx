import {useTheme} from '@rneui/themed';
import React from 'react';

export const withTheme = (styles: (props: any) => any) => {
  const theme = useTheme();
  const newStyles = React.useMemo(() => styles(theme), [theme]);

  return newStyles;
};
