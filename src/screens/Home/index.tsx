import React, {useState} from 'react';
import type {FC} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import IMAGES from '@assets/images/images';
import styles from './styles';
import HeaderHome from '@components/organisms/headerHome';
import TextInputComponent from '@components/molecules/textInput';
import {t} from 'i18next';
import navigationService from '@services/navigationService';
import {Screen} from '@navigation/navigation.enums';

const HomeScreen: FC<any> = () => {
  const [searchText, setSearchText] = useState('');
  const mockData = {
    userName: '홍길동 고객님',
    avatar:
      'https://scontent.fhan1-1.fna.fbcdn.net/v/t1.18169-9/580654_423249071093074_573265751_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGzuwXS5TtVe_gx1BwESYeci9BEBr_-8ImL0EQGv_7wiSxb0wT-sZXcUoyiXyL75LQPYRBt3SRyfRkYrXu56GIT&_nc_ohc=BM9b_vT4-wUAX-DOU28&_nc_ht=scontent.fhan1-1.fna&oh=00_AfB36-o0YhX_vA-IR7lFrlqniBwtUI7HgQkoK7gBCPgWBQ&oe=66177A42',
    listCompany: [
      {id: 1, name: '전기용접기', volume: '100', scheduledForMaintenance: '1'},
      {id: 2, name: '도도익산', volume: '100', scheduledForMaintenance: '1'},
    ],
  };

  const renderItem = (item: any) => {
    const data = item.item;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.renderItemContainer}
        onPress={() => {
          navigationService.navigate(Screen.CompanyDetailScreen);
        }}>
        <Text style={styles.bodyText}>{data.id}</Text>
        <Text style={styles.bodyText}>{data.name}</Text>
        <Text style={styles.bodyText}>{data.volume}</Text>
        <Text style={styles.bodyText}>{data.scheduledForMaintenance}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderHome data={mockData} />

      <View style={styles.bodyContainer}>
        <TextInputComponent
          placeholder={'검색'}
          value={searchText}
          onChangeText={value => {
            setSearchText(value);
          }}
          iconLeft={IMAGES.icHomeSearch}
          styleInputProps={styles.searchInput}
          styleProps={styles.searchInputContainer}
        />
        <View style={styles.listCompanyContainer}>
          <View style={styles.renderItemContainer}>
            <Text style={styles.titleText}>{t('No.')}</Text>
            <Text style={styles.titleText}>{t('발전소명')}</Text>
            <Text style={styles.titleText}>{t('용량')}</Text>
            <Text style={styles.titleText}>{t('점검 예정')}</Text>
          </View>
          <FlatList
            data={mockData.listCompany}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
