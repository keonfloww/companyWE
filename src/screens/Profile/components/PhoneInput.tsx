import {StyleSheet, View, TextInput} from 'react-native';
import React, {useState} from 'react';
import {Text} from 'react-native-ui-lib';
import {Dropdown} from 'react-native-element-dropdown';
import {scale} from '@utils/mixins';
import CountryPicker from 'react-native-country-picker-modal';
import CommonStyles from '@screens/styles';

const PhoneInput = ({data, value, onChange}: any) => {
  const [countryVisible, setCountryVisible] = useState(false);

  return (
    <View style={{marginBottom: scale(20)}}>
      <Text style={{marginBottom: scale(10)}}>Phone</Text>
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
            paddingVertical: scale(10),
            marginRight:scale(10),
          }}
          countryCode="IN"
          visible={countryVisible}
          onClose={() => setCountryVisible(false)}
          onSelect={val => console.log(val)}
        />


        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#8f8f8f',
            borderRadius: scale(100),
            // width: '70%',
            flex: 1,
            paddingHorizontal: scale(20),
            paddingVertical: scale(10),
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
