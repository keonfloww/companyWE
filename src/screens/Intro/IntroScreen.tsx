/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {FC} from 'react';
import {ScrollView, StyleSheet, useColorScheme} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {scale} from '../../utils/mixins';
import {Screen} from '@navigation/navigation.enums';
import BaseButton from '@components/atoms/Button/BaseButton';
import CommonStyles from '@screens/styles';
import {t} from 'i18next';

const IntroScreen: FC<any> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <ScrollView
      bounces={false}
      contentInsetAdjustmentBehavior="automatic"
      style={backgroundStyle}
      contentContainerStyle={CommonStyles.view.viewLayout}>
      <Header />

      <BaseButton
        title={t('common:start')}
        onPress={() => navigation.navigate(Screen.MainTabBar)}
      />
    </ScrollView>
  );
};
export default IntroScreen;
