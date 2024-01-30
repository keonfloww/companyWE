import SafeView from '@components/atoms/View/SafeView';
import {FlatList, Text, View} from 'react-native';
import MailRow from './components/MailRow';
import {scale} from '@utils/mixins';
import {useEffect, useState} from 'react';
import useInboxScreen from './hooks/useInboxScreen';
import usePagination from '@utils/hooks/usePagination';
import {Email} from '@models/mail/modelMail';
import CommonStyles from '@screens/styles';
import {useNavigation} from '@react-navigation/native';
import IMAGES from '@assets/images/images';
import BaseModal from '@components/atoms/Modal/BaseModal';
import {t} from 'i18next';

const InboxScreen = () => {
  const navigation = useNavigation();
  const {
    mailBoxFlatten,

    mailCountUnread,
    computedIsShowDeleteAfterSyncedMail,

    handleMoveMailToTrash,
    handleGetAllMailInConnectedMails,
    handleMarkAsAskedDelete,
  } = useInboxScreen();
  const {data, nextPage, setPage} = usePagination<Email>(mailBoxFlatten);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [isShowDeleteAfterSyncedMail, setIsShowDeleteAfterSyncedMail] =
    useState(false);
  // console.log('mailBoxFlatten?.length', mailBoxFlatten?.length);
  // console.log('data?.length', data?.length);

  useEffect(() => {
    handleGetAllMailInConnectedMails();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: mailCountUnread,
    });
  }, [navigation, mailCountUnread]);

  useEffect(() => {
    if (computedIsShowDeleteAfterSyncedMail) {
      setIsShowDeleteAfterSyncedMail(true);
    }
  }, [computedIsShowDeleteAfterSyncedMail]);

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
      <View style={{height: scale(10)}} />
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

      <BaseModal
        isShow={isShowDeleteAfterSyncedMail}
        headerIcon={<IMAGES.icTrash color={'#E74C3C'} />}
        confirmTitle={t('Yes, I am sure')}
        cancelTitle={t('No')}
        onClose={() => {
          handleMarkAsAskedDelete();
          setIsShowDeleteAfterSyncedMail(false);
        }}
        onConfirm={() => {
          setIsShowDeleteAfterSyncedMail(false);
          handleMoveMailToTrash();
        }}>
        <Text style={{...CommonStyles.font.bold26, textAlign: 'center'}}>
          {'Are you sure you want to delete?'}
        </Text>
        <View style={{height: scale(16)}} />
        <Text style={{...CommonStyles.font.regular14, textAlign: 'center'}}>
          Deleting will remove the emails from your Inbox. This action cannot be
          undone.
        </Text>
      </BaseModal>
    </SafeView>
  );
};

export default InboxScreen;
