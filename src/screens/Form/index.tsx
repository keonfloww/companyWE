import React, {useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import LowPressureEquipmentForm from '@components/organisms/lowPressureEquipmentForm';
import IMAGES from '@assets/images/images';
import BasicForm from '@components/organisms/basicForm';
import HistoryManagementForm from '@components/organisms/historyManagementForm';
import HighPressureEquipmentForm from '@components/organisms/highPressureEquipmentForm';
import OtherInspectionForm from '@components/organisms/otherInspectionForm';
import Collapsible from 'react-native-collapsible';
import {colors} from 'src/themes';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import InverterForm from '@components/organisms/inverterForm';
import MonthHistoryForm from '@components/organisms/monthHistoryForm';
import CustomerComponent from '@components/organisms/customer';
import ImageShow from '@components/organisms/imageShow';
import {t} from 'i18next';

const FormScreen: React.FC = () => {
  const [openLowPressure, setOpenLowPressure] = useState(true);
  const [openHighPressure, setOpenHighPressure] = useState(true);
  const [openOtherInspection, setOpenOtherInspection] = useState(true);
  const [openInverter, setOpenInverter] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <HistoryManagementForm />
        <BasicForm />
        <MonthHistoryForm />

        <View style={styles.tabBarContainer}>
          <TouchableOpacity
            onPress={() => setOpenLowPressure(!openLowPressure)}>
            <View style={styles.collapsibleContainer}>
              <View style={styles.flexRow}>
                <Image source={IMAGES.icAutoFit} tintColor={colors.black} />
                <Text>{t('저압설비')}</Text>
              </View>
              {!openLowPressure ? (
                <Image source={IMAGES.icArrowDown} />
              ) : (
                <Image source={IMAGES.icArrowUp} />
              )}
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={!openLowPressure}>
            <LowPressureEquipmentForm />
          </Collapsible>
        </View>

        <View style={styles.tabBarContainer}>
          <TouchableOpacity
            onPress={() => setOpenHighPressure(!openHighPressure)}>
            <View style={styles.collapsibleContainer}>
              <View style={styles.flexRow}>
                <Image
                  source={IMAGES.icArrowsBidirectional}
                  tintColor={colors.black}
                />
                <Text>{t('고압설비')}</Text>
              </View>
              {!openHighPressure ? (
                <Image source={IMAGES.icArrowDown} />
              ) : (
                <Image source={IMAGES.icArrowUp} />
              )}
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={!openHighPressure}>
            <View>
              <HighPressureEquipmentForm />
            </View>
          </Collapsible>
        </View>

        <View style={styles.tabBarContainer}>
          <TouchableOpacity
            onPress={() => setOpenOtherInspection(!openOtherInspection)}>
            <View style={styles.collapsibleContainer}>
              <View style={styles.flexRow}>
                <Image source={IMAGES.icToolbox} tintColor={colors.black} />
                <Text>{t('기타점검')}</Text>
              </View>
              {!openOtherInspection ? (
                <Image source={IMAGES.icArrowDown} />
              ) : (
                <Image source={IMAGES.icArrowUp} />
              )}
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={!openOtherInspection}>
            <OtherInspectionForm />
          </Collapsible>
        </View>

        <View style={styles.tabBarContainer}>
          <TouchableOpacity onPress={() => setOpenInverter(!openInverter)}>
            <View style={styles.collapsibleContainer}>
              <View style={styles.flexRow}>
                <Image source={IMAGES.icInverter} tintColor={colors.black} />
                <Text>{t('인버터')}</Text>
              </View>
              {!openInverter ? (
                <Image source={IMAGES.icArrowDown} />
              ) : (
                <Image source={IMAGES.icArrowUp} />
              )}
            </View>
          </TouchableOpacity>
          <Collapsible collapsed={!openInverter}>
            <InverterForm />
          </Collapsible>
        </View>

        <CustomerComponent />
        <ImageShow />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default FormScreen;
