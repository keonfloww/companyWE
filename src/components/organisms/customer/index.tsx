import React, {useState} from 'react';
import styles from './styles';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Control} from 'react-hook-form';
import CustomController from 'src/components/molecules/customController';
import IMAGES from '@assets/images/images';
import DropDownApp from '@components/molecules/dropDown';
import DatePicker from 'react-native-date-picker';
import TextInputComponent from '@components/molecules/textInput';
import TextInputRightTextComponent from '@components/molecules/textInputRightText';
import {t} from 'i18next';

const CustomerComponent: React.FC = () => {
  const mockData = {
    customer: '홍길동',
    inspector: '이순신',
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{t('고객')}</Text>
      <View style={styles.viewParam}>
        <Text style={styles.paramText}>{mockData.customer}</Text>
      </View>
      <Text style={styles.inspectorText}>{t('점검자')}</Text>
      <View style={styles.viewParam}>
        <Text style={styles.paramText}>{mockData.inspector}</Text>
      </View>
    </View>
  );
};

export default CustomerComponent;
