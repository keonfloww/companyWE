import IMAGES from '@assets/images/images';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from '@services/navigationService';
import {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from 'react-native-ui-lib/src/style/colors';
import {Screen} from './navigation.enums';
import HomeScreen from '@screens/Home';
import {scale} from '@utils/mixins';
import CompanyDetailScreen from '@screens/CompanyDetail';
import {t} from 'i18next';

const Stack = createNativeStackNavigator();

const HomeScreenNavigator: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Screen.HomeScreen}
        component={HomeScreen}
        options={{
          headerTitle: '',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Screen.CompanyDetailScreen}
        component={CompanyDetailScreen}
        options={{
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: '#F3F3F4',
          },
          headerLeft: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigationService.goBack();
                }}>
                <IMAGES.icCompanyDetailBack color={colors.black} />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: scale(8),
                  fontSize: 24,
                  fontWeight: '700',
                  lineHeight: 28,
                }}>
                {t('도도익산')}
              </Text>
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <TouchableOpacity onPress={() => {}}>
                <IMAGES.icHeadset color={colors.black} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.marginLeft8} onPress={() => {}}>
                <IMAGES.icAlertGlobal color={colors.black} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginLeft8: {marginLeft: scale(8)},
});

export default HomeScreenNavigator;
