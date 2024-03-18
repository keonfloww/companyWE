import CommonStyles from '@screens/styles';
import {colors} from 'src/themes';
import {scale} from '@utils/mixins';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {Button} from 'react-native-ui-lib';

const BaseModal = ({
  isShow = false,
  headerIcon = <></>,
  onClose = () => {},
  onConfirm = () => {},
  actionViewStyle = {},
  buttonContainerStyle = {},
  headerShown = true,
  confirmTitle = '',
  cancelTitle = '',
  children,
  backdropOpacity = 0.5,
  // animationOut = 'slideOutDown',
  // animationOutTiming = 500,
}) => {
  return (
    <Modal
      // deviceHeight={500}
      animationOut={'fadeOut'}
      animationOutTiming={0.1}
      deviceWidth={500}
      isVisible={isShow}
      style={styles.container}
      backdropOpacity={backdropOpacity}
      onBackgroundPress={() => console.log('background pressed')}>
      <View style={styles.content}>
        {/* Header */}
        {headerShown && (
          <View style={styles.header}>
            {headerIcon}
            <View style={{height: scale(10)}} />
          </View>
        )}

        {/* Body */}
        <View style={{}}>{children}</View>
        <View style={{height: scale(28)}} />

        {/* Actions */}
        <View
          style={[
            styles.actionContainer,
            actionViewStyle ? actionViewStyle : {},
          ]}>
          <Button
            label={cancelTitle}
            onPress={onClose}
            style={[
              {flex: 1, paddingHorizontal: 0},
              buttonContainerStyle ? buttonContainerStyle : {},
            ]}
            labelStyle={[
              CommonStyles.font.regular14,
              {overflow: 'visible', color: colors.appColor},
            ]}
            backgroundColor={'white'}
            color={'#50048A'}
          />
          <Button
            label={confirmTitle}
            onPress={onConfirm}
            style={[
              {flex: 1, paddingHorizontal: 0, borderRadius: 8},
              buttonContainerStyle ? buttonContainerStyle : {},
            ]}
            labelStyle={[CommonStyles.font.regular14, {overflow: 'visible'}]}
            backgroundColor={colors.appColor}
          />
        </View>
      </View>
    </Modal>
  );
};

export default React.memo(BaseModal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'white',
    width: '95%',
    borderRadius: scale(20),
    overflow: 'hidden',
    padding: scale(24),
  },
  header: {
    minHeight: scale(82),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: scale(8),
    height: scale(40),
  },
});
