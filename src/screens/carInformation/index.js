import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import RNPickerSelect from 'react-native-picker-select';



function carInformation({ navigation }) {
     //عشان يجيكم
  const [formData, setFormData] = useState({
    companyCar: '',
    modeal: '',
    year: '',
    plateType: '',

  });

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };


  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>

      <StatusBar barStyle="dark-content" />
      <View className="bg-white p-4 pt-15 flex-row justify-between items-center">
      </View>
           
      <View style={styles.header}>
        <Icon name="bars" size={24} color="#000" style={styles.menuIcon} />
        <Text style={styles.welcomeText}>اهلا بك محمد!</Text>
      </View>

      <ScrollView style={styles.container}>

      <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>بيانات المركبة</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>شركة التصنيع</Text>
          <RNPickerSelect
              onValueChange={(value) => handleInputChange('companyCar', value)}
              items={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>الموديل </Text>
          <RNPickerSelect
              onValueChange={(value) => handleInputChange('modeal', value)}
              items={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>السنة  </Text>
          <RNPickerSelect
              onValueChange={(value) => handleInputChange('year', value)}
              items={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
          
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>نوع اللوحة</Text>
          <RNPickerSelect
              onValueChange={(value) => handleInputChange('plateType', value)}
              items={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
        </View>

        
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>التالي</Text>
        </TouchableOpacity>
   
      </ScrollView>
      

    </>
  );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      height:15,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#dcdcdc',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: 'white', // match background color
      textAlign: 'right', // if you want the text aligned to the right
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: '#dcdcdc',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: 'white', // match background color
      textAlign: 'right', // if you want the text aligned to the right
    },
   
    placeholder: {
      color: '#9EA0A4', // Placeholder text color
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
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    padding: 16,
    fontSize: 16,
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
  textInput: {
    // Styles for the date text inside the TouchableOpacity
    fontSize: 16,
    color: '#333',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',// Choose a suitable background color
    borderRadius: 4,
    margin: 16,
    padding: 16,
    shadowColor: '#000', // These shadow properties are for iOS
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

export default carInformation;