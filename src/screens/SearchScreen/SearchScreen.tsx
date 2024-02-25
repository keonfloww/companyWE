import LayoutCustomHeader from '@layouts/default/LayoutCustomHeader';
import {CUSTOM_HEADER_HEIGHT, scale} from '@utils/mixins';
import React, {FC, useMemo} from 'react';
import {FlatList, View, useWindowDimensions} from 'react-native';
import CommonStyles from '../styles';
import useSearchScreen from './hooks/useSearchScreen';
import SearchHistoryItem from './components/SearchHistoryItem';
import SearchScreenCategoryFooter from './components/SearchScreenCategoryFooter';
import SearchScreenHeader from './components/SearchScreenHeader';
import SearchHistoryEmpty from './components/SearchHistoryEmpty';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SearchHistoryHeader from './components/SearchHistoryHeader';
import MailRow from '@screens/Inbox/components/MailRow';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '@services/statusBarService';

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
  const BOTTOM_HEIGHT = scale(300);

  const isShowSearchResult = useMemo(() => {
    return !!searchContent;
  }, [searchContent]);

  return (
    <LayoutCustomHeader
      styleCustomHeader={{height: CUSTOM_HEADER_HEIGHT}}
      containerStyle={{alignItems: 'center'}}
      customHeader={
        <SearchScreenHeader
          onSubmitSearch={(_: string) => {
            handleSearch({
              keyword: _,
            });
          }}
        />
      }>
      <FocusAwareStatusBar
        backgroundColor={'white'}
        barStyle={'dark-content'}
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
                  onPress={() => handleSearch({keyword: item})}
                  onRemoveSingleHistory={() => {
                    handleRemoveSearchHistory({keyword: item});
                  }}
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={{height: scale(10)}} />}
            ListEmptyComponent={<SearchHistoryEmpty />}
          />
        )}
        {/* RESULTS */}
        {isShowSearchResult && (
          <FlatList
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
            style={[
              CommonStyles.view.viewLayout,

              {
                marginRight: 20,
                height: screen.height - BOTTOM_HEIGHT,
              },
            ]}
            stickyHeaderHiddenOnScroll={true}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={
              <SearchHistoryHeader title={'Search Results'} />
            }
            data={searchResultList}
            renderItem={({item}) => {
              return (
                <MailRow
                  isReadOnly={true}
                  isClearPaddingDefault={true}
                  item={item}
                  isSelectMode={false}
                  onSelectMode={() => {}}
                  onCancelSelectMode={() => {}}
                  onSelect={(id: string) => {}}
                  onDelete={() => {}}
                />
              );
            }}
            ItemSeparatorComponent={() => <View style={{height: scale(10)}} />}
            ListEmptyComponent={<SearchHistoryEmpty />}
          />
        )}

        <View
          style={[
            CommonStyles.view.viewLayout,
            {marginTop: 0, marginRight: 0, height: BOTTOM_HEIGHT},
          ]}>
          <SearchScreenCategoryFooter categoryList={categoryList} />
        </View>
      </KeyboardAwareScrollView>
    </LayoutCustomHeader>
  );
};

export default React.memo(SearchScreen);
