import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ScrollView, StatusBar, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import RNPickerSelect from 'react-native-picker-select';
import Layout from '../../components/Layout';
import SText from '../../components/SText';
import { getLocales } from 'expo-localization';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
// import { launchImageLibrary } from 'react-native-image-picker';

function AccidentInformation({ navigation }) {
  let appLocale = getLocales()[0].languageCode;
  const [directionList, setDirectionList] = useState([]);
  const [streetTypeList, setStreetTypeList] = useState([]);
  const [movementList, setMovementList] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}accident-options`)
      .then(response => {
        const directionOptions = response.data.directions.map(option => ({
          label: appLocale === 'ar' ? option.name_ar : option.name_en,
          value: option.id,
        }));
        setDirectionList(directionOptions);

        console.log(localilzedName)
        const streetTypeOptions = response.data.street_types.map(option => ({
          label: appLocale === 'ar' ? option.name_ar : option.name_en,
          value: option.id,
        }));
        setStreetTypeList(streetTypeOptions);

        const movementOptions = response.data.movements.map(option => ({
          label: appLocale === 'ar' ? option.name_ar : option.name_en,
          value: option.id,
        }));
        setMovementList(movementOptions);
      })
      .catch(error => console.error('Error fetching options:', error));
    }, []); 

  let selectPlaceholder = { label: appLocale == 'ar' ? "اختر" : "Choose", value: '' };
  let descriptionPlaceholder = { label: appLocale == 'ar' ? "اكتب وصف الحادث هنا ..." : "Descripe the accident here ...", value: '' };
  
  const linesList = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ]
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({});
  const [imageUri, setImageUri] = useState(null);

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
  };


  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
  
    // launchImageLibrary(options)
    //   .then(response => {
    //     if (response.assets && response.assets.length > 0) {
    //       const source = { uri: response.assets[0].uri };
    //       setImageUri(source.uri);
    //     }
    //   })
    //   .catch(error => {
    //     console.log('Error picking the image: ', error);
    //   });
      
  };
  
  return (
    <Layout>
      <View style={styles.sectionContainer}>
        <SText text='accident-information' classes="text-green text-lg font-bold p-4"/>

        {/* First Picker */}
        <View style={styles.formGroup}>
          <SText text='direction' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('direction', value)}
            items={directionList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/* Second Picker */}
        <View style={styles.formGroup}>
          <SText text='street-type' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('streetType', value)}
            items={streetTypeList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/*  Third Picker */}
        <View style={styles.formGroup}>
          <SText text='lines-number' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('Directionstreet', value)}
            items={linesList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/* forth Picker */}
        <View style={styles.formGroup}>
          <SText text='movement-before' classes="font-semibold mb-2"/>
          <RNPickerSelect 
            onValueChange={(value) => handleInputChange('accidentCause', value)}
            items={movementList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/* Text Input */}
        <View style={styles.formGroup}>
          <SText text='accident-description' classes="font-semibold mb-2"/>
          <TextInput
            style={styles.textArea}
            onChangeText={(text) => handleInputChange('accidentDetails', text)}
            value={formData.accidentDetails}
            // placeholder={descriptionPlaceholder}
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

      
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>التالي</Text>
      </TouchableOpacity>
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
});

export default AccidentInformation;
