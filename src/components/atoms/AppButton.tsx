import React from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from 'src/themes';
import {scale} from 'src/themes/mixins';
import AppText from './AppText';

interface AppTextProps {
  style?: ViewStyle;
  styleLabel?: TextStyle;
  text: string;
  numberOfLines?: number;
  onPress?: () => void;
  disabled?: boolean;
}

const AppButton: React.FC<AppTextProps> = ({
  style,
  text,
  numberOfLines = 1,
  styleLabel,
  onPress = () => {},
  disabled,
}) => {
  const buttonStyle = disabled ? styles.disabledButton : styles.button;

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled}>
      <AppText
        style={disabled ? styles.disabledText : styleLabel}
        text={text}
        numberOfLines={numberOfLines}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.appColor,
    alignItems: 'center',
    paddingVertical: scale(14),
    borderRadius: scale(12),
  },
  disabledButton: {
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    paddingVertical: scale(14),
    borderRadius: scale(12),
  },
  disabledText: {
    color: '#BDBDBD',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default AppButton;
