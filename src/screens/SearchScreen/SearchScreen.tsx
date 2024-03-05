import IMAGES from '@assets/images/images';
import BaseModal from '@components/atoms/Modal/BaseModal';
import LayoutCustomHeader from '@layouts/default/LayoutCustomHeader';
import DeleteMailFloatingButton from '@screens/Inbox/components/DeleteMailFloatingButton';
import MailRow from '@screens/Inbox/components/MailRow';
import useInboxScreenAction from '@screens/Inbox/hooks/useInboxScreenAction';
import FocusAwareStatusBar from '@services/statusBarService';
import {CUSTOM_HEADER_HEIGHT, scale} from '@utils/mixins';
import {t} from 'i18next';
import React, {FC, useCallback, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CommonStyles from '../styles';
import SearchHistoryEmpty from './components/SearchHistoryEmpty';
import SearchHistoryHeader from './components/SearchHistoryHeader';
import SearchHistoryItem from './components/SearchHistoryItem';
import SearchScreenCategoryFooter from './components/SearchScreenCategoryFooter';
import SearchScreenHeader, {
  ImperativeHeaderSearchInput,
} from './components/SearchScreenHeader';
import useSearchScreen from './hooks/useSearchScreen';

const SearchScreen: FC<any> = () => {
  const {
    searchHistoryList,

    categoryList,

    searchContent,
    searchResultList,
    handleSearch,
    handleRemoveSearchHistory,
  } = useSearchScreen();
  const screen = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const BOTTOM_HEIGHT = scale(300);

  const isShowSearchResult = useMemo(() => {
    return !!searchContent;
  }, [searchContent]);
  const {handleMarkDeletedMany} = useInboxScreenAction();

  const refSearchScreenHeader = useRef<ImperativeHeaderSearchInput>(null);

  const [
    isShowModalConfirmDeleteSelectedMail,
    setIsShowModalConfirmDeleteSelectedMail,
  ] = useState<boolean>(false);
  const [selectMode, setSelectMode] = useState<boolean>(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const resetSelectionMode = useCallback(() => {
    setSelectMode(false);
    setSelectedIds([]);
  }, []);

  return (
    <LayoutCustomHeader
      darkTheme={true}
      styleCustomHeader={{height: CUSTOM_HEADER_HEIGHT}}
      containerStyle={{alignItems: 'center'}}
      customHeader={
        <SearchScreenHeader
          ref={refSearchScreenHeader}
          darkTheme={true}
          onSubmitSearch={(_: string, shouldSaveHistory = true) => {
            handleSearch({
              keyword: _,
              shouldSaveHistory,
            });
          }}
          onClearSearch={() => {
            handleSearch({
              keyword: '',
            });
          }}
        />
      }>
      <FocusAwareStatusBar
        backgroundColor={'#50048A'}
        barStyle={'light-content'}
      />
      <KeyboardAwareScrollView
        scrollEnabled={false}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        {/* SEARCH HISTORIES */}
        {!isShowSearchResult && (
          <FlatList
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
            style={[
              CommonStyles.view.viewLayout,

              {
                marginRight: 0,
                height: screen.height - BOTTOM_HEIGHT,
                // flex: 1,
              },
            ]}
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <SearchHistoryHeader title={'Recent Searches'} />
            }
            data={searchHistoryList}
            renderItem={({item}) => {
              return (
                <SearchHistoryItem
                  content={item}
                  onPress={() => {
                    handleSearch({keyword: item});
                    refSearchScreenHeader.current?.setValueFromQuickSearch(
                      item,
                    );
                  }}
                  onRemoveSingleHistory={() => {
                    handleRemoveSearchHistory({keyword: item});
                  }}
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={{height: scale(15)}} />}
            ListEmptyComponent={<SearchHistoryEmpty isSearched={false} />}
          />
        )}
        {/* RESULTS */}
        {isShowSearchResult && (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={[
              {
                height:
                  screen.height -
                  insets.bottom -
                  scale(Platform.OS == 'android' ? 90 : 100),
              },
            ]}
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <SearchHistoryHeader
                title={'Search Results'}
                containerStyle={{
                  marginBottom: scale(10),
                  paddingBottom: scale(5),
                  paddingTop: scale(10),
                  paddingHorizontal: scale(20),
                }}
              />
            }
            data={searchResultList}
            renderItem={({item}) => {
              return (
                <MailRow
                  isReadOnly={false}
                  isClearPaddingDefault={false}
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
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={{height: scale(10)}} />}
            ListEmptyComponent={<SearchHistoryEmpty isSearched={true} />}
          />
        )}
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
        {!isShowSearchResult && (
          <View
            style={[
              CommonStyles.view.viewLayout,
              {marginTop: 0, marginRight: 0, height: BOTTOM_HEIGHT},
            ]}>
            <SearchScreenCategoryFooter categoryList={categoryList} />
          </View>
        )}
      </KeyboardAwareScrollView>
    </LayoutCustomHeader>
  );
};

export default React.memo(SearchScreen);

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
