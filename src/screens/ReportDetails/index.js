import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, Image, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import SText from "../../components/SText";
import Layout from "../../components/Layout";
import axios from "axios";
import { BASE_URL, appLocale } from "../../config/config";
import { formatDate, formatTime } from "../../utils/utils";


function ReportDetails({ route, navigation }) {
  const [isObjectionModalVisible, setIsObjectionModalVisible] = useState(false);
  const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false);
  const [disabledObjection, setDisabledObjection] = useState(true);
  const [confirmationText, setConfirmationText] = useState('');
  const reasonPlaceholder = appLocale == 'en' ? "Write your objection reason here ..." : "اكتب سبب الاعتراض هنا ...";
  const report = route.params.report;
  const closedStatus = route.params.closedStatus;
  const [formData, setFormData] = useState({
    reason: '',
    report: report.accident_id,
  });

  const handleRaiseObjection = () => {
    setIsObjectionModalVisible(true);
  };

  const handleTextInputChange = (name, text) => {
    setDisabledObjection(text.trim() == '')
    formData[name] = text;
  };

  const handleSubmit = () => {
    setIsObjectionModalVisible(false);
    axios.post(`${BASE_URL}create-objection`,{formData: formData, userId: '2'})
    .then(function (response) {
        setConfirmationText(response.data.message);
        setIsConfirmationModalVisible(true);
    })
    .catch(function (error) {
        console.error("Error:", error.response.data.message);
    });
  };
  console.log(report.accident.party_one_percentage)

  return (
    <Layout navigation={navigation} buttons={['back']}>
      <View className="bg-white rounded-2xl space-y-6 p-6">
        <View className="flex-row justify-between">
          <View className="flex-row">
            <SText text='report-code' classes="text-green font-bold text-lg"/>
            <Text className="text-green font-bold text-lg mx-2">#{report.id}</Text>
          </View>
          <View className="rounded-md flex-row items-center" style={{ backgroundColor: report.accident.status.color}}>
            <Text className=" px-4 text-xs rounded-sm">{appLocale == 'en' ? report.accident.status.name_en : report.accident.status.name_ar}</Text>
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
        // ? if accident has been evaluated
          (<View className="space-y-8">
            <View>
              <View className="flex-1 space-y-2">
                <SText text='fault-percentage' classes="font-semibold text-sm text-black"/>
                <Text className="text-gray">%{report.party == '1' ? report.accident.party_one_percentage : report.accident.party_two_percentage}</Text>
              </View>
            </View>
            <View className="spacy-y-4">
              {!report.accident.has_objections && (
                <TouchableOpacity onPress={handleRaiseObjection}
                className="border border-green my-3 rounded">
                  <SText text="Raise-objection" classes="text-center text-green font-semibold py-3" />
                </TouchableOpacity>
              )}
            </View>
          </View>)
          :
          // ? else
          (<View>
            <View className="flex-1 space-y-2">
              <SText text='fault-percentage' classes="font-semibold text-sm text-black"/>
              <SText text='not-evaluated' classes="text-gray"/>
            </View>
          </View>)
        }

        <Modal
            visible={isObjectionModalVisible}
            onRequestClose={() => setIsObjectionModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
          transparent>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="relative flex justify-center h-full">
            <View className="bg-white rounded-2xl shadow-lg flex p-5">
              <SText text='Raise-objection' classes="text-black py-4 font-bold text-lg text-center mt-6"/>
                <View>
                    <SText text='reason-objection' classes="font-semibold mb-2 text-black"/>
                    <TextInput
                        style={styles.textArea}
                        onChangeText={(text) => handleTextInputChange('reason', text)}
                        // value={formData.accidentDetails}
                        placeholder={reasonPlaceholder}
                        multiline={true}
                        numberOfLines={4}
                    />
                </View>
                <TouchableOpacity
                    className={`${disabledObjection ? "bg-light-green" : "bg-green"} my-4 rounded-md py-1`}
                    underlayColor='#fff'
                    onPress={handleSubmit}>
                        <SText text='submit' classes="text-center text-s text-white font-bold p-2"/>
                </TouchableOpacity>
            </View>
        </View>
          </TouchableWithoutFeedback>
          </Modal>
          <Modal
          visible={isConfirmationModalVisible}
          onRequestClose={() => setIsConfirmationModalVisible(false)}
          animationType="slide"
          presentationStyle="overFullScreen"
          transparent>
          <View className="relative flex justify-end h-full shadow-2xl">
              <View className="bg-white rounded-2xl shadow-lg flex p-2 my-auto mx-4">
                <SText text='objection-created-successfuly' classes="text-black py-4 font-bold text-lg text-center"/>
                <TouchableOpacity
                className="bg-green mx-8 my-1 rounded-full items-center px-4 py-0.5 mb-2"
                underlayColor='#fff'
                onPress={() => {setIsConfirmationModalVisible(false); navigation.navigate('Home')}}>
                  <SText text='go-home' classes="text-white py-2 font-bold text-lg text-center"/>
                </TouchableOpacity>
              </View>
          </View>
        </Modal>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  textArea: {
    borderWidth: 1,
    borderColor: '#dcdcdc', // Light grey border
    padding: 10,
    marginVertical: 5, // Add some vertical spacing
    borderRadius: 5, // Slightly rounded corners
    fontSize: 16,
    textAlignVertical: 'top', // Start the text from the top on Android
    height: 150, // Set a fixed height or make it dynamic as per your needs
  }
});


export default ReportDetails;