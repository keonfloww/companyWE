import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {scale} from '@utils/mixins';
import CommonStyles from '@screens/styles';

const DatePicker = ({
  value,
  mode,
  setDatePicker,
  visible,
  onChange,
  containerStyle,
  label,
  labelStyle
}: any) => {
  return (
    <Pressable
      onPress={() => setDatePicker(true)}
      style={[styles.container, containerStyle ? containerStyle : {}]}>
      <Text style={[CommonStyles.font.semiBold14,styles.label, labelStyle ? labelStyle : {}]} onPress={() => setDatePicker(true)}>{label}</Text>
      <View style={styles.input}><Text>{value.toString()}</Text></View>
      {visible && (
        <DateTimePicker
          value={value}
          mode={mode}
          onChange={(event: DateTimePickerEvent, date: Date) => {
            const {
              type,
              nativeEvent: {timestamp, utcOffset},
            } = event;
            console.log(type);
            // if(type === 'dismissed') {
            setDatePicker(false);
            // }
          }}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: scale(10),
    marginBottom: scale(20),
  },
  label: {},
  input: {
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: '#8f8f8f',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(100),
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
  },
});

export default DatePicker;
