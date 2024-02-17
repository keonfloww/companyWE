import SafeView from '@components/atoms/View/SafeView';
import {StatusBar, Text, View} from 'react-native';
import MailRow from './components/MailRow';
import {scale} from '@utils/mixins';
import React, {useCallback, useEffect, useState} from 'react';
import useInboxScreen from './hooks/useInboxScreen';
import usePagination from '@utils/hooks/usePagination';
import {Email} from '@models/mail/modelMail';
import CommonStyles from '@screens/styles';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import DeleteMailFloatingButton from './components/DeleteMailFloatingButton';
import useInboxScreenAction from './hooks/useInboxScreenAction';

const InboxScreen = () => {
  const navigation = useNavigation();
  const {
    mailBoxFlatten,

    mailCountUnread,
    handleInboxTriggerSyncNewItem,
  } = useInboxScreen();
  const {handleMarkDeletedMany} = useInboxScreenAction();

  const {data, nextPage} = usePagination<Email>(mailBoxFlatten);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [refreshing, setRefreshing] = useState(false);
  // console.log('mailBoxFlatten?.length', mailBoxFlatten?.length);
  // console.log('data?.length', data?.length);

  /**WARNING DONT CALL. Navigator has called it */
  // handleGetAllMailInConnectedMails();

  const resetSelectionMode = useCallback(() => {
    setSelectMode(false);
    setSelectedIds([]);
  }, []);
  useEffect(() => {
    if (mailCountUnread <= 0) {
      return;
    }
    navigation.setOptions({
      tabBarBadge: mailCountUnread,
    });
  }, [navigation, mailCountUnread]);

  return (
    <SafeView>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          marginHorizontal: scale(20),
          paddingTop: scale(10),
        }}>
        {selectMode && (
          <Text style={[CommonStyles.font.regular14, style.text]}>
            {selectedIds?.length} Selected
          </Text>
        )}
      </View>
      <View style={{height: scale(10)}} />
      <Animated.FlatList
        itemLayoutAnimation={LinearTransition.damping(10)}
        onEndReachedThreshold={0.7}
        onEndReached={nextPage}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          // handleInboxTriggerSyncNewItem();
          // WARNING: NOTICE THE DUPLICATE PROCESS
          setTimeout(() => {
            setRefreshing(false);
          }, 1000);
        }}
        data={data}
        keyExtractor={(item, index) => item?.metadata_id ?? index}
        renderItem={({item}) => {
          return (
            <MailRow
              item={item}
              isSelectMode={selectMode}
              onSelectMode={() => setSelectMode(true)}
              onCancelSelectMode={resetSelectionMode}
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
      <DeleteMailFloatingButton
        visible={selectMode}
        onDelete={() => {
          handleMarkDeletedMany(selectedIds);
          resetSelectionMode();
        }}
        onCancel={() => {
          setSelectMode(false);
          resetSelectionMode();
        }}
      />
    </SafeView>
  );
};

export default React.memo(InboxScreen);

const style = StyleSheet.create({
  text: {
    color: '#3c3c3c',
  },
});
