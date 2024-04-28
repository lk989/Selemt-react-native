import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Image, Button } from "react-native";
import SText from "../../components/SText";
import Layout from "../../components/Layout";
import { getLocales } from 'expo-localization';


function ObjectionDetails({ navigation }) {
    let appLocale = getLocales()[0].languageCode;
    const objection = route.params.objection;

    const formatDate = (dateTimeString) => {
      const date = new Date(dateTimeString);
      return date.toDateString(); // Returns the date portion only
    };
    const formatTime = (dateTimeString) => {
      const date = new Date(dateTimeString);
      return date.toLocaleTimeString(); // Returns the date portion only
    };
    console.log(objection.accident.party_two_name)
  
    return (
      <Layout>
        <View className="bg-white rounded-2xl space-y-6 p-6">
          <View className="flex-row justify-between">
            <View className="flex-row">
              <SText text='objection-code' classes="text-green font-bold text-lg"/>
              <Text className="text-green font-bold text-lg mx-2">#{objection.id}</Text>
            </View>
            <View className="rounded-md flex-row items-center" style={{ backgroundColor: objection.status.color}}>
              <Text className=" px-4 text-xs rounded-sm">{appLocale == 'ar' ? objection.status.name_ar : objection.status.name_en}</Text>
            </View>
          </View>
  
          <View className="flex-row justify-between">
            <View className="flex-1 space-y-2">
              <SText text='objection-time' classes="font-semibold text-sm text-black"/>
              <Text className="text-gray">{formatTime(objection.created_at)}</Text>
            </View>
  
            <View className="flex-1 space-y-2">
              <SText text='objection-date' classes="font-semibold text-sm text-black"/>
              <Text className="text-gray">{formatDate(objection.created_at)}</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1 space-y-2">
              <SText text='party-one-name' classes="font-semibold text-sm text-black"/>
              <Text className="text-gray">{objection.accident.party_one_name}</Text>
            </View>
  
            <View className="flex-1 space-y-2">
              <SText text='party-two-name' classes="font-semibold text-sm text-black"/>
              <Text className="text-gray">{objection.accident.party_two_name}</Text>
            </View>
          </View>

          <View className="flex-row justify-between">
            <View className="flex-1 space-y-2">
              <SText text='party-one-percentage' classes="font-semibold text-sm text-black"/>
              <Text className="text-gray">%{objection.accident.party_one_percentage}</Text>
            </View>
  
            <View className="flex-1 space-y-2">
              <SText text='party-two-percentage' classes="font-semibold text-sm text-black"/>
              <Text className="text-gray">%{objection.accident.party_two_percentage}</Text>
            </View>
          </View>
  
          <View>
            <View className="flex-1 space-y-2">
              <SText text='accident-location' classes="font-semibold text-sm text-black"/>
              <Text className="text-gray">{objection.accident.location}</Text>
            </View>
          </View>

          <View>
            <View className="flex-1 space-y-2">
              <SText text='Objection-reason' classes="font-semibold text-sm text-black"/>
              <Text className="text-gray">{objection.reason}</Text>
            </View>
          </View>

          <View>
            <View className="flex-1 space-y-2">
              <SText text='notes' classes="font-semibold text-sm text-black"/>
              {objection.notes != null ? 
                <Text className="text-gray">{objection.notes}</Text>
                :
                <SText text='no-data' classes="text-gray"/>
                }
            </View>
          </View>
        </View>
      </Layout>
    );
}

export default ObjectionDetails;
