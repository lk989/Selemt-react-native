// ? library imports 
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getLocales } from 'expo-localization';

// ? screens import
import ObjectionsSection from '../screens/ObjectionsSection';
import Layout from '../components/Layout';
import ReportsSection from '../screens/ReportsSection';

// ? create a Tab constant for navigation
const Tab = createMaterialTopTabNavigator();

const SectionNavigation = ({ navigation }) => {

  // ? determine the label of the tab based on the chosen language
  let appLocale = getLocales()[0].languageCode;
  const reportsLabel = appLocale == 'ar' ? "البلاغات" : "Reports";
  const objectionsLabel = appLocale == 'ar' ? "الاعتراضات" : "Objections";

  return (
    <Layout navigation={navigation} showPlus={true} buttons={['back']}>
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