import React from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import TextInputComponent from '@components/molecules/textInput';
import TextInputRightTextComponent from '@components/molecules/textInputRightText';
import {t} from 'i18next';
const BasicForm: React.FC = () => {
  const mockData = {
    classification: '히텍스트',
    equipmentName: '히텍스트',
    capacity: {
      kv: '22.9',
      in: '22.9',
      kw: '22.9',
    },
    inverterNumber: '2',
    powerPlantAddress: '히텍스트',
  };

  return (
    <View style={styles.viewForm}>
      <Text style={styles.labelText}>{t('기본정보')}</Text>

      <TextInputComponent
        placeholder={mockData.classification}
        secureTextEntry={false}
        title={t('이메일')}
        editable={false}
        value={undefined}
      />

      <TextInputComponent
        placeholder={mockData.equipmentName}
        value={undefined}
        secureTextEntry={false}
        title={t('설비명(상호)')}
        editable={false}
      />

      <Text style={styles.titleText}>{t('발전설비 전압/용량')}</Text>
      <View style={styles.textRightContainer}>
        <TextInputRightTextComponent
          placeholder={mockData.capacity.kv}
          value={undefined}
          secureTextEntry={false}
          textRight={t('KV')}
          editable={false}
        />

        <TextInputRightTextComponent
          placeholder={mockData.capacity.in}
          value={undefined}
          secureTextEntry={false}
          textRight={t('IN')}
          editable={false}
        />

        <TextInputRightTextComponent
          placeholder={mockData.capacity.kw}
          value={undefined}
          secureTextEntry={false}
          textRight={t('KW')}
          editable={false}
        />
      </View>

      <TextInputComponent
        placeholder={mockData.inverterNumber}
        value={undefined}
        secureTextEntry={false}
        title={t('인버터 대수')}
        editable={false}
      />

      <TextInputComponent
        placeholder={mockData.powerPlantAddress}
        value={undefined}
        secureTextEntry={false}
        title={t('발전소 주소')}
        editable={false}
      />
    </View>
  );
};

export default BasicForm;
