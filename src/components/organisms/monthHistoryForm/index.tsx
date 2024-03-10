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

interface FormInputProps {
  control: Control<any>;

  errors: any;
}

const MonthHistoryForm: React.FC<FormInputProps> = props => {
  const {control, errors} = props;

  return <></>;
};

export default MonthHistoryForm;
