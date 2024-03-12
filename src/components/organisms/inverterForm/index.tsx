import React, {memo, useState} from 'react';
import styles from './styles';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import IMAGES from '@assets/images/images';
import {t} from 'i18next';

const InverterForm: React.FC = () => {
  const mockData = [
    {id: 1, title: '인버터', results: '1호'},
    {id: 2, title: '현재출력\n(kW)', results: '126.6'},
    {id: 3, title: '누적발전량\n(MWh)', results: '126.6'},
    {id: 4, title: 'DC전압\nV1 (V)', results: '126.6'},
    {id: 5, title: 'DC전류\nI1 (A)', results: '126.6'},
    {id: 6, title: 'DC전압\nV2 (V)', results: '126.6'},
    {id: 7, title: 'DC전류\nI2 (A)', results: '126.6'},
    {id: 8, title: 'DC전압\nV3 (V)', results: '126.6'},
    {id: 9, title: 'DC전류\nI3 (A)', results: '126.6'},
    {id: 10, title: 'ACB(기중차단기)', results: '360.2'},
    {id: 11, title: '전류 R(A)', results: '126.6'},
    {id: 12, title: '전류 R (A)', results: '4348.93'},
    {id: 13, title: '전류 T (A)', results: '704'},
  ];

  const [data, setData] = useState([
    {id: 1, data: mockData},
    {id: 2, data: mockData},
  ]);

  const handleAddData = () => {
    const newId = data[data.length - 1].id + 1;
    setData([...data, {id: newId, data: mockData}]);
  };
  const handleSubtractData = () => {
    if (data.length > 1) {
      setData(data.slice(0, -1)); // Remove the last item from the data array
    }
  };

  const renderItem = (item: any) => {
    return (
      <View style={{marginBottom: 12}}>
        <FlatList
          data={item.item.data}
          renderItem={renderItemSeparator}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  };

  const renderItemSeparator = (item: any) => {
    const dataItem = item.item;
    return (
      <View style={styles.renderItemSeparatorContainer}>
        <View
          style={[
            styles.titleContainer,
            {
              borderTopWidth: item.index === 0 ? 0 : 1,
              borderTopLeftRadius: item.index === 0 ? 12 : 0,
              borderBottomLeftRadius:
                item.index === mockData.length - 1 ? 12 : 0,
            },
          ]}>
          <Text>{dataItem.title}</Text>
        </View>
        <View
          style={[
            styles.resultContainer,
            {borderTopWidth: item.index === 0 ? 0 : 1},
          ]}>
          <Text>{dataItem.results}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.addSquareContainer}>
          <Text style={styles.addSquareText}>{t('인버터 임,출력 확인')}</Text>
          <TouchableOpacity onPress={handleAddData}>
            <Image source={IMAGES.icAddSquare} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSubtractData}>
          <Image source={IMAGES.icSubtractSquare} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    </View>
  );
};

export default memo(InverterForm);
