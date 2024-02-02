/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import type {FC} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  FlatList,
  View,
  useColorScheme,
  Dimensions,
  StatusBar,
  useWindowDimensions,
  Platform,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scale} from '../../utils/mixins';
import {Screen} from '@navigation/navigation.enums';
import BaseButton from '@components/atoms/Button/BaseButton';
import CommonStyles from '@screens/styles';
import {t} from 'i18next';
import IMAGES from '@assets/images/images';
import SafeView from '@components/atoms/View/SafeView';
import LayoutBackgroundDefault from '@layouts/default/LayoutBackgroundDefault';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import navigationService from '@services/navigationService';

interface IcarouselItems {
  id: number;
  image: any;
  title: string;
  buttonText: string;
}

const IntroScreen: FC<any> = ({navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const flatListRef = useRef<FlatList>();
  const [corouselIndex, setCorouselIndex] = useState(1);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const {width, height} = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const carouselItems: IcarouselItems[] = [
    {
      id: 1,
      image: (
        <IMAGES.welcomeTroove style={{position: 'absolute', top: Platform.OS === 'ios' ? '10%' : '12%'}} />
      ),
      title: 'Welcome to Troove!',
      buttonText: 'Next',
    },
    {
      id: 2,
      image: (
        <IMAGES.welcomeBenefit1 style={{position: 'absolute', top: Platform.OS === 'ios' ? '10%' : '12%'}} />
      ),
      title: 'Benefit 1',
      buttonText: 'Next',
    },
    {
      id: 3,
      image: (
        <IMAGES.welcomeBenefit2 style={{position: 'absolute', top: Platform.OS === 'ios' ? '10%' : '12%'}} />
      ),
      title: 'Benefit 2',
      buttonText: 'Get Started',
    },
  ];

  const pagination = (
    <View style={[styles.pagination, {bottom: scale(90)}]}>
      {carouselItems.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            corouselIndex === index + 1
              ? {backgroundColor: '#3C3C3C', width: scale(20)}
              : {},
          ]}
        />
      ))}
    </View>
  );

  const nextPress = (index: number) => {
    if (index > 2) {
      navigation.navigate(Screen.Auth);
      return;
    }
    console.log({index});
    if (index <= 2) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index,
      });
    }
  };

  const backPress = (index: number) => {
    if (index >= 1) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index - 2,
      });
    }
  };

  const _renderItem = ({item}: any) => (
    <View
      style={{
        width: Dimensions.get('screen').width,
        height: height,
        marginVertical: scale(20),
        paddingHorizontal: scale(20),
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      {/* Image absolute */}
      {item.image}

      <View style={{flex: 5}} />
      <View style={{flex: 4.5,justifyContent: 'center',bottom: scale(height* 0.08 + insets.bottom),}}>
        <Text style={[CommonStyles.font.bold30, styles.text]}>
          {item.title}
        </Text>
        <Text style={[CommonStyles.font.regular14, styles.text]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce libero
          leo, tincidunt eu ullamcorper euismod, blandit a ipsum.
        </Text>
        <BaseButton
          title={t(item.buttonText)}
          titleStyle={CommonStyles.font.regular14}
          onPress={() => nextPress(item.id)}
          size="lg"
          containerStyle={{
            width: scale(162),
            marginVertical: scale(20),
            marginBottom: scale(0),
          }}
        />
      </View>
    </View>
  );

  const corousel = (
    <FlatList<IcarouselItems>
      data={carouselItems}
      horizontal
      pagingEnabled
      bounces={false}
      overScrollMode="never"
      keyExtractor={(_, index) => index.toString()}
      renderItem={_renderItem}
      ref={flatListRef}
      showsHorizontalScrollIndicator={false}
      onScroll={event => {
        let contentOffset = event.nativeEvent.contentOffset;
        let index = Math.floor(contentOffset.x / 300);
        setCorouselIndex(index + 1);
      }}
    />
  );

  return (
    <LayoutBackgroundDefault>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View
        style={{
          position: 'absolute',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          zIndex: 2,
          paddingHorizontal: scale(30),
          top: scale(30),
          alignItems: 'center',
        }}>
        {corouselIndex !== 1 ? (
          <Pressable
            onPress={() => backPress(corouselIndex)}
            style={{height: scale(25), width: scale(25)}}>
            <IMAGES.arrowLeft />
          </Pressable>
        ) : (
          <View style={{height: scale(25), width: scale(25)}} />
        )}
        {corouselIndex !== 3 ? (
          <Text
            onPress={() => navigationService.navigate(Screen.Login)}
            style={CommonStyles.font.semiBold14}>
            Skip
          </Text>
        ) : (
          <Text />
        )}
      </View>
      {corousel}
      {pagination}
      <View style={{height: insets.bottom}} />
    </LayoutBackgroundDefault>
  );
};
export default IntroScreen;

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    marginBottom: scale(10),
  },
  paginationDot: {
    borderRadius: scale(6),
    width: scale(6),
    height: scale(6),
    margin: scale(5),
    backgroundColor: 'lightgray',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: scale(10),
    marginBottom: scale(40),
    marginHorizontal: scale(20),
  },
});
