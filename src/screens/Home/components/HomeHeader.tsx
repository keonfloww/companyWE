import IMAGES from '@assets/images/images';
import BaseBookmarkSearchActions from '@components/atoms/HeaderActions/BaseBookmarkSearchActions';
import {Screen} from '@navigation/navigation.enums';
import navigationService from '@services/navigationService';
import {scale} from '@utils/mixins';
import React, {FC} from 'react';
import {View} from 'react-native';

const HomeHeader: FC = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <IMAGES.icAppLogo />
        <View style={{width: scale(7)}} />
        <IMAGES.icAppLogoText />
      </View>
      <BaseBookmarkSearchActions
        onPressBookMark={() => {
          console.log('onPressBookMark');
        }}
        onPressSearch={() => {
          navigationService.navigate(Screen.SearchScreen);
        }}
      />
    </View>
  );
};

export default React.memo(HomeHeader);
