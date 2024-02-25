import {RootStackParamList, Screen} from '@navigation/navigation.enums';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {FC, useMemo} from 'react';
import {atob} from 'react-native-quick-base64';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {scale, scaleHeight} from '@utils/mixins';
import LayoutCustomHeader from '@layouts/default/LayoutCustomHeader';
import InboxDetailCustomHeader from '../components/InboxDetailCustomHeader';
import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import useColors from '@utils/hooks/useColors';
import {Colors} from 'react-native-ui-lib';
import useMailItem from '../hooks/useMailItem';

const InboxDetailScreen: FC = () => {
  const {params} =
    useRoute<RouteProp<RootStackParamList, Screen.InboxDetailScreen>>();

  const _styles = useColors(styles);

  const computedMailBody = useMemo(() => {
    if (!params?.item?.body.data) {
      return '';
    }
    const computedBody = atob(params?.item?.body.data);
    return computedBody;
  }, []);
  const {height, width} = useWindowDimensions();
  const {isBookMark, handleMarkBookMark} = useMailItem({item: params?.item});
  return (
    <LayoutCustomHeader
      customHeader={<InboxDetailCustomHeader item={params?.item} />}>
      <AutoHeightWebView
        startInLoadingState={true}
        renderLoading={() => <ActivityIndicator />}
        showsVerticalScrollIndicator={false}
        originWhitelist={['*']}
        customStyle={`
          div {
            word-wrap: break-word;
            white-space: -moz-pre-wrap;
            // white-space: pre-wrap;
          }
          // img {
          //   max-width: ${width}px;
          // }
          `}
        style={{height: height, width, flex: 1}}
        source={{html: computedMailBody}}
        scalesPageToFit={true}
      />
      <View style={_styles.bottomActionContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleMarkBookMark}>
          <IMAGES.icBookMark
            {...CommonStyles.icon.icon24}
            color={isBookMark ? '#50048A' : '#3C3C3C'}
            fill={isBookMark ? '#50048A' : 'transparent'}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <IMAGES.icShare {...CommonStyles.icon.icon24} color={'#3C3C3C'} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <IMAGES.icGlobe {...CommonStyles.icon.icon24} color={'#3C3C3C'} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <IMAGES.icMeatBall {...CommonStyles.icon.icon24} color={'#3C3C3C'} />
        </TouchableOpacity>
      </View>
    </LayoutCustomHeader>
  );
};

export default React.memo(InboxDetailScreen);

const styles = StyleSheet.create({
  bottomActionContainer: {
    height: scaleHeight(50),
    backgroundColor: 'white',
    borderTopColor: Colors.borderAvatar,
    borderTopWidth: scale(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(52),
  },
});
