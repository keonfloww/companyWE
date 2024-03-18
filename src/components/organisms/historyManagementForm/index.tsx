import React, {useState} from 'react';
import styles from './styles';
import {Image, Text, View} from 'react-native';
import IMAGES from '@assets/images/images';
import {t} from 'i18next';
import TextInputComponent from '@components/molecules/textInput';

const HistoryManagementForm: React.FC = () => {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.viewForm}>
      <View style={styles.headerContainer}>
        <Text style={styles.labelText}>{t('점검 이력관리 상세')}</Text>
        <Image source={IMAGES.icCarbonMap} />
      </View>
      <View style={styles.dateContainer}>
        <View>
          <Text style={styles.labelText}>{t('점검일자')}</Text>
          <View style={styles.dropdown}>
            <TextInputComponent
              placeholder={date.toLocaleDateString()}
              value={undefined}
            />
          </View>
        </View>

        <View>
          <Text style={styles.labelText}>{t('종합 점검 결과')}</Text>
          <View style={styles.dropdown}>
            <TextInputComponent placeholder={t('여성')} value={undefined} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HistoryManagementForm;
