import SafeView from '@components/atoms/View/SafeView';
import {FlatList, Text, View} from 'react-native';
import MailRow from './components/MailRow';
import {scale} from '@utils/mixins';
import {useState} from 'react';

const InboxScreen = () => {
  const [selectMode, setSelectMode] = useState<boolean>(false);

  return (
    <SafeView>
      <View style={{marginHorizontal: scale(20), paddingTop: scale(10)}}>
        <Text>3 Selected</Text>
      </View>
      <View style={{height: scale(10)}}></View>
      <FlatList
        data={Array(10)}
        renderItem={() => (
          <MailRow
            isSelectMode={selectMode}
            onSelectMode={() => setSelectMode(true)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{height: scale(12)}} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeView>
  );
};

export default InboxScreen;
