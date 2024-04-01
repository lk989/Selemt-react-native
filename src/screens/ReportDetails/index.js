import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Image, Button } from "react-native";
import SText from "../../components/SText";
import Layout from "../../components/Layout";
import RNPickerSelect from 'react-native-picker-select';
import { Icon } from 'react-native-elements'


function ReportDetails({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(false);
  const [selectedReportCode, setSelectedReportCode] = useState("");
  const [textInput, setTextInput] = useState("");
  const [imageUri, setImageUri] = useState(null);

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
      <View className="bg-white rounded-2xl gap-6 pb-6">
        <View className="flex-row">
          <View className="bg-light-green rounded-full">
            <Text className=" px-3 py-1 text-xs">قيد المعالجة</Text>
          </View>
        </View>

        <View >
        <Text className="text-lg font-semibold">0001# رمز البلاغ</Text>
        </View>

        {/* for "وقت البلاغ" and time */}
        <View>
          <Text>وقت البلاغ</Text>
          <Text>{getCurrentTime()}</Text>
        </View>

        {/* for "تاريخ البلاغ" and date */}
        <View>
          <Text>تاريخ البلاغ</Text>
          <Text>{new Date().toLocaleDateString()}</Text>
        </View>

        {/* for "تاريخ البلاغ" and date */}
        <View>
          <Text >وصف البلاغ</Text>
          <Text>وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ</Text>
        </View>

        {/* تحميل تقرير الحادث */}
        <TouchableOpacity className="bg-light-green mx-6 rounded" underlayColor="#fff">
          <SText text="download-report" classes="text-center py-2" />
        </TouchableOpacity>

        {/* رفع اعتراض */}
        <TouchableOpacity
          onPress={handleRaiseObjection}
          className="border border-green mx-6 mb-8 rounded"
          underlayColor="#fff">
          <SText text="Raise-objection" classes="text-center text-green py-2" />
        </TouchableOpacity>


        {/* Modal for inputting text */}
        <Modal
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

              {/* Title */}
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
                placeholder="Enter your objection here"
                style={{ borderWidth: 1, borderColor: "gray", padding: 90, width: '100%', marginBottom: 20 }}
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
        </Modal>

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