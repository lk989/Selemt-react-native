import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import RNPickerSelect from 'react-native-picker-select';
import Layout from "../../components/Layout";
import SText from '../../components/SText';
import { getLocales } from 'expo-localization';



function CarInformation({ route, navigation }) {
  const prevFormData = route.params.formData;

  let appLocale = getLocales()[0].languageCode;
  let selectPlaceholder = { label: appLocale == 'ar' ? "اختر" : "Choose", value: '' };
  let makePlaceholder = appLocale == 'ar' ? 'تويوتا' : 'Toyota';
  let modelPlaceholder = appLocale == 'ar' ? 'كامري' : 'Camry';
  let [disabledVehicle, setDisabledVehicle] = useState(true);

  let plateTypeList = [
    { label: appLocale == 'ar' ? "سيارة خاصة" : "Private car", value: "private_car" },
    { label: appLocale == 'ar' ? "سيارة عمومية (النقل الخاص)" : "Public transport", value: "public_transport" },
    { label: appLocale == 'ar' ? "سيارة تجارية" : "Commercial vehicle", value: "commercial_vehicle" },
    { label: appLocale == 'ar' ? "سيارة دبلوماسية" : "Embassy vehicle", value: "embassy_vehicle" },
  ];

     //عشان يجيكم
  const [formData, setFormData] = useState({
    ...{prevFormData},
    make: '',
    model: '',
    year: '',
    plateType: '',
  });

  const handleInputChange = (name, value) => {
    // setFormData(prevFormData => ({
    //   ...prevFormData,
    //   [name]: value
    // }));
    let updatedFormData = { ...formData };
    updatedFormData[name] = value;
    const allInputsFilled = Object.values(updatedFormData).every(val => {
      if (typeof val === 'string') {
        return val.trim() !== '';
      }
      return true; // Non-string values are considered filled
    });
    setFormData(updatedFormData);
    setDisabledVehicle(!allInputsFilled);
  };


  const handleSubmit = () => {
    navigation.navigate('AccidentInformation', {formData: formData})
  };

  return (
    <Layout>

      <ScrollView style={styles.container}>

        <View style={styles.sectionContainer}>
          <SText text='vehicle-information' classes="text-green text-lg font-bold p-4"/>
            
            <View style={styles.formGroup}>
            <SText text='make' classes="font-semibold mb-2"/>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleInputChange("make", value)}
              value={formData.make}
              placeholder={makePlaceholder}
            />
          </View>

            <View style={styles.formGroup}>
            <SText text='model' classes="font-semibold mb-2"/>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleInputChange("model", value)}
              value={formData.model}
              placeholder={modelPlaceholder}
            />
          </View>

            <View style={styles.formGroup}>
            <SText text='year' classes="font-semibold mb-2"/>
            <TextInput
              style={styles.input}
              onChangeText={(value) => handleInputChange("year", value)}
              value={formData.year}
              placeholder='2024'
              keyboardType="numeric"
              maxLength={4}
            />
            
          </View>

            <View style={styles.formGroup}>
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

   
      </ScrollView>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  menuIcon: {
    marginRight: 16,
    color : '#016E46',
    marginTop: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color : '#016E46',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  formGroup: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical:0,
    flexDirection: 'column', // Ensures the label and picker are stacked
    alignItems: 'stretch',  // Stretches children to match the width of the container
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
  textInput: {
    // Styles for the date text inside the TouchableOpacity
    fontSize: 16,
    color: '#333',
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
  sectionTitle: {
    fontSize: 22,
    color: '#016E46',
    fontWeight: 'bold',
    marginBottom: 16, // Add some space below the title
    textAlign: 'right', // Center the title text
  },
 

  placeholder : {
    textAlign:'right',

  },

});

export default CarInformation;