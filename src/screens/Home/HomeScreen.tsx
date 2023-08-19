import SafeView from '@components/atoms/View/SafeView';
import {Divider} from '@rneui/base';
import {scale} from '@utils/mixins';
import {withTheme} from '@utils/mixinsComponents';
import {FC, Fragment, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, View} from 'react-native';
import HomeHeader from './components/HomeHeader';
import HomeCategoryList from './components/HomeCategoryList';
import HomeDontMissOut from './components/HomeDontMissOut';
import HomeSection from './components/HomeSection';

const HomeScreen: FC<any> = () => {
  const styless = withTheme(styles);
  const [refreshing, setRefreshing] = useState(false);
  return (
    <SafeView>
      {/* Header */}
      <View
        style={{
          paddingHorizontal: scale(25),
          paddingTop: scale(10),
          paddingBottom: scale(12),
          display: 'flex',
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
          <View style={styless.container}>
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
    </SafeView>
  );
};

const styles = ({theme}: any) => {
  return StyleSheet.create({
    container: {
      // backgroundColor: theme.colors?.custom?.backgroundColor,

      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export default HomeScreen;
