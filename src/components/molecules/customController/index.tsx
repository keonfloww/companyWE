import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';
import {Text, View} from 'react-native';

import styles from './styles';

type CustomControllerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  render: (props: {field: {onChange: any; value: any}}) => React.ReactElement;
  name: Path<TFieldValues>;
  error?: FieldError;
  label?: string;
};

const CustomController = <TFieldValues extends FieldValues>({
  control,
  render,
  name,
  error,
  label,
}: CustomControllerProps<TFieldValues>) => {
  return (
    <View style={styles.textInputContainer}>
      {label && (
        <View style={styles.label}>
          <Text style={{...styles.labelText}}>{label}</Text>
        </View>
      )}
      <Controller
        control={control}
        render={({field}) => render({field})}
        name={name}
      />
      {error && <Text style={styles.textError}>{error.message}</Text>}
    </View>
  );
};

export default CustomController;
