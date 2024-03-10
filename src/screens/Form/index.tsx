import React from 'react';
import {Text, SafeAreaView, View, useWindowDimensions} from 'react-native';
import styles from './styles';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import formSchema from '@utils/schemas/form';
import {TabView, SceneMap} from 'react-native-tab-view';
import LowPressureEquipmentForm from '@components/organisms/lowPressureEquipmentForm';
import CustomTabBar from '@components/organisms/customTabBar';
import IMAGES from '@assets/images/images';
const FormScreen: React.FC = () => {
  const formScm = formSchema();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(formScm.loginSchema),
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  const SecondRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ff4081'}}>
      <Text>jojo</Text>
    </View>
  );
  const ThirdRoute = () => (
    <View style={{flex: 1, backgroundColor: '#ff4081'}}>
      <Text>jojo</Text>
    </View>
  );

  const renderScene = SceneMap({
    first: () => <LowPressureEquipmentForm control={control} errors={errors} />,
    second: SecondRoute,
    third: ThirdRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '저압설비', image: IMAGES.icAutoFit},
    {key: 'second', title: '고압설비', image: IMAGES.icArrowsBidirectional},
    {key: 'third', title: '기타점검', image: IMAGES.icToolbox},
  ]);

  const handleIndexChange = newIndex => {
    setIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <HistoryManagementForm control={control} errors={errors} />
        <BasicForm
          control={control}
          ruleEmail={ruleEmail}
          ruleRequire={ruleRequire}
          errors={errors}
        />
        <MonthHistoryForm control={control} errors={errors} /> */}

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        overScrollMode={'always'}
        onIndexChange={setIndex}
        style={styles.viewForm}
        renderTabBar={props => (
          <CustomTabBar {...props} onIndexChange={handleIndexChange} />
        )}
      />
      {/* <HistoryManagementForm control={control} errors={errors} /> */}
      {/* <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default FormScreen;
