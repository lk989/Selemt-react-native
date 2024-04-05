import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Image, Button } from "react-native";
import SText from "../../components/SText";
import Layout from "../../components/Layout";
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements'


function ObjectionDetails({ navigation }) {



    const reportCodes = [
        { label: "Code 1", value: "code1" },
        { label: "Code 2", value: "code2" },
        { label: "Code 3", value: "code3" },
    ];

    const getCurrentTime = () => {
        const date = new Date();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const meridiem = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        const formattedMinute = minute < 10 ? `0${minute}` : minute;
        return `${formattedHour}:${formattedMinute} ${meridiem}`;
    };

    return (
        <Layout>
            <View className="bg-white rounded-2xl gap-6 pb-6">
                <View className="flex-row">
                    <View className="bg-light-green rounded-full">
                        <Text className=" px-3 py-1 text-xs">قيد المعالجة</Text>
                    </View>
                </View>

                <View >
                    <Text className="text-lg font-semibold">0001# رمز الاعتراض</Text>
                </View>
                <View>
                    <Text>وقت الاعتراض</Text>
                    <Text>{getCurrentTime()}</Text>
                </View>
                <View>
                    <Text>تاريخ الاعتراض</Text>
                    <Text>{new Date().toLocaleDateString()}</Text>
                </View>

                <View>
                    <Text >وصف الاعتراض</Text>
                    <Text>وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ</Text>
                </View>

                <View>
                    <Text >اسم الطرف الأول </Text>
                    <Text> محمد احمد </Text>
                </View>
                <View>
                    <Text >اسم الطرف الثاني </Text>
                    <Text> محمد احمد </Text>
                </View>
                <View>
                    <Text >نسبة خطأ الطرف الأول </Text>
                    <Text> 50% </Text>
                </View>
                <View>
                    <Text >نسبة خطأ الطرف الثاني </Text>
                    <Text> 50% </Text>
                </View>
                <View>
                    <Text >موقع الحادث </Text>
                    <Text> الشوقية </Text>
                </View>
                <View>
                    <Text >ملاحظات </Text>
                    <Text> تم قبول </Text>
                </View>






            </View>
        </Layout>
    );
}

export default ObjectionDetails;
