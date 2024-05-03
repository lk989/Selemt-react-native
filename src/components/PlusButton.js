import { View, TouchableOpacity, Modal, StyleSheet, TextInput, Text } from "react-native";
import { Icon } from 'react-native-elements'
import React, { useState, useEffect } from 'react';
import SText from "./SText";
import { getLocales } from 'expo-localization';
import RNPickerSelect from 'react-native-picker-select';
import axios from "axios";
import { BASE_URL } from "../config/config";


const PlusButton = ({navigation}) => {
  const [isOperationModalVisible, setIsOperationModalVisible] = useState(false);
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);
  const [isObjectionModalVisible, setIsObjectionModalVisible] = useState(false);
  const [isConfirmationModalVisible, setisConfirmationModalVisible] = useState(false);
  const [disabledObjection, setDisabledObjection] = useState(true);
  const [confirmationText, setConfirmationText] = useState('');
  const [reports, setReports] = useState([]);
  const selectPlaceholder = { label: appLocale == 'ar' ? "اختر" : "Choose", value: '' };
  const reasonPlaceholder = appLocale == 'ar' ? "اكتب سبب الاعتراض هنا ..." : "Write your objection reason here ...";
  let appLocale = getLocales()[0].languageCode;
  const [formData, setFormData] = useState({
    reason: '',
    report: '',
  });

  useEffect(() => {
    axios.get(`${BASE_URL}reports`, {
      params: {
          user_id: '2'
      }
    })
      .then(response => {
        fetchedReports(response.data.reports);
      })
      .catch(error => console.error('Error fetching reports:', error.response.data.message));
  }, []); 

  const fetchedReports = (reports) => {
    const extractedReports = reports.map(report => {
        return {
            label: `${report.id} - ${report.description}`,
            value: report.id,
        }
    });
    setReports(extractedReports);
  }

  const handleObjectionSubmit = () => {
    setIsObjectionModalVisible(false);
    axios.post(`${BASE_URL}create-objection`,{formData: formData, userId: '2'})
    .then(function (response) {
        setConfirmationText(response.data.message);
        setisConfirmationModalVisible(true);
    })
    .catch(function (error) {
        console.error("Error:", error.response.data.message);
    });
  }
  const handleInputChange = (name, value) => {
    let updatedFormData = { ...formData };
    updatedFormData[name] = value;
    const allInputsFilled = Object.values(updatedFormData).every(val => {
        if (typeof val === 'string') {
            return val.trim() !== '';
        }
      return true;
    });
    setFormData(updatedFormData);
    setDisabledObjection(!allInputsFilled);
  }

    return (
        <View className="absolute bottom-10 mx-10">
            <TouchableOpacity onPress={() => setIsBarcodeModalVisible(true)}>
                <Icon name='plus' type='feather' color='#016E46' size={18} reverse/>
            </TouchableOpacity>
            <Modal
            visible={isOperationModalVisible}
            onRequestClose={() => setIsOperationModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
            transparent>
            <View className="relative flex justify-end h-full">
                <View className="bg-white rounded-t-2xl shadow-lg flex p-2">
                <SText text='initiate-report' classes="text-black py-2 font-bold text-lg text-center mt-8"/>
                <SText text='initiate-report-description' classes="text-black py-2 text-center"/>
                <TouchableOpacity
                className="bg-green mx-6 my-2 rounded"
                underlayColor='#fff'
                onPress={() => {setIsOperationModalVisible(false); navigation.navigate('GenerateBarcode')}}>
                    <SText text='generate-barcode' classes="text-center text-white py-2"/>
                </TouchableOpacity>
                <TouchableOpacity
                    className="border border-green mx-6 mb-8 rounded"
                    underlayColor='#fff'
                    onPress={() => {setIsOperationModalVisible(false); navigation.navigate('ScanBarcode')}}>
                    <SText text='scan-barcode' classes="text-center text-green py-2"/>
                </TouchableOpacity>
                </View>
            </View>
            </Modal>
            <Modal
            visible={isBarcodeModalVisible}
            onRequestClose={() => setIsBarcodeModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
            transparent>
            <View className="relative flex justify-end h-full">
                <View className="bg-white rounded-t-2xl shadow-lg flex p-2">
                <SText text='choose-operation' classes="text-black py-2 font-bold text-lg text-center mt-8"/>
                <TouchableOpacity
                className="bg-light-green mx-6 my-2 rounded flex-row items-center px-4 py-0.5 mb-2"
                underlayColor='#fff'
                onPress={() => {setIsBarcodeModalVisible(false); setIsOperationModalVisible(true);}}>
                    <SText text='initiate-report' classes="text-center text-s text-black p-2"/>
                <Icon name='car-crash' type='font-awesome-5' color='#fff' size={16}/>
                </TouchableOpacity>
                <TouchableOpacity
                className="bg-light-green mx-6 my-2 rounded flex-row justify-start items-center px-4 py-0.5 mb-5"
                underlayColor='#fff'
                onPress={() => {setIsBarcodeModalVisible(false); setIsObjectionModalVisible(true);}}>
                    <SText text='Raise-objection' classes="text-center text-s text-black p-2"/>
                <Icon name='alert-circle' type='ionicon' color='#fff' size={20}/>
                </TouchableOpacity>
                </View>
            </View>
            </Modal>
            <Modal
            visible={isObjectionModalVisible}
            onRequestClose={() => setIsObjectionModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
            transparent>
            <View className="relative flex justify-end h-full">
                <View className="bg-white rounded-t-2xl shadow-lg flex p-5">
                    <SText text='Raise-objection' classes="text-black py-4 font-bold text-lg text-center mt-6"/>
                    <View className="mb-5">
                        <SText text='choose-report' classes="font-semibold mb-2"/>
                        <RNPickerSelect
                            onValueChange={(value) => handleInputChange('report', value)}
                            items={reports}
                            style={pickerSelectStyles}
                            placeholder={selectPlaceholder}
                        />
                    </View>
                    <View>
                        <SText text='reason-objection' classes="font-semibold mb-2"/>
                        <TextInput
                            style={styles.textArea}
                            onChangeText={(text) => handleInputChange('reason', text)}
                            // value={formData.accidentDetails}
                            placeholder={reasonPlaceholder}
                            multiline={true}
                            numberOfLines={4}
                        />
                    </View>
                    <TouchableOpacity
                        className={`${disabledObjection ? "bg-light-green" : "bg-green"} my-4 rounded-md py-1`}
                        underlayColor='#fff'
                        onPress={handleObjectionSubmit}>
                            <SText text='submit' classes="text-center text-s text-white font-bold p-2"/>
                    </TouchableOpacity>
                </View>
            </View>
            </Modal>
            <Modal
                visible={isConfirmationModalVisible}
                onRequestClose={() => setisConfirmationModalVisible(false)}
                animationType="slide"
                presentationStyle="overFullScreen"
                transparent>
                <View className="relative flex justify-end h-full shadow-2xl">
                    <View className="bg-white rounded-2xl shadow-lg flex p-2 my-auto mx-4">
                    <Text className="text-black py-4 font-bold text-lg text-center">{confirmationText}</Text>
                    <TouchableOpacity
                    className="bg-green mx-8 my-1 rounded-full items-center px-4 py-0.5 mb-2"
                    underlayColor='#fff'
                    onPress={() => {setisConfirmationModalVisible(false); navigation.navigate('SectionNavigation', {initialName: appLocale == 'ar' ? "الاعتراضات" : "Objections"})}}>
                        <SText text='go-objections' classes="text-white py-2 font-bold text-center"/>
                    </TouchableOpacity>
                    <TouchableOpacity
                    className="bg-white border border-green mx-8 my-1 rounded-full items-center px-4 py-0.5 mb-2"
                    underlayColor='#fff'
                    onPress={() => {setisConfirmationModalVisible(false); navigation.navigate('Home')}}>
                        <SText text='go-home' classes="text-green py-2 font-bold text-center"/>
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      height: 15,
      paddingVertical: 18,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#dcdcdc",
      borderRadius: 4,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: "#dcdcdc",
      borderRadius: 4,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
      textAlign: "right", // if you want the text aligned to the right
    },
  
    placeholder: {
      color: "#9EA0A4", // Placeholder text color
    },
  
    iconContainer: {
      top: 5,
      right: 15, // Adjust positioning as needed
    },
  });

  const styles = StyleSheet.create({


    selectedOptionButton: {
      backgroundColor: '#ABC7BD', // Light green background for selected state
    },
    buttonsContainer: {
  
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    optionButton: {
      backgroundColor: '#E8E8E8', // Use your desired color
      padding: 8, // Reduced padding
      margin: 5,
      borderRadius: 5,
      marginLeft: 'left',
      width: 100, // Set a fixed width or use a percentage of the container's width
      alignItems: 'center', // Center the text horizontally
      justifyContent: 'center', // Center the text vertically
      height: 35, // Set a fixed height
    },
    buttonText2: {
    color: '#333', // Your desired color
    fontSize: 9.5, // Smaller font size
    textAlign: 'center', // Center the text
    fontWeight: 'bold',
    color: 'black',
    },
    textArea: {
      borderWidth: 1,
      borderColor: '#dcdcdc', // Light grey border
      padding: 10,
      marginVertical: 5, // Add some vertical spacing
      borderRadius: 5, // Slightly rounded corners
      fontSize: 16,
      textAlignVertical: 'top', // Start the text from the top on Android
      height: 100, // Set a fixed height or make it dynamic as per your needs
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      backgroundColor: '#fff',
    },
    menuIcon: {
      marginRight: 16,
      color: '#016E46',
      marginTop: 16,
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#016E46',
      marginTop: 20,
    },
    formGroup: {
      flex: 1,
      marginBottom: 16,
      paddingHorizontal: 16,
      paddingVertical: 0,
      flexDirection: 'column',
      alignItems: 'stretch',
      padding: 10,
    },
    input: {
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: '#DDD',
      borderRadius: 4,
      padding: 16,
      fontSize: 13,
      color: '#333',
    },
    button: {
      backgroundColor: '#016E46',
      borderRadius: 4,
      marginHorizontal: 16,
      paddingVertical: 12,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    label: {
      marginBottom: 5,
      fontSize: 17,
      textAlign: 'right',
    },
    sectionContainer: {
      backgroundColor: "#FFFFFF", // Choose a suitable background color
      borderRadius: 8,
      margin: 'auto',
      marginBottom: 40,
      padding: 2,
      shadowColor: "#000", // These shadow properties are for iOS
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 4, // elevation is for Android
    },
    sectionTitle: {
      fontSize: 22,
      color: '#016E46',
      fontWeight: 'bold',
      marginBottom: 16, // Add some space below the title
      textAlign: 'right', // Center the title text
    },
    placeholder: {
      alignItems: 'center',
    },
    // Styles for the photo upload box
    uploadBox: {
      borderWidth: 1,
      borderColor: '#dcdcdc', // Light grey border
      padding: 10,
      marginVertical: 5, // Add some vertical spacing
      borderRadius: 5, // Slightly rounded corners
      backgroundColor: '#f9f9f9', // Light grey background
      color: '#dcdcdc', // Text color
      fontSize: 16,
      textAlign: 'center',
      height: 350, // Set a fixed height or make it dynamic as per your needs
      justifyContent: 'center',
    },
    imagePreview: {
      width: '100%',
      height: '100%',
    },
    uploadPrompt: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
export default PlusButton;