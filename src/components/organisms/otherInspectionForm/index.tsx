import React, {memo} from 'react';
import styles from './styles';
import {Text, View} from 'react-native';
import {t} from 'i18next';
import TextInputComponent from '@components/molecules/textInput';

const OtherInspectionForm: React.FC = () => {
  return (
    <View style={styles.container}>
      <TextInputComponent
        placeholder={'이상없음'}
        value={'이상없음'}
        secureTextEntry={false}
        editable={false}
        title={t('DC 접속반 내 차단기, 배선, 퓨즈 상태 점검')}
      />
      <View style={styles.marginText} />
      <TextInputComponent
        placeholder={'이상없음'}
        value={'이상없음'}
        secureTextEntry={false}
        editable={false}
        title={t(
          '인버터 가동상태, 입/줄력상태, 이상소음 및 온도 점검, 모듈 어레이',
        )}
      />
      <Text style={styles.titleText}>
        {t(
          '발전 중 이상개소 발생 시나 의문사항이 있으면 당사로 연락주시기 바랍니다.',
        )}
      </Text>
    </View>
  );
};

export default memo(OtherInspectionForm);
