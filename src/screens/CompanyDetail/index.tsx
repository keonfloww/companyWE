import {FC, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import CardCompanyDetail from '@components/organisms/cardCompanyDetail';
import {t} from 'i18next';
import moment from 'moment';
import {
  ISituationTranslationColor,
  ISituationTranslationText,
} from 'src/models/situationCompany/situationCompany';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import BaseModal from '@components/atoms/Modal/BaseModal';
import {scale} from '@utils/mixins';
import IMAGES from '@assets/images/images';
import {Linking} from 'react-native';

/*
Show case the common component
or just for testing purpose */
const CompanyDetailScreen: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const mockData = {
    weather: {
      location: '전라남도 장흥군',
      temperatures: '10',
    },
    scheduledForMaintenance: '1',
    requestForInspection: '1',
    phoneCustomer: '+84989661750',
    recentInspection: [
      {
        id: 1,
        requestDate: '2011-10-10T14:48:00',
        detail: '설비 장애',
        situation: 1,
        requestPlannedDate: '23.11.22',
      },
      {
        id: 2,
        requestDate: '2011-10-10T15:24:00',
        detail: '설비 장애',
        situation: 2,
        requestPlannedDate: '23.11.22',
      },
      {
        id: 3,
        requestDate: '2011-10-10T16:48:00',
        detail: '설비 장애',
        situation: 3,
        requestPlannedDate: '23.11.22',
      },
    ],
  };

  const renderItemSituation = (situation: number) => {
    return (
      <View
        style={[
          styles.situationTextContainer,
          {backgroundColor: ISituationTranslationColor[situation]},
        ]}>
        <Text style={styles.situationText}>
          {ISituationTranslationText[situation]}
        </Text>
      </View>
    );
  };

  const renderItem = (item: any) => {
    const data = item.item;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
        style={[
          styles.renderItemContainer,
          {borderTopLeftRadius: item.index === 0 ? 12 : 0},
          {borderTopRightRadius: item.index === 0 ? 12 : 0},
          {
            borderBottomLeftRadius:
              item.index === mockData.recentInspection.length - 1 ? 12 : 0,
          },
          {
            borderBottomRightRadius:
              item.index === mockData.recentInspection.length - 1 ? 12 : 0,
          },
        ]}>
        <View style={styles.flex1}>
          <View style={styles.requestDateContainer}>
            <Text>{t('요청 날짜')}</Text>
            <Text style={styles.requestDateText}>
              {moment(data.requestDate).format('YY.MM.DD')}
              {t('화')}
            </Text>
          </View>
          <View style={styles.requestPlannedDateContainer}>
            <Text style={styles.requestDateTextContainer}>{t('상태')}</Text>
            {renderItemSituation(data.situation)}
          </View>
        </View>
        <View style={styles.flex1}>
          <View style={styles.requestDateContainer}>
            <Text>{t('요청 날짜')}</Text>
            <Text style={styles.requestDateText}>
              {moment(data.requestDate).format('YY.MM.DD')}
              {t('화')}
            </Text>
          </View>
          <View style={styles.requestPlannedDateContainer}>
            <Text style={styles.requestDateTextContainer}>
              {t('요청(예정)\n날짜')}
            </Text>
            <Text style={styles.requestDateText}>
              {data.requestPlannedDate}
              {t('목\n홍길동')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const modalChildren = (
    <View>
      <View style={styles.modalIcon}>
        <IMAGES.icPersonSupport />
      </View>
      <Text style={styles.modalText}>
        {t('고객센터에 전화 연결 하시겠습니까?')}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <CardCompanyDetail data={mockData} />
        <Text style={styles.recentInspectionText}>
          {t('최근 점검 현황')}({mockData.recentInspection.length})
        </Text>
        <FlatList
          data={mockData.recentInspection}
          renderItem={renderItem}
          scrollEnabled={false}
        />
        <BaseModal
          isShow={modalVisible}
          headerShown={false}
          backdropOpacity={0.7}
          onClose={() => setModalVisible(false)}
          onConfirm={() => {
            setModalVisible(false);
            Linking.openURL(`tel:${mockData.phoneCustomer}`);
            //
          }}
          buttonContainerStyle={{paddingVertical: scale(0)}}
          children={modalChildren}
          cancelTitle={t('아니요')}
          confirmTitle={t('네')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompanyDetailScreen;
