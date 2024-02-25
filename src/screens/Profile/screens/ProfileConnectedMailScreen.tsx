import React, {useEffect} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import useProfileConnectedMail from '../hooks/useProfileConnectedMail';
import SafeView from '@components/atoms/View/SafeView';
import {Text} from 'react-native-ui-lib';
import {scale} from '@utils/mixins';
import CommonStyles from '@screens/styles';
import BaseRowIconLabel from '@components/atoms/Row/BaseRowIconLabel';
import FastImage from 'react-native-fast-image';
import IMAGES from '@assets/images/images';
import BaseButton from '@components/atoms/Button/BaseButton';
import useAuthProvider from '@utils/hooks/useAuthProvider';
import {safeString} from '@utils/stringUtils';
import useConnectMail from '@screens/ConnectMail/hooks/useConnectMail';

const ProfileConnectedMailScreen = () => {
  const {connectedMails, computeIsAbleToConnect} = useProfileConnectedMail();
  const {onGoogleLinkButtonPress} = useAuthProvider();
  const {} = useConnectMail({autoRedirectToHome: false});

  return (
    <SafeView unSafeBackgroundColor="white">
      <View style={CommonStyles.view.viewLayout}>
        <Text>
          {
            'Your connected email accounts\nLorem ipsum dolor sit amet, consectetur adipiscing.'
          }
        </Text>
        <View style={{height: scale(23)}} />
        <FlatList
          alwaysBounceVertical={false}
          overScrollMode="never"
          data={connectedMails}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1}}>
                  <BaseRowIconLabel
                    prefixIcon={
                      <FastImage
                        style={{width: 25, height: 25}}
                        resizeMode={'contain'}
                        source={IMAGES.icGoogleSrc}
                      />
                    }
                    titleNode={
                      <View style={{flex: 1}}>
                        <Text>{'Google'}</Text>
                        <Text numberOfLines={1}>{safeString(item?.email)}</Text>
                      </View>
                    }
                  />
                </View>
                <BaseButton title={'Disconnect'} disabled={true} />
              </View>
            );
          }}
          ListFooterComponentStyle={{
            marginTop: scale(computeIsAbleToConnect ? 15 : 0),
          }}
          ListFooterComponent={
            computeIsAbleToConnect ? (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onGoogleLinkButtonPress}>
                <BaseRowIconLabel
                  prefixIcon={<IMAGES.IcProfile color={'#3C3C3C'} />}
                  titleNode={
                    <View>
                      <Text>{'Connect another account'}</Text>
                    </View>
                  }
                />
              </TouchableOpacity>
            ) : (
              <></>
            )
          }
          ItemSeparatorComponent={() => <View style={{height: scale(23)}} />}
        />
      </View>
    </SafeView>
  );
};

export default ProfileConnectedMailScreen;
