import CommonStyles from '@screens/styles';
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

  confirmTitle = '',
  cancelTitle = '',
  children,
}) => {
  return (
    <Modal
      deviceHeight={500}
      deviceWidth={500}
      visible={isShow}
      style={styles.container}
      onBackgroundPress={() => console.log('background pressed')}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          {headerIcon}
          <View style={{height: scale(10)}} />
        </View>

        {/* Body */}
        <View style={{}}>{children}</View>
        <View style={{height: scale(28)}} />

        {/* Actions */}
        <View style={styles.actionContainer}>
          <Button
            label={cancelTitle}
            onPress={onClose}
            style={{flex: 1}}
            labelStyle={CommonStyles.font.regular14}
            backgroundColor={'#50048A'}
          />
          <Button
            label={confirmTitle}
            onPress={onConfirm}
            style={{flex: 1}}
            labelStyle={CommonStyles.font.regular14}
            backgroundColor={'white'}
            outlineColor={'#50048A'}
            color={'#50048A'}
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
    columnGap: scale(12),
  },
});
