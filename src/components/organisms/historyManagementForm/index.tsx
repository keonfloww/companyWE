import React, {useState} from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Control} from 'react-hook-form';
import CustomController from 'src/components/molecules/customController';
import IMAGES from '@assets/images/images';
import DropDownApp from '@components/molecules/dropDown';
import DatePicker from 'react-native-date-picker';

interface FormInputProps {
  control: Control<any>;

  errors: any;
}

const HistoryManagementForm: React.FC<FormInputProps> = props => {
  const {control, errors} = props;
  const [openProvince, setOpenProvince] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const [itemsProvince, setItemsProvince] = useState<any>([
    {label: 'Nam', value: 'male'},
    {label: 'Nữ', value: 'female'},
    {label: 'Khác', value: 'other'},
  ]);

  const handleOpenProvince = () => {
    setOpenProvince(!openProvince);
  };
  return (
    <View style={styles.viewForm}>
      <View style={styles.headerContainer}>
        <Text style={styles.labelText}>점검 이력관리 상세</Text>
        <Image source={IMAGES.icCarbonMap} />
      </View>
      <View style={styles.dateContainer}>
        <CustomController
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <View>
                <Text style={styles.labelText}>점검일자</Text>
                <TouchableOpacity
                  style={styles.datePicker}
                  onPress={() => setOpen(true)}>
                  <Text style={styles.dateText}>
                    {date.toLocaleDateString()}
                  </Text>
                  <Image source={IMAGES.icCalendar} style={{marginRight: 12}} />
                  <DatePicker
                    modal
                    open={open}
                    date={date}
                    mode="date"
                    style={{width: 0}}
                    onConfirm={date => {
                      setOpen(false);
                      setDate(date);
                      onChange(date);
                    }}
                    onCancel={() => {
                      setOpen(false);
                    }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
          name={'date'}
          error={errors.phone}
        />
        <CustomController
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <View>
                <Text style={styles.labelText}>종합 점검 결과</Text>
                <DropDownApp
                  dropDownContainerStyle={styles.dropdownContainer}
                  style={styles.dropdown}
                  open={openProvince}
                  value={value}
                  items={itemsProvince}
                  onValueChange={onChange}
                  setItems={setItemsProvince}
                  placeholder={'적합'}
                  onOpen={handleOpenProvince}
                />
              </View>
            );
          }}
          name={'comprehensive'}
          error={errors.phone}
        />
      </View>
    </View>
  );
};

export default HistoryManagementForm;
