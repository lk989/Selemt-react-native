// ? libraries imports
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements'
import axios from 'axios';

// ? components imports
import SText from "../../components/SText";
import Layout from "../../components/Layout";
import CurrDay from "../../components/CurrDay";
import CurrDate from '../../components/CurrDate';
import CurrLocation from '../../components/CurrLocation';
import PushNotification from "../../components/PushNotification";
import { BASE_URL, appLocale } from '../../config/config';
import ReportCard from '../../components/ReportCard';
import { useFocusEffect } from '@react-navigation/native';

function Home({ navigation }) {

  const [latestReport, setLatestReport] = useState({});
  const [noReports, setNoReports] = useState(true);
  const [closedStatus, setClosedStatus] = useState('');
  const intervalId = useRef(0);

  const sendPushNotification = async () => {
    const apiUrl = 'https://app.nativenotify.com/api/notification';
    const pushData = {
      appId: 21001,
      appToken: 'wbQMKL75qxKvw4vb1Y0uFw',
      title: 'Push title here as a string',
      body: 'Push message here as a string',
      dateSent: '4-29-2024 11:31PM',
    };

    try {
      const response = await axios.post(apiUrl, pushData);
      console.log('Push notification sent:', response.data);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getLastReport();
    }, [])
  );
  
  async function getLastReport() {
    const userIdString = await AsyncStorage.getItem('userId');
    const userId = JSON.parse(userIdString);
    const response = await fetch(`${BASE_URL}last-report?user_id=${userId}`, {method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const res = await response.json();
    setLatestReport(res.report);
    setNoReports(res.report === null)
    setClosedStatus(res.closed_status);
  }

    return (
      <Layout navigation={navigation} showPlus={true} buttons={['lang', 'profile']}>
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
          {(noReports) ? 
            <View className="bg-white rounded-xl px-2 py-8 space-y-5">
              <SText text='no-rerports-yet'
                classes="py-2 text-center text-black font-bold"/>
              <SText text='can-initiate-report'
                classes="py-2 px-3 text-center text-green font-semibold"/>
            </View>
          :
            <View>
              <ReportCard navigation={navigation} report={latestReport}
                closedStatus={closedStatus} index="1"/>
            </View>
          }
          <View className="gap-y-1">
          <SText text='categories' classes="font-bold"/>
            <View className="flex-row gap-5">
              <TouchableOpacity className="flex-1" onPress={() => navigation.navigate('SectionNavigation', {screen: appLocale == 'en' ? "Reports" : "البلاغات"})}>
                <View className="bg-white rounded-lg p-3">
                  <Icon name='comment-alert-outline' type='material-community' color='#ABC7BD' size={22} reverse/>
                  <SText text='reports' classes="text-xl px-2 py-1"/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1" onPress={() => navigation.navigate('SectionNavigation', {screen: appLocale == 'en' ? "Objections" : "الاعتراضات"})}>
                <View className="bg-white rounded-lg p-3">
                  <Icon name='comment-alert-outline' type='material-community' color='#ABC7BD' size={22} reverse/>
                  <SText text='objections' classes="text-xl px-2 py-1"/>
                </View>
              </TouchableOpacity>
            </View>
        </View>
      </Layout>
    );
}

export default Home;