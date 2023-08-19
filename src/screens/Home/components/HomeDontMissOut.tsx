import {scale} from '@utils/mixins';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import useHome from '../hooks/useHome';
import CommonStyles from '@screens/styles';
import {Text as RText} from '@rneui/themed';
import FastImage from 'react-native-fast-image';
import BaseButton from '@components/atoms/Button/BaseButton';
import {withTheme} from '@utils/mixinsComponents';
import {useTranslation} from 'react-i18next';

const HomeDontMissOut = () => {
  const styless = withTheme(styles);
  const {t} = useTranslation();

  const {dontMissOutList} = useHome();

  return (
    <View style={styless.container}>
      <View style={styless.containerHeader}>
        <RText h4>{t('Don’t Miss Out')}</RText>
      </View>

      <View style={styless.containerBody}>
        <FlatList
          contentContainerStyle={styless.containerBodyList}
          data={dontMissOutList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{width: scale(15)}} />}
          renderItem={({item}) => {
            return (
              <View style={styless.containerBodyListCard}>
                <View style={styless.containerBodyListCardOval} />
                <View style={styless.containerBodyListCardContent}>
                  <View style={CommonStyles.flex.col}>
                    <RText
                      style={CommonStyles.font.semiBold16}
                      numberOfLines={1}>
                      {item?.title}
                    </RText>
                    <View style={{height: scale(3)}} />
                    <RText
                      style={CommonStyles.font.regular12}
                      numberOfLines={2}>
                      {item?.description}
                    </RText>
                    <View style={{height: scale(16)}} />
                    <BaseButton
                      size="sm"
                      title={t('Learn More')}
                      containerStyle={
                        styless.containerBodyListCardContentButton
                      }
                    />
                  </View>
                </View>
                <View style={CommonStyles.flex.flex1}>
                  <FastImage
                    style={styless.containerBodyListCardImage}
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

const styles = ({theme}: any) =>
  StyleSheet.create({
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
      shadowColor: theme?.colors?.primary,
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
