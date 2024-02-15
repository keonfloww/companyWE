import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {scale} from '@utils/mixins';
import CommonStyles from '@screens/styles';
import {Colors} from 'react-native-ui-lib';

const AddressInput = ({
  containerStyle,
  labelStyle,
  style,
  label = 'Address',
  onChange,
  value,
}: any) => {
  console.log('address', {value});
  return (
    <View style={[styles.container, containerStyle ? containerStyle : {}]}>
      <Text
        style={[
          CommonStyles.font.semiBold14,
          {color: Colors.text},
          styles.label,
          labelStyle ? labelStyle : {},
        ]}>
        {label}
      </Text>
      <TextInput
        style={[CommonStyles.font.regular14,styles.input, style]}
        value={value}
        onChangeText={onChange}
        placeholder="Enter Address"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 10,
    marginBottom: 20,
  },
  label: {},
  input: {
    borderWidth: 1,
    borderColor: '#8f8f8f',
    borderRadius: scale(100),
    color: Colors.border,
    // width: '70%',
    // flex: 1,
    height: scale(45),
    paddingHorizontal: scale(20),
    // paddingVertical: scale(10),
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
  },
});

export default AddressInput;
