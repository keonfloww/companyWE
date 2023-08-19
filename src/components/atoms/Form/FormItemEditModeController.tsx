import IMAGES from '@assets/images/images';
import {ListItem, Text} from '@rneui/base';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {useEffect, useRef, useState} from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const FormItemEditModeController = ({
  name = '',
  label = '',
  control,
  style = {},
  errors = {},
  rules = {},
  value = '',
  editAble = true,
  isEditActive = false,
}: any) => {
  const ref = useRef(null);
  const [isEdit, setIsEdit] = useState(isEditActive);
  const [computedValue, setComputedValue] = useState(value);

  useEffect(() => {
    if (!isEdit || isEditActive) return;
    ref?.current?.focus();
  }, [isEdit]);
  return (
    <View style={[styles.container]}>
      <ListItem>
        <ListItem.Content>
          {/* View only value */}
          <TouchableOpacity
            onPress={() => setIsEdit(prev => !prev)}
            disabled={!editAble}
            activeOpacity={0.6}>
            <ListItem.Title>
              {editAble && (
                <View style={styles.titleActions}>
                  <FastImage
                    style={CommonStyles.icon.icon15}
                    source={isEdit ? IMAGES.icCircleOk : IMAGES.icEdit}
                  />
                </View>
              )}
              <Text style={styles.label}>{label}</Text>
            </ListItem.Title>
            <View style={CommonStyles.space.s5}></View>
          </TouchableOpacity>
          {!isEdit && (
            <View style={styles.labelValue}>
              <ListItem.Title>
                <Text numberOfLines={1}>{computedValue || value}</Text>
              </ListItem.Title>
            </View>
          )}

          {/* Form Item */}
          {editAble && (
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <>
                  <TextInput
                    ref={ref}
                    style={[
                      styles.input,
                      style,
                      errors?.[name] ? styles.error : {},
                      !isEdit ? styles.hidden : {},
                    ]}
                    onBlur={onBlur}
                    onChangeText={value => {
                      onChange(value);
                      setComputedValue(value);
                    }}
                    value={value}
                  />
                </>
              )}
              name={name}
              rules={rules}
            />
          )}
          {errors?.[name] && (
            <Text style={style.errorText}>{errors?.[name]?.message}</Text>
          )}
        </ListItem.Content>
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: scale(10),
  },
  label: {
    flex: 1,
    fontWeight: '500',
  },
  labelValue: {
    marginTop: scale(5),
    minHeight: scale(30),
  },
  input: {
    fontSize: scale(15),
    borderRadius: scale(10),
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
  },
  hidden: {display: 'none'},
  titleActions: {
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingRight: scale(15),
    width: scale(30),
  },
});

// todo: React.memo
export default FormItemEditModeController;
