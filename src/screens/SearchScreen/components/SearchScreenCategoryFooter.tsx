import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

interface Props {
  categoryList: any[];
}
const SearchScreenCategoryFooter: FC<Props> = ({categoryList = []}) => {
  return (
    <View style={{}}>
      <View>
        <Text style={CommonStyles.font.bold14}>{'Your Categories'}</Text>
      </View>
      <View style={{height: scale(10)}} />
      <FlatList
        contentContainerStyle={{
          paddingVertical: scale(1),
          paddingRight: scale(20),
        }}
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: scale(10)}} />}
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                flex: 1,
              }}>
              <TouchableOpacity activeOpacity={0.7}>
                <View
                  style={{
                    width: scale(100),
                    height: scale(100),
                    borderColor: '#50048A',
                    borderWidth: scale(1),
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: scale(5),
                  }}>
                  {item?.icon()}
                  <View style={{height: scale(15)}} />
                  <Text
                    style={[CommonStyles.font.regular12, {color: '#3c3c3c'}]}>
                    {item?.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(_: any, index: any) => index}
      />
    </View>
  );
};

export default React.memo(SearchScreenCategoryFooter);
