import {Button} from '@rneui/base';
import {ButtonProps} from '@rneui/themed';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const BaseButton: FC<ButtonProps> = ({
  title = 'Button',
  color = 'primary',
  size = 'lg',
  titleStyle = {},
  containerStyle = {},
  ...args
}) => {
  const sizeSm = size == 'sm';
  return (
    <Button
      activeOpacity={0.8}
      linearGradientProps={{
        colors: ['#9A32EB', '#50048A'],
        start: {x: 1, y: sizeSm ? 1 : 1},
        end: {x: 1, y: sizeSm ? 0.45 : 0.3},
      }}
      ViewComponent={LinearGradient} // Don't forget this!
      size={size}
      title={title}
      titleStyle={[
        sizeSm ? CommonStyles.font.buttonText14 : {},
        titleStyle ? titleStyle : {},
      ]}
      color={'#50048A'}
      {...args}
      containerStyle={[styles.container, containerStyle]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 99,
    minWidth: scale(100),
  },
});
export default React.memo(BaseButton);
