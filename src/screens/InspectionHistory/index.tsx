import React, {useCallback, useState} from 'react';
import type {FC} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import {t} from 'i18next';
import {Calendar, CalendarUtils, LocaleConfig} from 'react-native-calendars';
import DateUtils from '@utils/dateUtils';
import Divider from '@components/atoms/Divider/Divider';
import {
  ISituationTranslationColor,
  ISituationTranslationText,
} from 'src/models/inspectionStatus/inspectionStatus';
import IMAGES from '@assets/images/images';
import colors from 'react-native-ui-lib/src/style/colors';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import {scale} from '@utils/mixins';

const InspectionHistoryScreen: FC<any> = () => {
  const INITIAL_DATE = '2024-03-06';
  LocaleConfig.locales.en = {
    monthNames:
      'January_February_March_April_May_June_July_August_September_October_November_December'.split(
        '_',
      ),
    monthNamesShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
      '_',
    ),
    dayNames: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
      '_',
    ),
    dayNamesShort: 'S_M_T_W_T_F_S'.split('_'),
    today: 'Today',
  };

  LocaleConfig.defaultLocale = 'en';

  const mockData = [
    {
      id: 1,
      date: '2024-03-06',
      inspectionStatus: 1,
      detail: '설비장애',
    },
    {
      id: 2,
      date: '2024-03-06',
      inspectionStatus: 2,
      detail: '설비장애',
    },
    {
      id: 3,
      date: '2024-03-06',
      inspectionStatus: 3,
      detail: '설비장애',
    },
    {
      id: 4,
      date: '2024-03-07',
      inspectionStatus: 1,
      detail: '설비장애',
    },
    {
      id: 5,
      date: '2024-03-07',
      inspectionStatus: 2,
      detail: '설비장애',
    },
  ];

  const renderInspectionStatus = (status: number) => {
    return (
      <View style={styles.inspectionStatusContainer}>
        <View
          style={[
            styles.numberContainer,
            {backgroundColor: ISituationTranslationColor[status]},
          ]}>
          <Text style={styles.numberText}>3</Text>
        </View>
        <Text>{ISituationTranslationText[status]}</Text>
      </View>
    );
  };

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.textHeader}>{t('점검 이력관리 ')}</Text>
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={() => {}}>
            <IMAGES.icMoreOptions color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const markedDates: {
    [date: string]: {
      dots: {key: string; color: string; selectedDotColor: string}[];
    };
  } = {};

  const getColorByStatus = (status: number) => {
    switch (status) {
      case 1:
        return 'blue';
      case 2:
        return 'red';
      case 3:
        return 'green';
      default:
        return 'black';
    }
  };

  const getSelectedDotColorByStatus = (status: number) => {
    switch (status) {
      case 1:
        return 'red';
      case 2:
        return 'white';
      case 3:
        return 'blue';
      default:
        return 'black';
    }
  };

  mockData.forEach(item => {
    const {date, inspectionStatus} = item;
    if (!markedDates[date]) {
      markedDates[date] = {
        dots: [],
      };
    }
    markedDates[date].dots.push({
      key: inspectionStatus.toString(),
      color: getColorByStatus(inspectionStatus),
      selectedDotColor: getSelectedDotColorByStatus(inspectionStatus),
    });
  });

  const renderItem = (item: any) => {
    const data = item.item;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.renderItemContainer}
        onPress={() => {}}>
        <Text style={[styles.bodyListText, styles.numberListText]}>
          {data.id}
        </Text>
        <Text style={styles.bodyListText}>
          {moment(data.date).format('MM/DD')}
        </Text>
        <Text
          style={[
            styles.bodyListText,
            {color: ISituationTranslationColor[data.inspectionStatus]},
          ]}>
          {ISituationTranslationText[data.inspectionStatus]}
        </Text>
        <Text style={styles.bodyListText}>{data.detail}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderHeader()}
        <View style={styles.viewContainer}>
          <Text style={styles.titleText}>{t('도도익산')}</Text>
          <View style={styles.calendarInformationContainer}>
            <Text style={styles.calendarInformationText}>
              {t('2023.4 (8)')}
            </Text>
            {renderInspectionStatus(1)}
            {renderInspectionStatus(2)}
            {renderInspectionStatus(3)}
          </View>
          <Divider color={'#F3F3F4'} />
          <Calendar
            style={styles.calendar}
            current={INITIAL_DATE}
            markingType={'multi-dot'}
            customHeaderTitle={<></>}
            allowDisabledSelection={true}
            disableAllTouchEventsForDisabledDays={true}
            disableAllTouchEventsForInactiveDays={true}
            hideArrows={true}
            style={styles.calendarContainer}
            markedDates={markedDates}
          />
        </View>
        <View style={styles.listViewContainer}>
          <View style={styles.listContainer}>
            <Text style={[styles.noText, styles.numberListText]}>
              {t('No.')}
            </Text>
            <Text style={styles.noText}>{t('일자')}</Text>
            <Text style={styles.noText}>{t('상태')}</Text>
            <Text style={styles.noText}>{t('내용')}</Text>
          </View>
          <Divider color={'#F3F3F4'} />
          <FlatList
            data={mockData}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InspectionHistoryScreen;
