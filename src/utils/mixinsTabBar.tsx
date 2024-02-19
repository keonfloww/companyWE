import IMAGES from '@assets/images/images';
import navigationService from '@services/navigationService';
import {TouchableOpacity} from 'react-native';
import {scale} from './mixins';
import CommonStyles from '@screens/styles';

const headerBackDefault = (props: any) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={navigationService.goBack}>
      <IMAGES.icBack
        {...props}
        {...CommonStyles.icon.icon24}
        style={{marginLeft: scale(5)}}
      />
    </TouchableOpacity>
  );
};

const MixinsTabBar = {headerBackDefault};
export default MixinsTabBar;
