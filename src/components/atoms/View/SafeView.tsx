import React, {FC, PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib';

interface Props extends PropsWithChildren {
  unSafeBackgroundColor: string;
}
const SafeView: FC<Props> = ({children, unSafeBackgroundColor = 'red'}) => {
  return (
    <>
      <SafeAreaView
        style={[styles.header, {backgroundColor: unSafeBackgroundColor}]}
      />
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </>
  );
};

export default SafeView;

const styles = StyleSheet.create({
  header: {
    flex: 0,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
