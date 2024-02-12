import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { scale } from '@utils/mixins';

const AddressInput = ({containerStyle, labelStyle, style, label = 'Address'}: any) => {
  return (
    <View style={[styles.container, containerStyle ? containerStyle : {}]}>
      <Text style={[styles.label, labelStyle ? labelStyle : {}]}>{label}</Text>
      <TextInput style={[styles.input, style]} placeholder='Enter Address' />
    </View>
  )
}

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
        // width: '70%',
        // flex: 1,
        paddingHorizontal: scale(20),
        paddingVertical: scale(10),
    },
    error: {
      borderColor: 'red',
      borderWidth: 1,
    },
    errorText: {
      color: 'red',
    },
  });

export default AddressInput