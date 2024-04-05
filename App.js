
import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OTP from './src/screens/OTP';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import GenerateBarcode from './src/screens/GenerateBarcode';
import ScanBarcode from './src/screens/ScanBarcode';
import ObjectionDetails from './src/screens/ObjectionDetails';
import ObjectionsSection from './src/screens/ObjectionsSection';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import EditProfile from './src/screens/EditProfile';
import ReportsSection from './src/screens/ReportsSection';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();


function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GenerateBarcode" component={GenerateBarcode} />
        <Stack.Screen name="ScanBarcode" component={ScanBarcode} />
        <Stack.Screen name="ObjectionDetails" component={ObjectionDetails} />
      </Stack.Navigator> */}
      <Drawer.Navigator
        initialRouteName="ReportsSection"
        screenOptions={{
          headerShown: false,
          drawerActiveTintColor: 'black',
          drawerActiveBackgroundColor: '#ABC7BD',
          drawerItemStyle: { marginVertical: 5 },
          drawerLabelStyle: {
          textAlign: 'right',
          },
        }}
      >
        <Drawer.Screen
          name="الصفحة الرئيسيه"
          component={Home}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="البلاغات"
          component={ReportsSection}
          options={{
            drawerIcon: ({ color, size }) => (
              <MaterialIcons name="report" color={color} size={size} />
            ),
          }}
        />
         <Drawer.Screen
          name="الإعتراضات"
          component={ObjectionsSection}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="flag" color={color} size={size} />
            ),
          }}
        />
          {/* <Drawer.Screen
          name="الملف الشخصي"
          component={EditProfile}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
        /> */}
        

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;