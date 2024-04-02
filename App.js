
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OTP from './src/screens/OTP';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import GenerateBarcode from './src/screens/GenerateBarcode';
import ReportDetails from './src/screens/ReportDetails';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ReportDetails" component={ReportDetails} />
      <Stack.Screen name="GenerateBarcode" component={GenerateBarcode} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;