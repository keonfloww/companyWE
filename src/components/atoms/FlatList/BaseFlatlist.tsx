import CommonStyles from '@screens/styles';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import EmptyDataText from '../EmptyDataText/EmptyDataText';
import {TVoidCallback} from '@utils/typeUtils';
import React from 'react';
import {StyleSheet} from 'react-native';
import {scale} from '@utils/mixins';

interface Props<T> {
  data: T[];
  isLoading?: boolean;
  isEnd?: boolean;

  ItemSeparatorComponent?: React.ComponentType<any> | Element;
  renderItem: ListRenderItem<any>;
  onEndReached: TVoidCallback;
  onRefresh: TVoidCallback;
}
const BaseFlatList = ({
  data = [],
  isLoading = false,
  isEnd = false,
  ItemSeparatorComponent,
  refreshControl = <RefreshControl refreshing={false} onRefresh={onRefresh} />,
  ListFooterComponent = <ActivityIndicator style={styles.bottomIndicator} />,
  ListEmptyComponent = <EmptyDataText />,
  keyExtractor,
  renderItem,
  onEndReached,
  onRefresh,
}: Props<any> & FlatListProps<any>) => {
  return (
    <>
      <FlatList
        contentContainerStyle={CommonStyles.view.viewLayout}
        refreshControl={refreshControl}
        ListEmptyComponent={isLoading ? <></> : ListEmptyComponent}
        stickyHeaderHiddenOnScroll={true}
        bounces={true}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        initialNumToRender={15}
        maxToRenderPerBatch={100}
        updateCellsBatchingPeriod={50}
        onEndReached={onEndReached}
        data={data}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent ?? <></>}
        ListFooterComponent={isEnd ? <></> : ListFooterComponent}
        scrollEventThrottle={200}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bottomIndicator: {
    marginVertical: scale(25),
  },
});

export default React.memo(BaseFlatList);
