import React, {useEffect, useState} from 'react';
import type {FC} from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import {t} from 'i18next';
import IMAGES from '@assets/images/images';
import {colors} from 'src/themes';
import {Dividers, Switch} from 'react-native-ui-lib';
import Divider from '@components/atoms/Divider/Divider';
import {scale} from '@utils/mixins';
import DeviceInfo from 'react-native-device-info';

const SettingScreen: FC<any> = () => {
  const mockData = {
    address: '경기도 경기시 경기군 1102-2',
    yearOfInstallation: '2020년 10월 5일',
    safetyManager: '홍길동/010-9999-3333',
    volume: '100kW',
  };

  const [receiveNotification, setReceiveNotification] = useState(false);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>{t('설정')}</Text>
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => {}}>
            <IMAGES.icHeadset color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.marginLeft8} onPress={() => {}}>
            <IMAGES.icAlertGlobal color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderCardInfomation = ({
    title,
    data,
  }: {
    title: string;
    data: string;
  }) => {
    return (
      <View style={styles.viewCardContainer}>
        <Text style={styles.titleCardText}>{title}</Text>
        <Text style={styles.dataCardText}>{data}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <View style={styles.bodyContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.headerCardText}>{t('도도익산')}</Text>
          {renderCardInfomation({
            title: t('주소'),
            data: mockData.address,
          })}
          {renderCardInfomation({
            title: t('설치년도'),
            data: mockData.yearOfInstallation,
          })}
          {renderCardInfomation({
            title: t('안전관리자'),
            data: mockData.safetyManager,
          })}
          {renderCardInfomation({
            title: t('용 량'),
            data: mockData.volume,
          })}
        </View>
        <Divider style={styles.dividerContainer} />

        <Text style={styles.headerCardText}>{t('설정')}</Text>
        <View style={styles.notificationView}>
          <View style={styles.notificationContainer}>
            <IMAGES.icAlertGlobal color={colors.black} />
            <Text style={styles.notificationText}>{t('알림 설정')}</Text>
          </View>
          <Switch
            value={receiveNotification}
            onValueChange={setReceiveNotification}
            onColor={colors.appColor}
          />
        </View>
        <Divider style={styles.dividerContainer} />
        <View style={styles.notificationView}>
          <View style={styles.notificationContainer}>
            <IMAGES.icAlertGlobal color={colors.black} />
            <Text style={styles.notificationText}>{t('앱 버전정보')}</Text>
          </View>
          <Text style={styles.versionText}>
            {t('v') + ' ' + DeviceInfo.getVersion()}
          </Text>
        </View>
        <View style={styles.notificationView}>
          <View style={styles.notificationContainer}>
            <IMAGES.icAlertGlobal color={colors.black} />
            <Text style={styles.notificationText}>{t('사용 매뉴얼')}</Text>
          </View>
          <Text style={styles.userManualText}>{t('링크')}</Text>
        </View>
        <Divider style={styles.dividerContainer} />
        <View style={styles.notificationContainer}>
          <IMAGES.icSignOut color={colors.black} />
          <Text style={styles.signOutText}>{t('로그아웃')}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;
