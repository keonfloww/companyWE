import {Divider} from '@rneui/base';
import {CUSTOM_HEADER_HEIGHT, scale} from '@utils/mixins';
import React, {FC, Fragment, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import HomeHeader from './components/HomeHeader';
import HomeCategoryList from './components/HomeCategoryList';
import HomeDontMissOut from './components/HomeDontMissOut';
import HomeSection from './components/HomeSection';
import LayoutCustomHeader from '@layouts/default/LayoutCustomHeader';

const HomeScreen: FC<any> = () => {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <LayoutCustomHeader
      isShowBack={false}
      styleCustomHeader={{height: CUSTOM_HEADER_HEIGHT}}
      containerStyle={{alignItems: 'center', paddingHorizontal: scale(20)}}
      customHeader={<HomeHeader />}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => {
                setRefreshing(false);
              }, 1000);
            }}
          />
        }>
        <View style={{height: scale(12)}} />
        {/* Sub header */}
        <HomeCategoryList />
        <View style={{height: scale(12)}} />

        {/* Body */}
        <View style={{flex: 1}}>
          <Divider width={scale(6)} />
          <View style={styles.container}>
            <HomeDontMissOut />
          </View>
        </View>
        <Divider width={scale(6)} />

        {[
          'Our picks for You',
          'My Bookmarks',
          'Fashion',
          'Travel',
          'Gourmet',
        ].map((_, index: number) => (
          <Fragment key={_}>
            <View
              style={{
                marginLeft: scale(25),
                marginBottom: scale(8),
              }}>
              <HomeSection title={_} />
            </View>
            {index < 4 && <Divider width={scale(6)} />}
          </Fragment>
        ))}
      </ScrollView>
    </LayoutCustomHeader>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.colors?.custom?.backgroundColor,

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(HomeScreen);
