import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import {colors} from 'src/themes';

interface AppTextProps {
  style?: TextStyle;
  text: string;
  numberOfLines?: number;
}

const AppText: React.FC<AppTextProps> = ({style, text, numberOfLines = 1}) => {
  return (
    <Text style={[styles.text, style]} numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default AppText;
