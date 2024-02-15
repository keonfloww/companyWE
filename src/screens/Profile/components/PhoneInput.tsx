import {StyleSheet, View, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, Text} from 'react-native-ui-lib';
import {scale} from '@utils/mixins';
import CountryPicker from 'react-native-country-picker-modal';
import CommonStyles from '@screens/styles';

const PhoneInput = ({value, onChange}: any) => {
  const [countryVisible, setCountryVisible] = useState(false);
  const regex = /^\d+$/;
  {console.log('isko dekh rha hi ',value, value.toString().split('-')[0])}
  const onCountryChange = (val: any) => {
    onChange(`${val.cca2}-${value.split('-')[1]}`);
  };
  useEffect(() => {
    const va =
      value === '' || value === null ? 'IN' : value.toString().split('-')[0];
    console.log(value === '' || value === null, {va});
  });
  const onPhoneChange = (val: any) => {
    onChange(`${value.split('-')[0] || 'IN'}-${val}`);
  };

  return (
    <View style={{marginBottom: scale(20)}}>
      <Text
        style={[
          CommonStyles.font.semiBold14,
          {marginBottom: scale(10), color: Colors.text},
        ]}>
        Phone Number
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          //   rowGap: scale(10),
        }}>
        <CountryPicker
          containerButtonStyle={{
            // backgroundColor: 'red',
            borderWidth: 1,
            borderColor: '#8f8f8f',
            borderRadius: scale(100),
            paddingHorizontal: scale(20),
            // paddingVertical: scale(0),
            alignContent: 'center',
            justifyContent: 'center',
            marginRight: scale(10),
            height: scale(45),
          }}
          countryCode={
            value === '' || value === null
              ? 'IN'
              : value.toString().split('-')[0]
          }
          visible={countryVisible}
          onClose={() => setCountryVisible(false)}
          onSelect={val => onCountryChange(val)}
        />

        <TextInput
          style={[CommonStyles.font.regular14,{
            borderWidth: 1,
            borderColor: '#8f8f8f',
            borderRadius: scale(100),
            height: scale(45),
            color: Colors.border,
            // width: '70%',
            flex: 1,
            paddingHorizontal: scale(20),
            paddingVertical: scale(10),
          }]}
          keyboardType="number-pad"
          value={
            value === '' || value === null ? '' : value.toString().split('-')[1]
          }
          onChangeText={(val: any) => {
            if(regex.test(val) || val===''){
              onPhoneChange(val)
            }
          }}
          placeholder="phone"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dd_item_style: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  dd_item_textstyle: {
    marginVertical: scale(10),
    marginHorizontal: scale(20),
    paddingRight: scale(50),
    paddingLeft: 0,
    flex: 1,
  },
  selectedTextStyle: {
    marginLeft: 8,
    color: '#3c3c3c',
    backgroundColor: 'red',
  },
});

export default PhoneInput;
