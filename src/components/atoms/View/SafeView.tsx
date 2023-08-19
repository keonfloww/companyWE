import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

const SafeView = (props: any) => {
  return (
    <>
      <SafeAreaView style={styles.header} />
      <SafeAreaView style={styles.container}>{props?.children}</SafeAreaView>
    </>
  );
};

export default SafeView;

const styles = StyleSheet.create({
  header: {
    flex: 0,
  },
  container: {
    flex: 1,
  },
});
