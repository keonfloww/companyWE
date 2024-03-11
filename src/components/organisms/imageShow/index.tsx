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

interface FormInputProps {}

const ImageShow: React.FC<FormInputProps> = props => {
  const mockData = {
    imageOne:
      'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
    imageTwo:
      'https://us.123rf.com/450wm/photochicken/photochicken2008/photochicken200800065/153425631-pritty-jeune-photographe-asiatique-fille-adolescente-voyage-avec-appareil-photo-prendre-une-photo-de.jpg?ver=6',
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{t('사진')}</Text>
      <View style={styles.viewParam}>
        <Image
          source={{uri: mockData.imageOne}}
          style={styles.imageContainer}
        />
        <Image
          source={{uri: mockData.imageTwo}}
          style={styles.imageContainer}
        />
      </View>
    </View>
  );
};

export default ImageShow;
