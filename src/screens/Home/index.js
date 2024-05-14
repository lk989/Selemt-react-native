import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button } from 'react-native';
import SText from "../../components/SText";
import PieChart from 'react-native-pie-chart';
import { Icon } from 'react-native-elements'
import Layout from "../../components/Layout";
import CurrDay from "../../components/CurrDay";
import CurrDate from '../../components/CurrDate';
import CurrLocation from '../../components/CurrLocation';
import { getLocales } from 'expo-localization';
import PushNotification from "../../components/PushNotification";
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ navigation }) {

  let appLocale = getLocales()[0].languageCode;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showPlus = true;

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

    useEffect(() => {
      AsyncStorage.getItem('userId')
      .then(userIdString => {
        if (userIdString) {
          const userId = JSON.parse(userIdString);
          axios.get(`${BASE_URL}last-report`, {
            params: {
                user_id: '2'
            }
          })
            .then(response => {
              fetchedReports(response.data.reports);
            })
            .catch(error => console.error('Error fetching reports:', error.response.data.message));
        } else {
          console.log('No user ID found.');
        }
      })
      .catch(error => {
        console.error('Error retrieving user ID:', error);
      });
    }, []); 
  };
    return (
      <Layout navigation={navigation} showPlus={showPlus}>
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
              <TouchableOpacity className="flex-1" onPress={() => navigation.navigate('SectionNavigation', {initialName: appLocale == 'ar' ? "البلاغات" : "Reports"})}>
                <View className="bg-white rounded-lg p-3">
                  <Icon name='comment-alert-outline' type='material-community' color='#ABC7BD' size={22} reverse/>
                  <SText text='reports' classes="text-xl px-2 py-1"/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1" onPress={() => navigation.navigate('SectionNavigation', {initialName: appLocale == 'ar' ? "الاعتراضات" : "Objections"})}>
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