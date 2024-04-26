import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import Layout from "../../components/Layout";
import SText from "../../components/SText";
import {validPhone, extractCleanPhone} from '../../utils/utils';
import { getLocales } from 'expo-localization';

function AccidentPersonalInfo({ route, navigation }) {
  let appLocale = getLocales()[0].languageCode;
  let namePlaceholder = appLocale == 'ar' ? 'محمد أحمد الغامدي' : 'Mohammed Ahmad Alghamdi';
  let selectPlaceholder = { label: appLocale == 'ar' ? "اختر" : "Choose", value: '' };
  let licenseList = [
    { label: appLocale == 'ar' ? "خاصة" : "Private", value: "private" },
    { label: appLocale == 'ar' ? "عمومية" : "Public", value: "public" },
    { label: appLocale == 'ar' ? "دولية" : "International", value: "international" },
  ];
  let genderList = [
    { label: appLocale == 'ar' ? "ذكر" : "Male", value: "male" },
    { label: appLocale == 'ar' ? "أنثى" : "Female", value: "female" },
  ];
  let insuranceList = [
    { label: appLocale == 'ar' ? "نعم" : "Yes", value: "1" },
    { label: appLocale == 'ar' ? "لا" : "No", value: "0" },
  ];
  let [disabledPersonal, setDisabledPersonal] = useState(true);
  let maximumDate = new Date();
  maximumDate.setFullYear(maximumDate.getFullYear() - 12);

  const dateToString = (date) => {
    let day = String(date.getDate()).padStart(2, '0'); 
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const stringToDate = (stringDate) => {
    const [day, month, year] = stringDate.split('/').map(Number);
    return new Date(year, month - 1, day); 
  };

  const [formData, setFormData] = useState({
    accident_id: route.params.accident_id,
    party: route.params.party,
    name: "",
    dateOfBirth: dateToString(new Date()),
    phoneNumber: "",
    gender: "",
    drivingLicenceType: "",
    insuranceOwned: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name, value) => {
    let updatedFormData = { ...formData };
    if (name === "phoneNumber") {
      updatedFormData.phoneNumber = extractCleanPhone(value);
    } else {
      updatedFormData[name] = value;
    }
    const allInputsFilled = Object.values(updatedFormData).every(val => {
      if (typeof val === 'string') {
        return val.trim() !== '';
      }
      return true; // Non-string values are considered filled
    });
    let checkDisabled = allInputsFilled && validPhone(updatedFormData['phoneNumber']);
    setDisabledPersonal(!checkDisabled);
    setFormData(updatedFormData);
  };

  const handleDateChange = (event, selectedDate) => {
    // const currentDate = selectedDate || formData.dateOfBirth;
    setShowDatePicker(Platform.OS === "ios");
    handleInputChange("dateOfBirth", dateToString(selectedDate));
  };

  const handleSubmit = () => {
    // console.log(formData);
    navigation.navigate('CarInformation', {formData: formData})
  };
  

  return (
    <Layout>
      <View style={styles.sectionContainer}>
        <SText text='personal-information' classes="text-green text-lg font-bold p-4"/>
        <View style={styles.formGroup}>
          <SText text='name' classes="font-semibold mb-2"/>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("name", value)}
            value={formData.name}
            placeholder={namePlaceholder}
          />
        </View>

        <View style={styles.formGroup}>
          <SText text='birthday' classes="font-semibold mb-2"/>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={styles.textInput}>
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

        <View style={styles.formGroup}>
          <SText text='phone' classes="font-semibold mb-2"/>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange("phoneNumber", value)}
            value={formData.phoneNumber}
            placeholder="5XXXXXXXX"
            keyboardType="numeric"
            maxLength={9}
          />
        </View>

        <View style={styles.formGroup}>
          <SText text='gender' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange("gender", value)}
            items={genderList}
            style={pickerSelectStyles}
            value={formData.gender}
            placeholder={selectPlaceholder}
          />
        </View>

        <View style={styles.formGroup}>
          <SText text='license-type' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange("drivingLicenceType", value)}
            items={licenseList}
            style={pickerSelectStyles}
            value={formData.drivingLicenceType}
            placeholder={selectPlaceholder}
          />
        </View>

        <View style={styles.formGroup}>
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

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#016E46",
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  formGroup: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 0,
    flexDirection: "column", // Ensures the label and picker are stacked
    alignItems: "stretch", // Stretches children to match the width of the container
    padding: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: "#333",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  textInput: {
    fontSize: 16,
    color: "#333",
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF", // Choose a suitable background color
    borderRadius: 8,
    margin: 'auto',
    padding: 2,
    shadowColor: "#000", // These shadow properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4, // elevation is for Android
  },
  picker: {
    height: 10, // Set your desired height
    width: "100%", // Ensure the Picker fills the container width
  },
  placeholder: {
    textAlign: "Right",
  },
});

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
