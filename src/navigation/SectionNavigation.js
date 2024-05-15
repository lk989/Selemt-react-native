import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ObjectionsSection from '../screens/ObjectionsSection';
import Layout from '../components/Layout';
import ReportsSection from '../screens/ReportsSection';
import { getLocales } from 'expo-localization';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

const SectionNavigation = ({ route, navigation }) => {
    let appLocale = getLocales()[0].languageCode;
    let initialRouteName = route.params.initialName;
    const reportsLabel = appLocale == 'ar' ? "البلاغات" : "Reports";
    const objectionsLabel = appLocale == 'ar' ? "الاعتراضات" : "Objections";
    const showPlus = true;
    return (
        <Layout navigation={navigation} showPlus={showPlus}>
            <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#016E46', 
                inactiveTintColor: 'gray', 
                labelStyle: { fontSize: 12, fontWeight: 'bold' },
                style: { borderRadius: 10 },
                indicatorStyle: { backgroundColor: '#016E46', marginHorizontal: 5},
              }}>
                <Tab.Screen name={reportsLabel} component={ReportsSection} />
                <Tab.Screen name={objectionsLabel} component={ObjectionsSection} />
            </Tab.Navigator>
        </Layout>
    );
}
 
export default SectionNavigation;