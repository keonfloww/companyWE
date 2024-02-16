import {View, Text, Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import {scale} from '@utils/mixins';
import CommonStyles from '@screens/styles';
import moment from 'moment';
import DateUtils from '@utils/dateUtils';
import {Colors} from 'react-native-ui-lib';
import IMAGES from '@assets/images/images';
import DateTimePicker from 'react-native-ui-datepicker';

const DatePickerModal = ({
  value,
  setDatePicker,
  visible,
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
          {color: Colors.text},
          styles.label,
          labelStyle ? labelStyle : {},
        ]}>
        {label}
      </Text>
      <View style={styles.input}>
        <Text
          style={[CommonStyles.font.regular14, {color: Colors.border}]}
          onPress={() => setDatePicker(true)}>
          {value ? value.toString() : 'Select Birthday'}
        </Text>
        <IMAGES.dateIcon />
      </View>
      <Modal
        isVisible={visible}
        onBackdropPress={() => setDatePicker(false)}
        style={{
          backgroundColor: 'transparent',
          height: 400,
          padding: scale(5),
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            height: 'auto',
            borderRadius: scale(10),
            padding: scale(5),
          }}>
          <DateTimePicker
            headerTextStyle={{
              ...CommonStyles.font.bold16,
              color: Colors.primary,
            }}
            calendarTextStyle={{
              ...CommonStyles.font.semiBold14,
              color: Colors.border,
            }}
            headerButtonColor={Colors.primary}
            weekDaysTextStyle={{
              ...CommonStyles.font.semiBold14,
              color: Colors.primary,
            }}
            mode="single"
            date={value? moment(value, "MM/DD/YYYY").toDate() : new Date()}
            onChange={params => {
              setDatePicker(false);
              setDate(moment(params?.date?.toString()).format(DateUtils.UPDATE_FORMAT));
            }}
          />
        </View>
      </Modal>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8f8f8f',
    paddingHorizontal: scale(20),
    paddingVertical: scale(10),
    borderRadius: scale(100),
    height: scale(45),
  },
  error: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
  },
});

export default DatePickerModal;
