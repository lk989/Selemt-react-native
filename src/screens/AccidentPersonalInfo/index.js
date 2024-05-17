import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Platform}from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

import Layout from "../../components/Layout";
import SText from "../../components/SText";
import { dateToString, stringToDate} from '../../utils/utils';
import { BASE_URL, appLocale } from "../../config/config";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function AccidentPersonalInfo({ route, navigation }) {

  let namePlaceholder = appLocale == 'en' ? 'Mohammed Ahmad Alghamdi' : 'محمد أحمد الغامدي' ;
  let selectPlaceholder = { label: appLocale == 'en' ? "Choose" : "اختر", value: '' };
  let licenseList = [
    { label: appLocale == 'en' ? "Private" : "خاصة", value: "private" },
    { label: appLocale == 'en' ? "Public" : "عمومية", value: "public" },
    { label: appLocale == 'en' ? "International" : "دولية", value: "international" },
  ];
  let genderList = [
    { label: appLocale == 'en' ? "Male" : "ذكر", value: "male" },
    { label: appLocale == 'en' ? "Female" : "أنثى", value: "female" },
  ];
  let insuranceList = [
    { label: appLocale == 'en' ? "Yes" : "نعم", value: "1" },
    { label: appLocale == 'en' ? "No" : "لا", value: "0" },
  ];

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [disabledPersonal, setDisabledPersonal] = useState(true);
  const [formData, setFormData] = useState({
    // ! do not forget to update this
    accident_id: 1,
    // accident_id: route.params.accident_id,
    // party: route.params.party,
    party: 1,
    name: "",
    dateOfBirth: dateToString(new Date()),
    phoneNumber: "",
    gender: "",
    drivingLicenceType: "",
    insuranceOwned: "",
    nationalId: "",
  });

  useEffect(() => {
    // ? fetching reports using user id
    AsyncStorage.getItem('userId')
    .then(userIdString => {
      if (userIdString) {
        axios.get(`${BASE_URL}user-info`, {params: { user_id: JSON.parse(userIdString)}})
          .then(response => {
            const userData = response.data.user;
            setFormData(prevFormData => ({
              ...prevFormData,
              name: userData.name,
              phoneNumber: userData.phone,
              dateOfBirth: (userData.date_of_birth !== null) ?
              dateToString(new Date(userData.date_of_birth)) : dateToString(new Date()),
              gender: (userData.sex !== null) ? userData.sex : '',
              nationalId: (userData.national_id !== null) ? userData.national_id : '',
            }));
          })
          .catch(error => console.error(error.response.data.message));
      } else {
        console.log('No user ID found.');
      }
    })
    .catch(error => {
      console.error('Error retrieving user ID:', error);
    });
  }, []); 

  let maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear() - 12);

  const handleInputChange = (name, value) => {
    // ? update the data
    let updatedFormData = { ...formData };
    updatedFormData[name] = value;
    // ? checks if an input was empty
    const allInputsFilled = Object.values(updatedFormData).every(val => {
      if (typeof val === 'string') {
        return val.trim() !== '';
      }
      return true;
    });
    // ? enable the button if there is no empty input
    setDisabledPersonal(!allInputsFilled);
    setFormData(updatedFormData);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    handleInputChange("dateOfBirth", dateToString(selectedDate));
  };

  const handleSubmit = () => {
    navigation.navigate('CarInformation', {formData: formData})
  };
  
  return (
    <Layout>
      <View className="rounded-md p-2 bg-white">
        <SText text='personal-information' classes="text-green text-lg font-bold p-4"/>
        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='name' classes="font-semibold mb-2"/>
          <TextInput
            className="bg-white border border-[#dddddd] rounded-md px-3 py-2.5 text-black"
            onChangeText={(value) => handleInputChange("name", value)}
            value={formData.name}
            placeholder={namePlaceholder}
          />
        </View>

        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='birthday' classes="font-semibold mb-2"/>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} className="bg-white border border-[#dddddd] rounded-md px-3 py-2.5 text-black">
            <Text className="text-black">
              {formData.dateOfBirth}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <View>
              <DateTimePicker
                value={stringToDate(formData.dateOfBirth)}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
                maximumDate={maximumDate}
              />
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <SText text='done' classes="text-blue text-lg text-center"/>
              </TouchableOpacity>
            </View>
          )}

        </View>

        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='national_id' classes="font-semibold mb-2"/>
          <TextInput
            className="bg-white border border-[#dddddd] rounded-md px-3 py-2.5 text-black"
            onChangeText={(value) => handleInputChange("nationalId", value)}
            value={formData.nationalId}
            placeholder="XXXXXXXXXX"
            keyboardType="numeric"
            maxLength={10}
          />
        </View>

        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='gender' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange("gender", value)}
            items={genderList}
            style={pickerSelectStyles}
            value={formData.gender}
            placeholder={selectPlaceholder}
          />
        </View>

        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='license-type' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange("drivingLicenceType", value)}
            items={licenseList}
            style={pickerSelectStyles}
            value={formData.drivingLicenceType}
            placeholder={selectPlaceholder}
          />
        </View>

        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='has-insurance' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange("insuranceOwned", value)}
            items={insuranceList}
            style={pickerSelectStyles}
            value={formData.insuranceOwned}
            placeholder={selectPlaceholder}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} className={`${disabledPersonal ? "bg-light-green" : "bg-green"} m-4 rounded-md py-3`} disabled={disabledPersonal}>
          <SText text='next' classes="text-white text-center font-semibold"/>
        </TouchableOpacity>
      </View>
    </Layout>
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
  
export default AccidentPersonalInfo;
