import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import i18next from 'i18next';
import IMAGES from '@assets/images/images';
import CommonStyles from '@screens/styles';
import {scale} from '@utils/mixins';

interface Props {
  styleExtend?: any;
  content?: string;
}
const EmptyContent: React.FC<Props> = ({styleExtend, content = null}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        alignContent: 'center',
      }}>
      <IMAGES.icEmpty />
      <Text style={[styles.text, styleExtend]}>
        {content ?? i18next.t('common:notAnyData')}
      </Text>
    </View>
  );
};

export default EmptyContent;

const styles = StyleSheet.create({
  text: {
    marginTop: scale(42),
    textAlign: 'center',
    ...CommonStyles.font.bold24,
  },
});
