import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

const HeaderBackgroundDefault = () => {
  return (
    <></>
    // <LinearGradient
    //   start={{x: 0.0, y: 0.25}}
    //   end={{x: 0.0, y: 0.8}}
    //   colors={['#3b5998', '#FFFFFF']}
    //   style={styles.linearGradient}
    // />
  );
};

export default HeaderBackgroundDefault;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
});
