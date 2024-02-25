import IMAGES from '@assets/images/images';
import {CUSTOM_HEADER_HEIGHT, scale} from '@utils/mixins';
import React, {FC} from 'react';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';

interface Props {
  onSubmitSearch: (_: string) => void;
}
const HeaderSearchInput: FC<Props> = ({onSubmitSearch = _ => {}}) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 99,
        flex: 1,
        height: CUSTOM_HEADER_HEIGHT - scale(5),
        alignItems: 'center',
        borderColor: '#8F8F8F',
        borderWidth: scale(1),
        flexDirection: 'row',
        paddingLeft: scale(5),
        marginRight: scale(5),
      }}>
      <IMAGES.icSearch color={'#8F8F8F'} />
      <TextInput
        returnKeyType={'search'}
        autoFocus={true}
        // autoCorrect={true}
        // showSoftInputOnFocus={true}
        multiline={false}
        onSubmitEditing={(
          event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
        ) => {
          onSubmitSearch((event.nativeEvent?.text ?? '').trim());
        }}
        blurOnSubmit={true}
        style={{
          height: '100%',
          marginLeft: scale(5),
          marginRight: scale(25),
        }}
        placeholder="Search Troove"
      />
    </View>
  );
};

export default React.memo(HeaderSearchInput);
