import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {CUSTOM_HEADER_HEIGHT, scale} from '@utils/mixins';
import React, {FC, useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

interface Props {
  onSubmitSearch: (_: string) => void;
  darkTheme: boolean;
}
const HeaderSearchInput: FC<Props> = ({
  onSubmitSearch = _ => {},
  darkTheme = false,
}) => {
  const {reset, control, watch, setValue} = useForm<{content: string}>();

  const handler = useCallback(
    _.debounce(value => {
      onSubmitSearch(value);
      setValue('content', value);
    }, 2000),
    [onSubmitSearch, setValue],
  );

  return (
    <View
      style={{
        backgroundColor: darkTheme ? '#50048A' : 'white',
        borderRadius: 99,
        flex: 1,
        height: CUSTOM_HEADER_HEIGHT - scale(5),
        alignItems: 'center',
        borderColor: darkTheme ? 'white' : '#8F8F8F',
        borderWidth: scale(1),
        flexDirection: 'row',
        paddingLeft: scale(5),
        marginRight: scale(5),
      }}>
      <IMAGES.icSearch color={darkTheme ? 'white' : '#8F8F8F'} />
      <Controller
        control={control}
        render={({field: {value, onChange}}) => (
          <TextInput
            onChangeText={onChange}
            returnKeyType={'search'}
            autoFocus={true}
            multiline={false}
            onSubmitEditing={(
              event: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
            ) => {
              onSubmitSearch((event.nativeEvent?.text ?? '').trim());
            }}
            blurOnSubmit={true}
            placeholderTextColor={darkTheme ? 'white' : '8F8F8F'}
            style={{
              flex: 1,
              color: darkTheme ? 'white' : '8F8F8F',
              height: '100%',
              marginLeft: scale(5),
              marginRight: scale(25),
            }}
            placeholder="Search Inbox"
            value={value}
          />
        )}
        name="content"
      />

      {!!watch('content') && (
        <TouchableOpacity
          onPress={() => {
            reset();
          }}>
          <View style={{paddingRight: scale(15)}}>
            <IMAGES.icClose
              color={darkTheme ? 'white' : '#8F8F8F'}
              {...CommonStyles.icon.icon16}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(HeaderSearchInput);
