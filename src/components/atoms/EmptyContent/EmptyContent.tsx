import React from 'react';
import {StyleSheet, Text} from 'react-native';
import i18next from 'i18next';

interface EmptyDataTextProps {
  styleExtend?: any;
}
const EmptyDataText: React.FC<EmptyDataTextProps> = ({styleExtend}) => {
  return (
    <>
      <Text style={[styles.text, styleExtend]}>
        {i18next.t('common:notAnyData')}
      </Text>
    </>
  );
};

export default EmptyDataText;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlign: 'center',
  },
});
