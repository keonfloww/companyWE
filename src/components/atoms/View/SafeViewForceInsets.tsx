import React, {FC, PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from 'react-native-ui-lib';

interface Props extends PropsWithChildren {
  isSafeBottom?: boolean;
  isSafeTop?: boolean;
  isHasHeaderTabBar: boolean;
}
const SafeViewForceInsets: FC<Props> = ({
  children,
  isSafeBottom = true,
  isSafeTop = true,
  isHasHeaderTabBar,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <SafeAreaView style={styles.header} />
      <SafeAreaView
        style={[
          styles.container,
          isSafeBottom
            ? {}
            : {
                marginBottom:
                  -insets.bottom - (isHasHeaderTabBar ? insets.top : 0),
              },
          isSafeTop
            ? {}
            : {
                marginTop: -insets.top,
              },
        ]}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default SafeViewForceInsets;

const styles = StyleSheet.create({
  header: {
    flex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
