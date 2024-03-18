import React from 'react';
import styles from './styles';
import {Image, Text, View} from 'react-native';
import IMAGES from '@assets/images/images';
import {t} from 'i18next';

const MonthHistoryForm: React.FC = () => {
  const mockData = {
    thisMonth: '8,279',
    previousMonth: '8,241',
    number: '38',
    drainage: '720',
    result: '27.360',
  };

  const viewParam = (text: any, textRight?: any) => {
    return (
      <View style={styles.viewParam}>
        <Text>{text}</Text>
        {textRight && <Text style={styles.textRight}>{textRight}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.width40}>
          <Text style={styles.titleText}>{t('금월')}</Text>
          {viewParam(mockData.thisMonth)}
        </View>
        <View style={styles.blackLineContainer}>
          <View style={styles.blackLine}></View>
        </View>
        <View style={styles.width40}>
          <Text style={styles.titleText}>{t('전월')}</Text>
          {viewParam(mockData.previousMonth)}
        </View>
      </View>
      <View style={styles.resultContainer}>
        <Image source={IMAGES.icEqual} style={styles.imageContainer} />
        <Text style={styles.iconText}>{'('}</Text>
        <View style={styles.width100}>{viewParam(mockData.number)}</View>
        <Text style={styles.xText}>x</Text>
        <View style={styles.drainageContainer}>
          {viewParam(mockData.drainage, t('배수'))}
        </View>
        <Text style={styles.iconText}>{')'}</Text>
      </View>
      <View style={styles.height16} />
      <View style={styles.resultContainer}>
        <Image source={IMAGES.icEqual} style={styles.imageContainer} />

        <View style={styles.kwhContainer}>
          {viewParam(mockData.result + t('kWh'))}
        </View>
      </View>
    </View>
  );
};

export default MonthHistoryForm;
