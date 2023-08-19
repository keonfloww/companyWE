import {useTheme} from '@rneui/themed';
import {useMemo} from 'react';

const useStyles = (stylesCallback: ({colors}: any) => any) => {
  const {theme} = useTheme();

  const newStyles = useMemo(
    () => stylesCallback({colors: theme.colors}),
    [theme.colors],
  );
  return newStyles;
};

export default useStyles;
