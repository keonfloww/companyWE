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
  Image,
} from 'react-native';

import {Colors} from 'react-native-ui-lib';
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
      image: require('../../assets/images/png/Welcome_1.png'),
      title: 'Welcome to Troove!',
      buttonText: 'Next',
    },
    {
      id: 2,
      image: require('../../assets/images/png/Welcome_2.png'),
      title: 'Benefit 1',
      buttonText: 'Next',
    },
    {
      id: 3,
      image:require('../../assets/images/png/Welcome_3.png'),
      title: 'Benefit 2',
      buttonText: 'Get Started',
    },
  ];

  const pagination = (
    <View style={[styles.pagination]}>
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
        // height: '90%',
        paddingVertical: scale(40),
        paddingHorizontal: scale(20),
        // flex: 1,
        justifyContent: 'space-between',
        // backgroundColor: 'blue',
        alignItems: 'center',
      }}>
      {/* Image absolute */}
      <View style={{width: '100%', height: '40%', alignItems: 'center', justifyContent: 'center', marginTop: '10%'}}>
      <Image source={item.image} style={{width: '100%',marginTop: scale(50)}} resizeMode='contain' />
      </View>
      <View style={{justifyContent: 'center', alignSelf: ''}}>
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
          // position: 'absolute',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          zIndex: 2,
          paddingHorizontal: scale(30),
          marginTop: scale(30),
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
      <View style={{flex: 5}}> 
        
      {corousel}
      </View >
      <View style={{flex: 1}}>

      {pagination}
      </View>
      <View style={{height: insets.bottom}} />
    </LayoutBackgroundDefault>
  );
};
export default IntroScreen;

const styles = StyleSheet.create({
  text: {
    color: '#3c3c3c',
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
