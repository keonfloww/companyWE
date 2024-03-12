import React, {memo} from 'react';
import styles from './styles';
import {FlatList, Text, View} from 'react-native';
import {t} from 'i18next';

interface itemOption {
  id: number;
  title: string;
  results: boolean;
}

const HighPressureEquipmentForm: React.FC = () => {
  const mockData = [
    {id: 1, title: '인입구 배선', results: true},
    {id: 2, title: '배분전반', results: false},
    {id: 3, title: '배선용차단기', results: true},
    {id: 4, title: '누전차단기', results: false},
    {id: 5, title: '배선', results: false},
    {id: 6, title: '접지설비', results: true},
    {id: 7, title: '발전설비', results: true},
    {id: 8, title: '조명장치', results: false},
    {id: 9, title: '전동기', results: false},
    {id: 10, title: '기티설비', results: true},
    {id: 11, title: '전열장치', results: false},
    {id: 12, title: '전기용접기', results: true},
    {id: 13, title: '콘텐서', results: false},
    {id: 14, title: '접속기개폐기', results: true},
    {id: 15, title: '구내전선로', results: false},
  ];

  const renderItem = ({item}: {item: itemOption}) => {
    return (
      <View style={styles.renderItemContainer}>
        <View style={styles.textRenderItemContainer}>
          <Text style={styles.secondRowText}>{item.title}</Text>
        </View>
        <View style={styles.resultsContainer}>
          <Text>{item.results ? '/' : 'o'}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.viewForm}>
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{t('항목')}</Text>
          </View>
          <View style={styles.secondRowContainer}>
            <View style={styles.paddingLeft12}>
              <Text style={styles.itemText}>{t('점검사항')}</Text>
            </View>
            <Text style={styles.checkListText}>{t('점검결과')}</Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.optionsContainer}>
          <View style={styles.itemContainer}>
            <Text>{t('특고\n(고압)\n설비')}</Text>
          </View>

          <View style={styles.secondRowContainer}>
            <FlatList
              data={mockData}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(HighPressureEquipmentForm);
