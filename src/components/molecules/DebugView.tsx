import {FAB} from '@rneui/base';
import {scale} from '@utils/mixins';
import {TVoidCallback, VoidCallBack} from '@utils/typeUtils';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import NetworkLogger from 'react-native-network-logger';
import {RootSiblingPortal} from 'react-native-root-siblings';

interface Props {
  showNetwork: boolean;
  handleShowNetwork: TVoidCallback;
}
const DebugView = ({showNetwork, handleShowNetwork = VoidCallBack}: Props) => {
  return (
    <>
      <View style={styles.containerDebug}>
        <FAB title={''} onPress={handleShowNetwork} size="small" />
      </View>
      {showNetwork && (
        <RootSiblingPortal>
          <View style={[StyleSheet.absoluteFill, styles.containerNetworkDebug]}>
            <NetworkLogger />
          </View>
        </RootSiblingPortal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerDebug: {
    position: 'absolute',
    // height: scale(50),
    bottom: scale(80),
    right: scale(5),
    opacity: 0.3,
  },
  containerNetworkDebug: {
    height: '50%',
    width: '100%',
    opacity: 0.9,
    position: 'absolute',
    top: scale(80),
  },
});

export default React.memo(DebugView);
