import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

interface LoadingProps {
  show: boolean;
}

const Loading: React.FC<LoadingProps> = ({show}) => {
  if (!show) {
    return null;
  }

  return (
    <View style={[StyleSheet.absoluteFill, styles.container]}>
      <View style={styles.content}>
        <ActivityIndicator size="large" color={'#50048A'} />
      </View>
    </View>
  );
};
export default memo(Loading);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity: 0.5,
  },
});
