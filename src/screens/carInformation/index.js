import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Layout from "../../components/Layout";
import SText from '../../components/SText';
import { appLocale } from '../../config/config';


function CarInformation({ route, navigation }) {
  const prevFormData = route.params.formData;

  let selectPlaceholder = { label: appLocale == 'en' ? "Choose" : "اختر", value: '' };
  let makePlaceholder = appLocale == 'en' ? 'Toyota' : 'تويوتا';
  let modelPlaceholder = appLocale == 'en' ? 'Camry' : 'كامري';
  let [disabledVehicle, setDisabledVehicle] = useState(true);

  let plateTypeList = [
    { label: appLocale == 'en' ? "Private car" : "سيارة خاصة", value: "private_car" },
    { label: appLocale == 'en' ? "Public transport" : "سيارة عمومية (النقل الخاص)", value: "public_transport" },
    { label: appLocale == 'en' ? "Commercial vehicle" : "سيارة تجارية", value: "commercial_vehicle" },
    { label: appLocale == 'en' ? "Embassy vehicle" : "سيارة دبلوماسية", value: "embassy_vehicle" },
  ];

  const [formData, setFormData] = useState({
    ...prevFormData,
    make: '',
    model: '',
    year: '',
    plateType: '',
  });

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
    setDisabledVehicle(!allInputsFilled);
  };

  const handleSubmit = () => {
    navigation.navigate('AccidentInformation', {formData: formData})
  };

  return (
    <Layout>
        <View className="rounded-md p-2 bg-white">
          <SText text='vehicle-information' classes="text-green text-lg font-bold p-4"/>
            
          <View className="mb-4 px-4 py-0 flex-col items-stretch">
            <SText text='make' classes="font-semibold mb-2"/>
            <TextInput
              className="bg-white border border-[#dddddd] rounded-md px-3 pb-2 text-black text-lg"
              onChangeText={(value) => handleInputChange("make", value)}
              value={formData.make}
              placeholder={makePlaceholder}
            />
          </View>

          <View className="mb-4 px-4 py-0 flex-col items-stretch">
            <SText text='model' classes="font-semibold mb-2"/>
            <TextInput
              className="bg-white border border-[#dddddd] rounded-md px-3 pb-2 text-black text-lg"
              onChangeText={(value) => handleInputChange("model", value)}
              value={formData.model}
              placeholder={modelPlaceholder}
            />
          </View>

          <View className="mb-4 px-4 py-0 flex-col items-stretch">
            <SText text='year' classes="font-semibold mb-2"/>
            <TextInput
              className="bg-white border border-[#dddddd] rounded-md px-3 pb-2 text-black text-lg"
              onChangeText={(value) => handleInputChange("year", value)}
              value={formData.year}
              placeholder='2024'
              keyboardType="numeric"
              maxLength={4}
            />
            
          </View>

          <View className="mb-4 px-4 py-0 flex-col items-stretch">
            <SText text='plate-type' classes="font-semibold mb-2"/>
            <RNPickerSelect
                onValueChange={(value) => handleInputChange('plateType', value)}
                items={plateTypeList}
                style={pickerSelectStyles}
                placeholder={selectPlaceholder}
              />
          </View>
          <TouchableOpacity onPress={handleSubmit} className={`${disabledVehicle ? "bg-light-green" : "bg-green"} m-4 rounded-md py-3`} disabled={disabledVehicle}>
            <SText text='next' classes="text-white text-center font-semibold"/>
          </TouchableOpacity>
        </View>
    </Layout>
  );
};

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

export default CarInformation;