
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import ObjectionsSection from '../screens/ObjectionsSection';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import EditProfile from '../screens/EditProfile';
import ReportsSection from '../screens/ReportsSection';
// import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();


function DrawerRoute() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
          initialRouteName="ReportsSection"
          screenOptions={{
            headerShown: false,
            drawerActiveTintColor: 'black',
            drawerActiveBackgroundColor: '#ABC7BD',
            drawerItemStyle: { marginVertical: 5 },
          }}
          // drawerContent={(props) => <CustomDrawerContent {...props} />}
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

export default DrawerRoute;