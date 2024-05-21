
// ? libraries imports
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LogBox } from 'react-native';

// ? screens imports
import OTP from './src/screens/OTP';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Home from './src/screens/Home';
import GenerateBarcode from './src/screens/GenerateBarcode';
import ScanBarcode from './src/screens/ScanBarcode';
import ObjectionDetails from './src/screens/ObjectionDetails';
import ObjectionsSection from './src/screens/ObjectionsSection';
import AccidentPersonalInfo from './src/screens/AccidentPersonalInfo';
import ReportDetails from './src/screens/ReportDetails';
import CarInformation from './src/screens/CarInformation';
import AccidentInformation from './src/screens/AccidentInformation';
import SectionNavigation from './src/navigation/SectionNavigation';
import ProfileScreen from './src/screens/ProfileScreen';
import VehicleInformation from './src/screens/VehicleInformation';

// ? a stack constant for navigation
const Stack = createNativeStackNavigator();

function App() {
  LogBox.ignoreAllLogs(); // Add the specific warning message you want to ignore

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="OTP" component={OTP} />
        {/* // ? disable gestureEnabled to stop users from sliding to previous screen */}
        <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ObjectionsSection" component={ObjectionsSection} />
        <Stack.Screen name="GenerateBarcode" component={GenerateBarcode} />
        <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
        <Stack.Screen name="AccidentPersonalInfo" component={AccidentPersonalInfo} />
        {/* <Stack.Screen name="CarInformation" component={CarInformation} /> */}
        <Stack.Screen name="AccidentInformation" component={AccidentInformation} />
        <Stack.Screen name="SectionNavigation" component={SectionNavigation} />
        <Stack.Screen name="ReportDetails" component={ReportDetails} />
        <Stack.Screen name="ObjectionDetails" component={ObjectionDetails} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="VehicleInformation" component={VehicleInformation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;