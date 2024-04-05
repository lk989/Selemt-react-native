
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/screens/Home';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import GenerateBarcode from './src/screens/GenerateBarcode';
import ObjectionDetails from './src/screens/ObjectionDetails';



const Drawer = createDrawerNavigator();


function App() {
  return (
    <NavigationContainer>
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
          <Drawer.Screen
          name="الملف الشخصي"
          component={EditProfile}
          options={{
            drawerIcon: ({ color, size }) => (
              <FontAwesome name="user" color={color} size={size} />
            ),
          }}
        />
        

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;