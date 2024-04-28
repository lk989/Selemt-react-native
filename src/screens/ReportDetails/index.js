import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Image, Button, StyleSheet } from "react-native";
import SText from "../../components/SText";
import Layout from "../../components/Layout";
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements'
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { getLocales } from 'expo-localization';


function ReportDetails({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [selectedReportCode, setSelectedReportCode] = useState("");
  const [textInput, setTextInput] = useState("");
  const [imageUri, setImageUri] = useState(null);
  let appLocale = getLocales()[0].languageCode;
  const report = route.params.report;
  const closedStatus = route.params.closedStatus;

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toDateString(); // Returns the date portion only
  };
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString(); // Returns the date portion only
  };

  const handleRaiseObjection = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleTextInputChange = (text) => {
    setTextInput(text);
  };

  const handleReportCodeChange = (value) => {
    setSelectedReportCode(value);
  };

  const handleImageUpload = () => {
    // Implement image upload functionality here
    console.log("Upload image");
  };

  const handleSubmit = () => {
    // Handle submission of text input, report code, and image here
    console.log("Submitted text:", textInput);
    console.log("Selected report code:", selectedReportCode);
    console.log("Uploaded image URI:", imageUri);
    setModalVisible(false);
    setConfirmationModalVisible(true);
  };

  const handleConfirmOK = () => {
    setConfirmationModalVisible(false);
  };

  return (
    <Layout>
      <View className="bg-white rounded-2xl space-y-6 p-6">
        <View className="flex-row justify-between">
          <View className="flex-row">
            <SText text='report-code' classes="text-green font-bold text-lg"/>
            <Text className="text-green font-bold text-lg mx-2">#{report.id}</Text>
          </View>
          <View className="rounded-md flex-row items-center" style={{ backgroundColor: report.accident.status.color}}>
            <Text className=" px-4 text-xs rounded-sm">{appLocale == 'ar' ? report.accident.status.name_ar : report.accident.status.name_en}</Text>
          </View>
        </View>

        <View className="flex-row justify-between">
          <View className="flex-1 space-y-2">
            <SText text='report-time' classes="font-semibold text-sm text-black"/>
            <Text className="text-gray">{formatTime(report.created_at)}</Text>
          </View>

          <View className="flex-1 space-y-2">
            <SText text='report-date' classes="font-semibold text-sm text-black"/>
            <Text className="text-gray">{formatDate(report.created_at)}</Text>
          </View>
        </View>

        {/* for "تاريخ البلاغ" and date */}
        <View>
          <View className="flex-1 space-y-2">
            <SText text='report-description' classes="font-semibold text-sm text-black"/>
            <Text className="text-gray">{report.description}</Text>
          </View>
        </View>

        {closedStatus == report.accident.status_id ?
          (<View className="space-y-8">
            <View>
              <View className="flex-1 space-y-2">
                <SText text='fault-percentage' classes="font-semibold text-sm text-black"/>
                <Text className="text-gray">%{report.party == '1' ? report.accident.party_one_percentage.fault_percentage : report.accident.party_two_percentage.fault_percentage}</Text>
              </View>
            </View>
            <View className="spacy-y-4">
              <TouchableOpacity className="bg-light-green rounded">
                <SText text="download-report" classes="text-center py-3 font-semibold text-black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRaiseObjection}
                className="border border-green my-3 rounded">
                <SText text="Raise-objection" classes="text-center text-green font-semibold py-3" />
              </TouchableOpacity>
            </View>
          </View>
          )
          :
          (<View>
            <View className="flex-1 space-y-2">
              <SText text='fault-percentage' classes="font-semibold text-sm text-black"/>
              <SText text='not-evaluated' classes="text-gray"/>
            </View>
          </View>)
        }

        {/* Modal for inputting text */}
        {/* <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: '80%' }}>
              <TouchableOpacity onPress={handleCloseModal} style={{ alignSelf: 'flex-end', padding: 10 }}>
                <Text style={{ color: 'gray', fontSize: 18 }}>اغلاق</Text>
              </TouchableOpacity>

              <View className="items-center space-y-8">
                <Text className="text-green font-bold text-xl pb-4">رفع اعتراض جديد</Text>
              </View>

              <Text className="text-green text-l pb-2">اختر رمز البلاغ</Text>
              <RNPickerSelect
                onValueChange={(value) => handleReportCodeChange(value)}
                items={reportCodes}
                placeholder={{ label: 'اختر رمز البلاغ', value: null }}
                style={{ inputIOS: { borderWidth: 1, borderColor: "gray", padding: 10, width: '100%', marginBottom: 20 } }}
              />

              <Text className="text-green text-l pb-2">سبب الاعتراض</Text>
              <TextInput
                multiline
                onChangeText={handleTextInputChange}
                value={textInput}
                placeholder="اكتب سبب الاعتراض"
                style={{ borderWidth: 1, borderColor: "gray", padding: 10, width: '100%', marginBottom: 20 }}
              />

              <TouchableOpacity onPress={handleImageUpload} style={{ marginBottom: 20 }}>
                <Text style={{ color: 'blue' }}>Upload file</Text>
              </TouchableOpacity>
              {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, marginBottom: 20 }} />}

              <TouchableOpacity onPress={handleSubmit} className="bg-light-green mx-6 rounded" underlayColor="#fff">
                <SText text="raise-objection" classes="text-center py-2" />
              </TouchableOpacity>
              
            </View>
          </View>
        </Modal> */}

        {/* Confirmation modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={confirmationModalVisible}
          onRequestClose={handleConfirmOK}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: "white", padding: 20, borderRadius: 10, width: '80%' }}>
              <View className="items-center space-y-4">
              <Icon name='check' type='evilicon' color='green' size='60'/>
                <Text className="text-black font-bold text-xl pb-1">تم رفع الاعتراض بنجاح</Text>
                <Text className="text-green text-l pb-5">رمز الاعتراض: {selectedReportCode}</Text>
              </View>
              <TouchableOpacity onPress={handleConfirmOK} className="bg-light-green mx-6 rounded" underlayColor="#fff">
                <SText text="back-to-objections" classes="text-center py-2" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
}

export default ReportDetails;