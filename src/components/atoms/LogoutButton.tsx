import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native-ui-lib';

interface Props {
  onPress: () => void;
}
const LogOutButton: FC<Props> = ({onPress = () => {}}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <IMAGES.icLogout color={Colors.error} />
        <View style={{width: scale(10)}} />
        <Text style={[{color: Colors.error}, CommonStyles.font.regular14]}>
          Logout
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(LogOutButton);
