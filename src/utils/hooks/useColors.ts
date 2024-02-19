import {Colors} from 'react-native-ui-lib';

Colors.loadColors({
  primary: '#50048A',
  textSecondary: '#3C3C3C',
  buttonSecondary: '#606060',
  border: '#8F8F8F',
  borderAvatar: '#DADADA',
  accentColor: '#DFB5FF',

  error: '#E74C3C',
  success: '#20C997',
  waring: '#FFA145',

  text: '#3C3C3C',
  textDisable: '#757575',
});

const useColors = <T>(styles: T): T => {
  return styles;
};

export default useColors;
