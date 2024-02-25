import {Screen} from '@navigation/navigation.enums';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';
import InboxIndexScreen from './screens/InboxIndexScreen';

const Stack = createNativeStackNavigator();

const InboxScreen: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screen.InboxIndexScreen}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name={Screen.InboxIndexScreen}
        component={InboxIndexScreen}
      />
    </Stack.Navigator>
  );
};
export default InboxScreen;
