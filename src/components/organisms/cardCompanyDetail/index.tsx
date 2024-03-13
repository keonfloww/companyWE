import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {t} from 'i18next';
import IMAGES from '@assets/images/images';
import FastImage from 'react-native-fast-image';

interface CardCompanyProps {
  data: any;
}

interface IWeather {
  location: string;
  temperatures: string;
}

const CardCompanyDetail: React.FC<CardCompanyProps> = props => {
  const {data} = props;

  const renderCard = ({
    icon,
    text,
    data,
    backgroundColor,
  }: {
    icon: any;
    text: string;
    data: string;
    backgroundColor?: string;
  }) => {
    return (
      <View style={[styles.cardContainer, {backgroundColor: backgroundColor}]}>
        <Image source={icon} />
        <View style={styles.titleTextContainer}>
          <Text style={styles.titleText}>{text}</Text>
          <Text style={styles.dataText}>{data}건</Text>
        </View>
      </View>
    );
  };

  const weatherCard = (IWeather: IWeather) => {
    return (
      <View style={styles.cardWeatherContainer}>
        <Text style={styles.weatherText}>{t('현재날씨')}</Text>
        <View style={styles.temperaturesContainer}>
          <Text style={styles.weatherText}>{t('기온')}</Text>
          <Text style={styles.temperaturesText}>
            {IWeather.temperatures}
            °C
          </Text>
        </View>
        <View>
          <IMAGES.icCloud />
          <Text style={styles.weatherText}>{IWeather.location}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.cardViewContainer}>
      {weatherCard(data.weather)}
      <View style={styles.cardInformationContainer}>
        {renderCard({
          icon: IMAGES.icCalendarStar,
          text: t('점검 예정'),
          data: data.scheduledForMaintenance,
          backgroundColor: '#FFD153',
        })}
        <View style={styles.height16} />
        {renderCard({
          icon: IMAGES.icSettingsChat,
          text: t('점검 예정'),
          data: data.scheduledForMaintenance,
          backgroundColor: '#F7C1AD',
        })}
      </View>
    </View>
  );
};

export default CardCompanyDetail;
