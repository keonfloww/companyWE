import {scale} from '@utils/mixins';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import useHome from '../hooks/useHome';
import CommonStyles from '@screens/styles';
import FastImage from 'react-native-fast-image';
import BaseButton from '@components/atoms/Button/BaseButton';
import {useTranslation} from 'react-i18next';
import {Colors, Text} from 'react-native-ui-lib';

const HomeDontMissOut = () => {
  const {t} = useTranslation();

  const {dontMissOutList} = useHome();

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text>{t('Don’t Miss Out')}</Text>
      </View>

      <View style={styles.containerBody}>
        <FlatList
          contentContainerStyle={styles.containerBodyList}
          data={dontMissOutList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: scale(15)}} />}
          renderItem={({item}) => {
            return (
              <View style={styles.containerBodyListCard}>
                <View style={styles.containerBodyListCardOval} />
                <View style={styles.containerBodyListCardContent}>
                  <View style={CommonStyles.flex.col}>
                    <Text
                      style={CommonStyles.font.semiBold16}
                      numberOfLines={1}>
                      {item?.title}
                    </Text>
                    <View style={{height: scale(3)}} />
                    <Text style={CommonStyles.font.regular12} numberOfLines={2}>
                      {item?.description}
                    </Text>
                    <View style={{height: scale(16)}} />
                    <BaseButton
                      size="sm"
                      title={t('Learn More')}
                      containerStyle={styles.containerBodyListCardContentButton}
                    />
                  </View>
                </View>
                <View style={CommonStyles.flex.flex1}>
                  <FastImage
                    style={styles.containerBodyListCardImage}
                    source={{
                      uri: 'https://unsplash.it/400/400?image=1',
                      headers: {Authorization: 'someAuthToken'},
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(_: any, index: any) => index}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    flex: 1,
    marginVertical: scale(16),
  },
  containerHeader: {
    paddingHorizontal: scale(25),
    marginBottom: scale(8),
  },

  containerBody: {
    flex: 1,
  },
  containerBodyList: {
    paddingVertical: scale(1),
    paddingHorizontal: scale(25),
    height: scale(150),
  },
  containerBodyListCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    borderRadius: scale(5),
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: scale(3),
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    width: scale(288),
    height: scale(134),
    overflow: 'hidden',
  },
  containerBodyListCardOval: {
    backgroundColor: 'white',
    position: 'absolute',
    left: scale(-20),
    width: scale(200),
    height: scale(185),
    borderRadius: 99,
    zIndex: 1,
    transform: [{scaleY: 1.5}],
  },
  containerBodyListCardContent: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    paddingLeft: scale(15),
    paddingRight: scale(1),
    paddingTop: scale(14),
    zIndex: 1,
  },
  containerBodyListCardContentButton: {
    marginRight: scale(15),
  },

  containerBodyListCardImage: {
    flex: 1,
    borderBottomRightRadius: scale(5),
    borderTopRightRadius: scale(5),
  },
});

export default React.memo(HomeDontMissOut);
