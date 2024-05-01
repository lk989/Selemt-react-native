import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import SText,{ setLocale, t }from "../../components/SText";
import PieChart from 'react-native-pie-chart';
import { Icon } from 'react-native-elements'
import Layout from "../../components/Layout";
import CurrDay from "../../components/CurrDay";
import CurrDate from '../../components/CurrDate';
import CurrLocation from '../../components/CurrLocation';
import PlusButton from "../../components/PlusButton";
import { getLocales } from 'expo-localization';
import { I18nManager } from 'react-native';



function Home({ navigation }) {
  const [locale, setLocaleState] = useState(getLocales()[0].languageCode);

  const toggleLanguage = () => {
    const newLocale = locale.startsWith('en') ? 'ar' : 'en';
    setLocale(newLocale);
    setLocaleState(newLocale);
  

  };
    return (
      <Layout navigation={navigation}>
          <View className="flex-row justify-between">
            <View className="bg-white rounded-md flex-row px-2 py-1">
              <Icon name='navigation' type='feather' color='#ABC7BD' size={18} />
              <Text className="px-2"><CurrLocation/></Text>
            </View>
            <View className="bg-white rounded-md flex-row px-2 py-1">
            <Icon name='calendar-outline' type='ionicon' color='#ABC7BD' size ={18} />
              <Text className="px-2"><CurrDate /></Text>
              <CurrDay/>
            </View>
          </View>
          <View className="bg-white rounded-2xl gap-6 pb-6">
            <View className="flex-row">
              <View className="bg-light-green rounded-full">
                <Text className=" px-3 py-1 text-xs">تتم المعالجة</Text>
              </View>
            </View>
            <Text className="text-lg font-semibold">رقم الحادث</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SectionNavigation', {initialName: appLocale == 'ar' ? "البلاغات" : "Reports"})}
              className="bg-light-green mx-6 rounded"
              underlayColor='#fff'>
              <SText text='view-report-det' classes="text-center py-2"/>
          </TouchableOpacity>
          </View>
          <View className="gap-y-1">
            <SText text='last-updates' classes="font-bold"/>
            <View className="flex-row gap-4">
              {/* <LastUpdateCard/>
              <LastUpdateCard/> */}
              <View className="flex-1">
                <View className="bg-white rounded-lg p-3">
                    <View className="flex-row justify-between">
                        <SText text='accident-evaluation' classes="font-semibold"/>
                        <Text>#0001</Text>
                    </View>
                    <PieChart
                        className="my-3"
                        widthAndHeight={60}
                        series={[120, 240]}
                        sliceColor={['#016E46', '#ABC7BD']}
                        coverRadius={0.55}
                        coverFill={'#FFF'}
                    />
                </View>
              </View>
              <View className="flex-1">
                <View className="bg-white rounded-lg p-3">
                    <View className="flex-row justify-between">
                        <SText text='accident-evaluation' classes="font-semibold"/>
                        <Text>#0001</Text>
                    </View>
                    <PieChart
                        className="my-3"
                        widthAndHeight={60}
                        series={[120, 240]}
                        sliceColor={['#016E46', '#ABC7BD']}
                        coverRadius={0.55}
                        coverFill={'#FFF'}
                    />
                </View>
              </View>
            </View>
            <View className="flex-row gap-5">
              <View className="flex-1">
                <View className="bg-white rounded-lg p-3">
                  <Icon name='comment-alert-outline' type='material-community' color='#ABC7BD' size={22} reverse/>
                  <SText text='reports' classes="text-xl px-2 py-1"/>
                </View>
              </View>
              <View className="flex-1">
                <View className="bg-white rounded-lg p-3">
                  <Icon name='comment-alert-outline' type='material-community' color='#ABC7BD' size={22} reverse/>
                  <SText text='objections' classes="text-xl px-2 py-1"/>
                </View>
              </View>
            </View>
             {/* Language toggle button */}
      <View>
        <Button title={t('switch-language')} onPress={toggleLanguage} />
      </View>
          <PlusButton navigation={navigation}/>
          </View>
      </Layout>
    );
    
}

export default Home;