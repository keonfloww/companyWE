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
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {scale} from '../../utils/mixins';
import {Screen} from '@navigation/navigation.enums';
import BaseButton from '@components/atoms/Button/BaseButton';
import CommonStyles from '@screens/styles';
import {t} from 'i18next';
import IMAGES from '@assets/images/images';
import SafeView from '@components/atoms/View/SafeView';

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

  const carouselItems: IcarouselItems[] = [
    {
      id: 1,
      image: <IMAGES.welcomeTroove />,
      title: 'Welcome to Troove!',
      buttonText: 'Next',
    },
    {
      id: 2,
      image: <IMAGES.welcomeBenefit1 />,
      title: 'Benefit 1',
      buttonText: 'Next',
    },
    {
      id: 3,
      image: <IMAGES.welcomeBenefit2 />,
      title: 'Benefit 2',
      buttonText: 'Get Started',
    },
  ];

  const pagination = (
    <View style={[styles.pagination, {}]}>
      {carouselItems.map((_, index) => (
        <View key={index} style={[
          styles.paginationDot,
          (corouselIndex === index + 1) ? { backgroundColor: '#3C3C3C', width: scale(20)} : {}
        ]}/>
      ))}
    </View>
  )

  const nextPress = (index: number) => {
    if(index > 2) {
      navigation.navigate(Screen.Auth);
      return;
    }
    console.log({index})
    if (index <= 2) {
      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: index
      });
    }
};

const backPress = (index: number) => {
  if (index >= 1) {
    flatListRef?.current?.scrollToIndex({
      animated: true,
      index: index - 2
    });
  }
};

  const _renderItem = ({item}: any) => (
    <View style={[styles.view, { width: Dimensions.get('screen').width, marginVertical: scale (20), flex: 1,}]}>
      <View style={{paddingHorizontal: scale(20), flex: 1, justifyContent: 'space-between',}}>
      <View style={{alignItems: 'center', justifyContent: 'flex-start', flex: 1,}}>{item.image}</View>
      <View>
      <Text style={[CommonStyles.font.bold30, styles.text]}>{item.title}</Text>
      <Text style={[CommonStyles.font.regular14, styles.text]}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce libero
        leo, tincidunt eu ullamcorper euismod, blandit a ipsum.
      </Text>
      <BaseButton
          title={t(item.buttonText)}
          titleStyle={CommonStyles.font.regular14}
          onPress={() => nextPress(item.id)}
          size="md"
          containerStyle={{width: scale(162), marginVertical: scale(20), marginBottom: scale(0)}}
        />

      </View>
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
    <SafeView style={backgroundStyle}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <View
        style={{
          position: 'absolute',
          top: scale(75),
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          zIndex: 1111,
          paddingHorizontal: scale(30),
        }}>
        {corouselIndex !== 1 ? (
          <Pressable
            onPress={() => backPress(corouselIndex)}
            style={{height: scale(25), width: scale(25)}}>
            <IMAGES.arrowLeft />
          </Pressable>
        ) : (
          <View />
        )}
        {corouselIndex !== 3 ? (
          <Text
            onPress={() => navigation.navigate(Screen.Auth)}
            style={CommonStyles.font.semiBold14}>
            Skip
          </Text>
        ) : (
          <Text />
        )}
      </View>
      <View style={{marginBottom: scale(20)}}>
        <IMAGES.welcomeCircle />
      </View>
      {corousel}
      {pagination}
    </SafeView>
  );
};
export default IntroScreen;

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
    marginBottom: scale(10),
  },
  view: {
    marginVertical: scale(20),
  },
  paginationDot: {
    borderRadius: scale(6),
    width: scale(6),
    height: scale(6),
    margin: scale(5),
    backgroundColor: 'lightgray',
  },
  pagination: {
    // width: Dimensions.get('screen').width,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: scale(10),
    marginBottom: scale(40),
    marginHorizontal: scale(20),
    //  backgroundColor: 'red'
  },
});
