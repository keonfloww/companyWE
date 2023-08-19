import IMAGES from '@assets/images/images';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {Pressable, View} from 'react-native';

interface Props {
  onPressBookMark: () => void;
  onPressSearch: () => void;
}

const BaseBookmarkSearchActions: FC<Props> = ({
  onPressBookMark,
  onPressSearch,
}) => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
      <Pressable onPress={onPressBookMark}>
        <IMAGES.icBookMark />
      </Pressable>
      <View style={{width: scale(7)}} />
      <Pressable onPress={onPressSearch}>
        <IMAGES.icSearch />
      </Pressable>
    </View>
  );
};

export default React.memo(BaseBookmarkSearchActions);
