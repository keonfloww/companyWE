import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import useHome from '../hooks/useHome';
import FastImage from 'react-native-fast-image';
import CommonStyles from '@screens/styles';
import {useTranslation} from 'react-i18next';

interface Props {
  title: string;
}
const HomeSection: FC<Props> = ({title}) => {
  const {t} = useTranslation();
  const {sectionList} = useHome();

  return (
    <View style={style.container}>
      <View style={style.containerHeader}>
        <Text numberOfLines={1} style={style.text}>{title}</Text>
        <Pressable onPress={() => {}}>
          <Text style={[CommonStyles.font.regular12, style.text]} numberOfLines={1}>
            {t('See all')}
          </Text>
        </Pressable>
      </View>
      <View style={{height: scale(12)}} />
      <FlatList
        contentContainerStyle={style.containerHeaderContentList}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={sectionList}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: 12,
            }}
          />
        )}
        renderItem={({item}: any) => {
          return (
            <View style={{width: scale(160)}}>
              <FastImage
                style={{height: scale(160), borderRadius: 5}}
                source={{
                  uri: 'https://unsplash.it/400/400?image=1',
                  headers: {Authorization: 'someAuthToken'},
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View style={{height: scale(8)}} />
              <Text numberOfLines={1} style={[CommonStyles.font.semiBold14, style.text]}>
                {item?.title}
              </Text>
              <Text numberOfLines={1} style={[CommonStyles.font.regular10, style.text]}>
                {item?.date}
              </Text>
              <Text numberOfLines={3} style={[CommonStyles.font.regular12, style.text]}>
                {item?.description}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    paddingVertical: scale(16),
  },
  containerHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: scale(25),
  },
  containerHeaderContentList: {
    paddingVertical: scale(1),
    paddingRight: scale(25),
  },
  text: {
    color: '#3c3c3c',
  }
});

export default React.memo(HomeSection);
