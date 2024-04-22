
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerRoute from './src/components/DrawerRoute';
import OTP from './src/screens/OTP';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import GenerateBarcode from './src/screens/GenerateBarcode';
import ScanBarcode from './src/screens/ScanBarcode';
// import ObjectionDetails from './src/screens/ObjectionDetails';
import ObjectionsSection from './src/screens/ObjectionsSection';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AccidentPersonalInfo from './src/screens/AccidentPersonalInfo';
import ReportsSection from './src/screens/ReportsSection';
import ReportDetails from './src/screens/ReportDetails';
import CarInformation from './src/screens/CarInformation';
import AccidentInformation from './src/screens/AccidentInformation';

// import CustomDrawerContent from './src/components/CustomDrawerContent';


const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AccidentInformation" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ObjectionsSection" component={ObjectionsSection} />
        <Stack.Screen name="DrawerRoute" component={DrawerRoute} />
        <Stack.Screen name="GenerateBarcode" component={GenerateBarcode} />
        <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
        <Stack.Screen name="AccidentPersonalInfo" component={AccidentPersonalInfo} />
        <Stack.Screen name="CarInformation" component={CarInformation} />
        <Stack.Screen name="AccidentInformation" component={AccidentInformation} />
        {/*<Stack.Screen name="ObjectionDetails" component={ObjectionDetails} />*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;