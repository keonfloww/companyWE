import {RootStackParamList, Screen} from '@navigation/navigation.enums';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {FC, useMemo} from 'react';
import {atob} from 'react-native-quick-base64';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {ActivityIndicator, View, useWindowDimensions} from 'react-native';
import {scaleHeight} from '@utils/mixins';
import LayoutCustomHeader from '@layouts/default/LayoutCustomHeader';
import InboxDetailCustomHeader from '../components/InboxDetailCustomHeader';

const InboxDetailScreen: FC = () => {
  const {params} =
    useRoute<RouteProp<RootStackParamList, Screen.InboxDetailScreen>>();

  const computedMailBody = useMemo(() => {
    if (!params?.item?.body.data) {
      return '';
    }
    const computedBody = atob(params?.item?.body.data);
    return computedBody;
  }, []);
  const {height, width} = useWindowDimensions();

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
      <View style={{height: scaleHeight(75), backgroundColor: 'red'}}></View>
    </LayoutCustomHeader>
  );
};

export default React.memo(InboxDetailScreen);
