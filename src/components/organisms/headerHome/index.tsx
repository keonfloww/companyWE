import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {t} from 'i18next';
import IMAGES from '@assets/images/images';
import FastImage from 'react-native-fast-image';

interface HeaderHomeProps {
  data: dataUser;
}

interface dataUser {
  userName: string;
  avatar: string;
  listCompany: any;
}

const HeaderHome: React.FC<HeaderHomeProps> = props => {
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
          <Text style={styles.dataText}>{data}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageBackgroundContainer}>
        <FastImage
          source={IMAGES.icHomeBackground}
          resizeMode="cover"
          style={styles.fastImageContainer}>
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <Text style={styles.textHeader}>{t('발전소 리스트')}</Text>
              <Image
                source={IMAGES.icAlert}
                resizeMode="contain"
                style={styles.iconNotiContainer}
              />
            </View>
            <View style={styles.userContainer}>
              <FastImage
                source={{uri: data?.avatar}}
                style={styles.userImage}
              />
              <Text style={styles.userNameText}>{data?.userName}</Text>
            </View>
            <View style={styles.cardViewContainer}>
              {renderCard({
                icon: IMAGES.icBuildingMultiple,
                text: t('총 발전소'),
                data: data.listCompany.length,
                backgroundColor: '#F7C1AD',
              })}
              {renderCard({
                icon: IMAGES.icCalendarStar,
                text: t('총 발전소'),
                data: '1',
                backgroundColor: '#FFD153',
              })}
              {renderCard({
                icon: IMAGES.icSettingsChat,
                text: t('총 발전소'),
                data: data.listCompany.length,
                backgroundColor: '#F7C1AD',
              })}
            </View>
          </SafeAreaView>
        </FastImage>
      </View>
    </View>
  );
};

export default HeaderHome;
