import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Text} from 'react-native-ui-lib';
import {Dropdown} from 'react-native-element-dropdown';
import {scale} from '@utils/mixins';
import CommonStyles from '@screens/styles';

const DropDown = ({data, value, onChange}: any) => {
  const renderItem = (item: {label: string; value: string}) => {
    return (
      <View style={styles.dd_item_style}>
        <Text style={styles.dd_item_textstyle}>{item.value}</Text>
      </View>
    );
  };
  return (
    <View style={{marginBottom: scale(20)}}>
      <Text
        style={[
          CommonStyles.font.semiBold14,
          {marginBottom: scale(10), color: Colors.text},
        ]}>
        Gender
      </Text>
      <Dropdown
        data={[
          {label: 'Male', value: 'Male'},
          {label: 'Female', value: 'Female'},
        ]}
        placeholder='select'
        placeholderStyle={[
          CommonStyles.font.regular14,
          {color: Colors.border},
        ]}
        value={value}
        renderItem={renderItem}
        onChange={val => onChange(val)}
        labelField={'label'}
        valueField={'value'}
        selectedTextStyle={[
          CommonStyles.font.regular14,
          styles.selectedTextStyle,
        ]}
        containerStyle={{
          borderRadius: scale(10),
          shadowColor: 'black',
          shadowOffset: {width: 1, height: 0.5},
          shadowRadius: scale(20),
          shadowOpacity: 0.1,
          elevation: scale(4),
          borderColor: 'transparent',
          borderWidth: 0,
          // marginTop: -5,
          marginLeft: 0,
        }}
        style={{
          borderWidth: scale(1),
          borderColor: '#8f8f8f',
          height: scale(45),
          borderRadius: scale(100),
          paddingVertical: scale(5),
          paddingHorizontal: scale(20),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dd_item_style: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    borderBottomColor: 'gray',
    alignItems: 'center',
    // backgroundColor: 'red',
    borderRadius: scale(10)
  },
  dd_item_textstyle: {
    marginVertical: scale(10),
    marginHorizontal: scale(20),
    paddingRight: scale(50),
    borderRadius: scale(10),
    paddingLeft: 0,

    flex: 1,
  },
  selectedTextStyle: {
    // marginLeft: 8,
    color: Colors.border,
    // backgroundColor: 'red'
  },
});

export default DropDown;
