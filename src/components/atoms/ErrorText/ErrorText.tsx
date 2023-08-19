import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ErrorProps {
  message?: string;
  isCenter?: boolean;
  numberOfLines?: number;
}

const ErrorText: React.FC<ErrorProps> = ({
  message,
  isCenter,
  numberOfLines = 3,
}) => {
  return (
    <View style={[styles.container, isCenter && styles.center]}>
      {!!message && (
        <Text numberOfLines={numberOfLines} style={[styles.error]}>
          {message}
        </Text>
      )}
    </View>
  );
};

export default memo(ErrorText);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  error: {},
  center: {
    alignItems: 'center',
  },
});
