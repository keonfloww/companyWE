import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const FormItemController = ({
  name = '',
  label = '',
  control,
  style = {},
  errors = {},
  rules = {},
  containerStyle = {},
  labelStyle = {},
  textContentType = 'emailAddress',
}: any) => {
  return (
    <View style={[styles.container, containerStyle ? containerStyle : {}]}>
      <Text style={[styles.label, labelStyle ? labelStyle : {}]}>{label}</Text>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <>
            <TextInput
              style={[styles.input, style, errors?.[name] ? styles.error : {}]}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
              textContentType={textContentType}
            />
          </>
        )}
        name={name}
        rules={rules}
      />
      {errors?.[name] && (
        <Text style={style.errorText}>{errors?.[name]?.message}</Text>
      )}
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
    borderRadius: 10,
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
  },
});

// todo: React.memo
export default FormItemController;
