
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import OTP from './src/screens/OTP';
// import GenerateBarcode from './src/screens/GenerateBarcode';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="GenerateBarcode" component={GenerateBarcode} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;