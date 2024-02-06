import React from 'react';
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

const ProfileConnectedMailScreen = () => {
  const {connectedMails} = useProfileConnectedMail();
  const {onGoogleLinkButtonPress} = useAuthProvider();

  return (
    <SafeView>
      <View style={CommonStyles.view.viewLayout}>
        <Text>Your connected email accounts</Text>
        <Text> Lorem ipsum dolor sit amet, consectetur adipiscing .</Text>
        <View style={{height: scale(23)}} />
        <FlatList
          data={connectedMails}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <BaseRowIconLabel
                  prefixIcon={
                    <FastImage
                      style={{width: 25, height: 25}}
                      resizeMode={'contain'}
                      source={IMAGES.icGoogleSrc}
                    />
                  }
                  titleNode={
                    <View>
                      <Text>{'Google'}</Text>
                      <Text>{item?.email}</Text>
                    </View>
                  }
                />
                <BaseButton title={'Disconnect'} />
              </View>
            );
          }}
          ListFooterComponentStyle={{marginTop: scale(15)}}
          ListFooterComponent={
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
          }
          ItemSeparatorComponent={() => <View style={{height: scale(23)}} />}
        />
      </View>
    </SafeView>
  );
};

export default ProfileConnectedMailScreen;
