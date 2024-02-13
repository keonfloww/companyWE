import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {scale} from '@utils/mixins';
import CommonStyles from '@screens/styles';
import moment from 'moment';

const DatePicker = ({
  value,
  mode,
  setDatePicker,
  visible,
  onChange,
  containerStyle,
  label,
  labelStyle,
  setDate,
  date,
}: any) => {
  return (
    <Pressable
      onPress={() => setDatePicker(true)}
      style={[styles.container, containerStyle ? containerStyle : {}]}>
      <Text
        style={[
          CommonStyles.font.semiBold14,
          styles.label,
          labelStyle ? labelStyle : {},
        ]}
        onPress={() => setDatePicker(true)}>
        {label}
      </Text>
      <View style={styles.input}>
        <Text>
          {moment(value).isValid()
            ? moment(value).format('DD/MM/YYYY').toString()
            : 'Select Birthday'}
        </Text>
      </View>
      {visible && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode={mode}
          onChange={(event: DateTimePickerEvent, date: Date) => {
            const {
              type,
              nativeEvent: {timestamp, utcOffset},
            } = event;
            if (type === 'dismissed') {
              setDatePicker(false);
            } else if (type === 'set') {
              setDate(date.toString());
            }
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
