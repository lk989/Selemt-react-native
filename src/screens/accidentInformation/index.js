import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ScrollView, StatusBar, Image,Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import RNPickerSelect from 'react-native-picker-select';
import { launchImageLibrary } from 'react-native-image-picker';





function accidentInformation({ navigation }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);



  const options = [
    'المقدمة',
    'المؤخرة  ',
    'الجانب الايمن ',
    'الجانب الايسر ',
    ' الجانب الامامي الايمن',
    ' الجانب الامامي الايسر',
   ' الجانب الخلفي الايمن',
   ' الجانب الخلفي الايسر',
  ];


  const handlePress = (option) => {
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(option)) {
        // Deselect if already selected
        return prevSelectedOptions.filter((selectedOption) => selectedOption !== option);
      } else {
        // Select if not already selected
        return [...prevSelectedOptions, option];
      }
    });
  };
  


  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };


const handleSubmit = () => {
  console.log(formData);
  // After submitting your form data, you'd set the modal to be visible.
  setModalVisible(true);
};


  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

  
    launchImageLibrary(options)
      .then(response => {
        if (response.assets && response.assets.length > 0) {
          const source = { uri: response.assets[0].uri };
          setImageUri(source.uri);
        }
      })
      .catch(error => {
        console.log('Error picking the image: ', error);
      });
      
  };
  
  


  

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View className="bg-white p-4 pt-15 flex-row justify-between items-center" />
      <View style={styles.header}>
        <Icon name="bars" size={24} color="#000" style={styles.menuIcon } onPress={() => navigation.openDrawer()} />
        <Text style={styles.welcomeText}>اهلا بك محمد!</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>بيانات الحادث</Text>

          {/* First Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>اتجاه السير </Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('direction', value)}
              items={[
                { label: "Option 1", value: "option1" },
                { label: "Option 2", value: "option2" },
                { label: "Option 3", value: "option3" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
          </View>

          {/* Second Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>نوع الشارع  </Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('streetType', value)}
              items={[
                { label: "Type 1", value: "type1" },
                { label: "Type 2", value: "type2" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
          </View>

              {/*  Third Picker */}
              <View style={styles.formGroup}>
            <Text style={styles.label}>عدد مسارات الشارع   </Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange('Directionstreet', value)}
              items={[
                { label: "Type 1", value: "type1" },
                { label: "Type 2", value: "type2" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
          </View>


          {/* forth Picker */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>حركة السيارة قبل الحادث </Text>
            <RNPickerSelect 
              onValueChange={(value) => handleInputChange('accidentCause', value)}
              items={[
                { label: "Cause 1", value: "cause1" },
                { label: "Cause 2", value: "cause2" },
              ]}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
          </View>


          {/* Text Input */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>وصف </Text>
            <TextInput
              style={styles.textArea}
              onChangeText={(text) => handleInputChange('accidentDetails', text)}
              value={formData.accidentDetails}
              placeholder="أدخل وصف الحادث هنا"
              multiline={true}
              numberOfLines={4}
            />
          </View>


       
          <View style={styles.formGroup}>
  <Text style={styles.label}>اختر مكان الصدمة</Text>
  <View style={styles.buttonsContainer}>
    {options.map((option) => (
      <TouchableOpacity
        key={option}
        style={[
          styles.optionButton,
          selectedOptions.includes(option) && styles.selectedOptionButton, // Apply the selected style conditionally
        ]}
        onPress={() => handlePress(option)}
      >
        <Text style={[
          styles.buttonText2,
          selectedOptions.includes(option) && styles.selectedButtonText, // Apply the selected text style conditionally
        ]}>
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
</View>

       


          {/* Photo Upload */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>صورة المركبة </Text>
            <TouchableOpacity onPress={handleChoosePhoto} style={styles.uploadBox}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              ) : (
                <View style={styles.uploadPrompt}>
                  <Text>قم برفع صورة</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>


              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Icon name='check-circle' size={60} color='green' />
                    <Text style={styles.modalText}>تم رفع البلاغ بنجاح</Text>
                    <Text style={styles.modalSubText}>رقم البلاغ: #0001</Text>
                    <TouchableOpacity
                      style={styles.buttonClose}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.textStyle}>الرجوع للبلاغات</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>

         
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
    backgroundColor: '#f9f9f9', // Light grey background
    color: '#dcdcdc', // Text color
    fontSize: 16,
    fontFamily: 'Cairo-Regular', // Replace with the font you are using
    textAlignVertical: 'top', // Start the text from the top on Android
    textAlign: 'right',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#016E46',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'right',
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
    fontFamily: 'Cairo-Regular', // Replace with the font you are using
  
    textAlign: 'center',
    height: 100, // Set a fixed height or make it dynamic as per your needs
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


  // for conformaiton model

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  modalSubText: {
    marginBottom: 15,
    textAlign: "center",
    color: 'gray'
  }

});

export default accidentInformation;
