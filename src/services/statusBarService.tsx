import {useIsFocused} from '@react-navigation/native';
import {Platform} from 'react-native';
import {StatusBar, StatusBarProps} from 'react-native';

const FocusAwareStatusBar = (props: StatusBarProps) => {
  const isFocused = useIsFocused();

  return isFocused && Platform.OS == 'android' ? (
    <StatusBar {...props} />
  ) : null;
};

export default FocusAwareStatusBar;
