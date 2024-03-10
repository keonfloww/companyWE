import React from 'react';
import i18next from 'i18next';
import styles from './styles';
import {Text, View} from 'react-native';
import {Control} from 'react-hook-form';
import CustomController from 'src/components/molecules/customController';
import TextInputComponent from '@components/molecules/textInput';
import TextInputRightTextComponent from '@components/molecules/textInputRightText';

interface FormInputProps {
  control: Control<any>;
  ruleEmail: any;
  ruleRequire: any;
  errors: any;
}

const BasicForm: React.FC<FormInputProps> = props => {
  const {control, errors} = props;

  return (
    <View style={styles.viewForm}>
      <Text style={styles.labelText}>기본정보</Text>
      <CustomController
        control={control}
        render={({field: {onChange, value}}) => {
          return (
            <TextInputComponent
              placeholder={'태양광발전설비'}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
              secureTextEntry={false}
              title="이메일"
            />
          );
        }}
        name={'classification'}
        error={errors.phone}
      />
      <CustomController
        control={control}
        render={({field: {onChange, value}}) => {
          return (
            <TextInputComponent
              placeholder={'컴퍼니위 에너지'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              title="설비명(상호)"
            />
          );
        }}
        name={'equipmentName'}
        error={errors.phone}
      />
      <Text style={styles.titleText}>발전설비 전압/용량</Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <CustomController
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <TextInputRightTextComponent
                placeholder={'0'}
                onChangeText={onChange}
                value={value}
                secureTextEntry={false}
                textRight={'KV'}
              />
            );
          }}
          name={'powerGenerationKv'}
          error={errors.password}
        />
        <CustomController
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <TextInputRightTextComponent
                placeholder={'0'}
                onChangeText={onChange}
                value={value}
                secureTextEntry={false}
                textRight={'IN'}
              />
            );
          }}
          name={'powerGenerationIn'}
          error={errors.password}
        />
        <CustomController
          control={control}
          render={({field: {onChange, value}}) => {
            return (
              <TextInputRightTextComponent
                placeholder={'0'}
                onChangeText={onChange}
                value={value}
                secureTextEntry={false}
                textRight={'KW'}
              />
            );
          }}
          name={'powerGenerationKw'}
          error={errors.password}
        />
      </View>
      <CustomController
        control={control}
        render={({field: {onChange, value}}) => {
          return (
            <TextInputComponent
              placeholder={'2'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              title="인버터 대수"
            />
          );
        }}
        name={'inverterNumber'}
        error={errors.phone}
      />
      <CustomController
        control={control}
        render={({field: {onChange, value}}) => {
          return (
            <TextInputComponent
              placeholder={'전라북도 전주시 덕진구 견훤로 256'}
              onChangeText={onChange}
              value={value}
              secureTextEntry={false}
              title="발전소 주소"
            />
          );
        }}
        name={'powerPlantAddress'}
        error={errors.phone}
      />
    </View>
  );
};

export default BasicForm;
