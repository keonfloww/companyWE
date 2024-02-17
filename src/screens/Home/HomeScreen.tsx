import {Divider} from '@rneui/base';
import {scale} from '@utils/mixins';
import React, {FC, Fragment, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import HomeHeader from './components/HomeHeader';
import HomeCategoryList from './components/HomeCategoryList';
import HomeDontMissOut from './components/HomeDontMissOut';
import HomeSection from './components/HomeSection';
import {StatusBar} from 'react-native';
import SafeViewForceInsets from '@components/atoms/View/SafeViewForceInsets';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const HomeScreen: FC<any> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <SafeViewForceInsets
      isHasHeaderTabBar={false}
      isSafeTop={false}
      isSafeBottom={true}>
      {/* Header */}
      <View
        style={{
          marginTop: insets.top + (StatusBar?.currentHeight ?? 0),
          paddingHorizontal: scale(25),
          paddingTop: scale(10),
          paddingBottom: scale(12),
          display: 'flex',
          justifyContent: 'center',
        }}>
        <HomeHeader />
      </View>

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
    </SafeViewForceInsets>
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
