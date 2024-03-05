import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {CUSTOM_HEADER_HEIGHT, scale} from '@utils/mixins';
import _ from 'lodash';
import React, {forwardRef, useCallback, useImperativeHandle} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  onSubmitSearch: (_: string, shouldSaveHistory?: boolean) => void;
  onClearSearch: () => void;
  darkTheme: boolean;
}
export interface ImperativeHeaderSearchInput {
  setValueFromQuickSearch: (_: string) => void;
}
const HeaderSearchInput = forwardRef<ImperativeHeaderSearchInput, Props>(
  ({onSubmitSearch = _ => {}, onClearSearch, darkTheme = false}, ref) => {
    const {reset, control, watch, setValue} = useForm<{content: string}>();

    useImperativeHandle(
      ref,
      () => {
        return {
          setValueFromQuickSearch: (_: string) => setValue('content', _),
        };
      },
      [],
    );
    const handler = useCallback(
      _.debounce(value => {
        onSubmitSearch(value, false);
      }, 2000),
      [],
    );

    const onChange = (value: string) => {
      setValue('content', value);
      handler(value);
    };

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
          render={({field: {value}}) => (
            <TextInput
              onChangeText={value => onChange(value)}
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
              onClearSearch();
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
  },
);

export default React.memo(HeaderSearchInput);
