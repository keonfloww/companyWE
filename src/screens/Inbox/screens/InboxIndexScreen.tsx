import SafeView from '@components/atoms/View/SafeView';
import {RefreshControl, Text, View} from 'react-native';
import {scale} from '@utils/mixins';
import React, {useCallback, useEffect, useState} from 'react';
import usePagination from '@utils/hooks/usePagination';
import {Email} from '@models/mail/modelMail';
import CommonStyles from '@screens/styles';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import Animated, {LinearTransition} from 'react-native-reanimated';
import BaseModal from '@components/atoms/Modal/BaseModal';
import IMAGES from '@assets/images/images';
import {t} from 'i18next';
import EmptyContent from '@components/atoms/EmptyDataText/EmptyDataText';
import useInboxScreen from '../hooks/useInboxScreen';
import useInboxScreenAction from '../hooks/useInboxScreenAction';
import MailRow from '../components/MailRow';
import DeleteMailFloatingButton from '../components/DeleteMailFloatingButton';
import FocusAwareStatusBar from '@services/statusBarService';

const InboxIndexScreen = () => {
  const navigation = useNavigation();
  const {
    mailBoxFlatten,

    mailCountUnread,
    handleInboxTriggerSyncNewItem,
  } = useInboxScreen();
  const {handleMarkDeletedMany} = useInboxScreenAction();
  const [
    isShowModalConfirmDeleteSelectedMail,
    setIsShowModalConfirmDeleteSelectedMail,
  ] = useState<boolean>(false);

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
      <FocusAwareStatusBar
        backgroundColor={'#50048A'}
        barStyle={'light-content'}
      />
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
        refreshControl={
          <RefreshControl
            tintColor={'#50048A'}
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              handleInboxTriggerSyncNewItem();
              // WARNING: NOTICE THE DUPLICATE PROCESS
              setTimeout(() => {
                setRefreshing(false);
              }, 1000);
            }}
          />
        }
        contentContainerStyle={!data?.length ? style.listEmptyStyle : {}}
        itemLayoutAnimation={LinearTransition.damping(10)}
        onEndReachedThreshold={0.7}
        onEndReached={nextPage}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          handleInboxTriggerSyncNewItem();
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
              onDelete={(id: string) => {
                if (selectedIds?.includes(id)) {
                  setSelectedIds(selectedIds?.filter(i => i != id));
                  return;
                }
                setSelectedIds(selectedIds?.concat(id));
                setIsShowModalConfirmDeleteSelectedMail(true);
              }}
              onSelectMode={() => setSelectMode(true)}
              onCancelSelectMode={resetSelectionMode}
              onSelect={(id: string) => {
                if (selectedIds?.includes(id)) {
                  setSelectedIds(selectedIds?.filter(i => i != id));
                  return;
                }
                setSelectedIds(selectedIds?.concat(id));
              }}
              isReadOnly={false}
              isClearPaddingDefault={false}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{height: scale(12)}} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyContent />}
      />
      <DeleteMailFloatingButton
        visible={selectMode}
        onDelete={() => {
          setIsShowModalConfirmDeleteSelectedMail(true);
        }}
        onCancel={() => {
          setSelectMode(false);
          resetSelectionMode();
        }}
      />
      <BaseModal
        isShow={isShowModalConfirmDeleteSelectedMail}
        headerIcon={<IMAGES.icTrash color={'#E74C3C'} />}
        confirmTitle={t('Yes, I am sure')}
        cancelTitle={t('No')}
        actionViewStyle={{height: scale(40)}}
        buttonContainerStyle={{paddingVertical: scale(0)}}
        onClose={() => {
          setIsShowModalConfirmDeleteSelectedMail(false);
        }}
        onConfirm={() => {
          setIsShowModalConfirmDeleteSelectedMail(false);
          console.log('selectedIds', selectedIds);
          handleMarkDeletedMany(selectedIds);
          resetSelectionMode();
        }}>
        <Text
          style={{
            ...CommonStyles.font.bold24,
            ...style.text,
            textAlign: 'center',
          }}>
          {t(`Are you sure you want to delete?`)}
        </Text>
        <View style={{height: scale(16)}} />
        <Text
          style={{
            ...CommonStyles.font.regular14,
            ...style.text,
            textAlign: 'center',
          }}>
          {t(
            `Deleting will remove this email from your Inbox. This action cannot be undone.`,
          )}
        </Text>
      </BaseModal>
    </SafeView>
  );
};

export default React.memo(InboxIndexScreen);

const style = StyleSheet.create({
  text: {
    color: '#3c3c3c',
  },
  listEmptyStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
