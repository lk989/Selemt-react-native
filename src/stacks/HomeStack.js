
import 'react-native-gesture-handler';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import GenerateBarcode from '../screens/GenerateBarcode';
import ScanBarcode from '../screens/ScanBarcode';
import ObjectionDetails from '../screens/ObjectionDetails';
import ObjectionsSection from '../screens/ObjectionsSection';
import AccidentPersonalInfo from '../screens/AccidentPersonalInfo';
import ReportDetails from '../screens/ReportDetails';
import CarInformation from '../screens/CarInformation';
import AccidentInformation from '../screens/AccidentInformation';
import SectionNavigation from '../navigation/SectionNavigation';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ObjectionsSection" component={ObjectionsSection} />
        <Stack.Screen name="GenerateBarcode" component={GenerateBarcode} />
        <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
        <Stack.Screen name="AccidentPersonalInfo" component={AccidentPersonalInfo} />
        <Stack.Screen name="CarInformation" component={CarInformation} />
        <Stack.Screen name="AccidentInformation" component={AccidentInformation} />
        <Stack.Screen name="SectionNavigation" component={SectionNavigation} />
        <Stack.Screen name="ReportDetails" component={ReportDetails} />
        <Stack.Screen name="ObjectionDetails" component={ObjectionDetails} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;