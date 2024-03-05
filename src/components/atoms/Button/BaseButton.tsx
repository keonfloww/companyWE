import {ButtonProps} from '@rneui/themed';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {StyleSheet, Text} from 'react-native';

const BaseButton: FC<ButtonProps> = ({
  title = 'Button',
  color = 'primary',
  size = 'lg',
  titleStyle = {},
  containerStyle = {},
  disabled,
  ...args
}) => {
  const sizeSm = size == 'sm';
  return <Text>Button</Text>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 99,
    minWidth: scale(100),
  },
});
export default React.memo(BaseButton);
