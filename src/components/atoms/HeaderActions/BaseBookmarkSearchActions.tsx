import IMAGES from '@assets/images/images';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';

interface Props {
  onPressBookMark: () => void;
  onPressSearch: () => void;
  color?: string;
}

const BaseBookmarkSearchActions: FC<Props> = ({
  onPressBookMark,
  onPressSearch,
  color = null,
}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={onPressBookMark} activeOpacity={0.7}>
        <IMAGES.icBookMark color={color ?? '#3C3C3C'} />
      </TouchableOpacity>
      <View style={{width: scale(7)}} />
      <TouchableOpacity onPress={onPressSearch} activeOpacity={0.7}>
        <IMAGES.icSearch color={color ?? '#3C3C3C'} />
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(BaseBookmarkSearchActions);
