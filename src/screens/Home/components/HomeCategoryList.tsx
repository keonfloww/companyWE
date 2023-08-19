import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {FlatList, View, Text} from 'react-native';
import useHome from '../hooks/useHome';

const CategoryList: FC = () => {
  const {categoryList} = useHome();

  return (
    <View>
      <FlatList
        contentContainerStyle={{
          paddingVertical: scale(1),
          paddingHorizontal: scale(25),
          maxHeight: scale(74),
        }}
        data={categoryList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{width: scale(15)}} />}
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                flex: 1,
              }}>
              {item?.icon()}
              <View style={{height: scale(8)}}></View>
              <Text style={CommonStyles.font.regular12}>{item?.label}</Text>
            </View>
          );
        }}
        keyExtractor={(_: any, index: any) => index}
      />
    </View>
  );
};
export default React.memo(CategoryList);
