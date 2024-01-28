import SafeView from '@components/atoms/View/SafeView';
import {FlatList, Text, View} from 'react-native';
import MailRow from './components/MailRow';
import {scale} from '@utils/mixins';
import {useEffect, useState} from 'react';
import useInboxScreen from './hooks/useInboxScreen';
import usePagination from '@utils/hooks/usePagination';
import {Email} from '@models/mail/modelMail';
import CommonStyles from '@screens/styles';

const InboxScreen = () => {
  const {mailBoxFlatten, handleGetAllMailInConnectedMails} = useInboxScreen();
  const {data, nextPage, setPage} = usePagination<Email>(mailBoxFlatten);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // console.log('mailBoxFlatten?.length', mailBoxFlatten?.length);
  // console.log('data?.length', data?.length);

  useEffect(() => {
    handleGetAllMailInConnectedMails();
  }, []);
  return (
    <SafeView>
      <View
        style={{
          marginHorizontal: scale(20),
          paddingTop: scale(10),
        }}>
        {selectMode && (
          <Text style={CommonStyles.font.regular14}>
            {selectedIds?.length} Selected
          </Text>
        )}
      </View>
      <View style={{height: scale(10)}}></View>
      <FlatList
        onEndReached={nextPage}
        refreshing={false}
        onRefresh={() => {
          setPage(0);
          handleGetAllMailInConnectedMails();
        }}
        data={data}
        renderItem={({item}) => {
          return (
            <MailRow
              item={item}
              isSelectMode={selectMode}
              onSelectMode={() => setSelectMode(true)}
              onCancelSelectMode={() => {
                setSelectMode(false);
                setSelectedIds([]);
              }}
              onSelect={(id: string) => {
                if (selectedIds?.includes(id)) {
                  setSelectedIds(selectedIds?.filter(i => i != id));
                  return;
                }
                setSelectedIds(selectedIds?.concat(id));
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{height: scale(12)}} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeView>
  );
};

export default InboxScreen;
