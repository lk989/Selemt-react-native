import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity,
  ScrollView, StatusBar, Image, FlatList,
  Modal
} from 'react-native';
import { Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import Layout from '../../components/Layout';
import SText from '../../components/SText';
import { getLocales } from 'expo-localization';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
// import { launchImageLibrary } from 'react-native-image-picker';
import { CameraView, Camera } from "expo-camera/next";
import AsyncStorage from '@react-native-async-storage/async-storage';


function AccidentInformation({ route, navigation }) {
  let appLocale = getLocales()[0].languageCode;
  const [directionList, setDirectionList] = useState([]);
  const [streetTypeList, setStreetTypeList] = useState([]);
  const [movementList, setMovementList] = useState([]);
  const [disabledAccident, setDisabledAccident] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const checkPermission = async () => {
      const permissionStatus = await AsyncStorage.getItem('cameraPermission');
      setHasPermission(permissionStatus === 'granted');
    };
    checkPermission();
  }, []);

  const launchCamera = async () => {
    if (hasPermission) {
      // Launch camera logic
      setShowCamera(true);
    } else {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status === 'granted') {
        setHasPermission(status === "granted");
        await AsyncStorage.setItem('cameraPermission', status);
        launchCamera();
      }
    }
  };

  useEffect(() => {
    axios.get(`${BASE_URL}accident-options`)
      .then(response => {
        const directionOptions = response.data.directions.map(option => ({
          label: appLocale === 'ar' ? option.name_ar : option.name_en,
          value: option.id,
        }));
        setDirectionList(directionOptions);

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

  const selectPlaceholder = { label: appLocale == 'ar' ? "اختر" : "Choose", value: '' };
  const descriptionPlaceholder = appLocale == 'ar' ? "اكتب وصف الحادث هنا ..." : "Descripe the accident here ...";
  
  const linesList = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '7', value: '7' },
  ];

  const damagedAreasList = [
    { label: appLocale == 'ar' ? "المقدمة" : "Front", value: 'front' },
    { label: appLocale == 'ar' ? "المؤخرة" : "Back", value: 'back' },
    { label: appLocale == 'ar' ? "الجانب الايمن" : "Right", value: 'right' },
    { label: appLocale == 'ar' ? "الجانب الايسر" : "Left", value: 'left' },
    { label: appLocale == 'ar' ? "الجانب الامامي الايمن" : "Front right", value: 'front_right' },
    { label: appLocale == 'ar' ? "الجانب الامامي الايسر" : "Front left", value: 'front_left' },
    { label: appLocale == 'ar' ? "الجانب الخلفي الايمن" : "Back right", value: 'back_right' },
    { label: appLocale == 'ar' ? "الجانب الخلفي الايسر" : "Back left", value: 'back_left' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formData, setFormData] = useState({
    // ...{prevFormData},
    direction: '',
    streetType: '',
    numberOfLines: '',
    movement: '',
    description: '',
    damagedAreas: [],
  });
  const [imageUri, setImageUri] = useState(null);


  const handlePress = (option) => {
    let updatedOptions = [...selectedOptions];

    if (updatedOptions.includes(option)) {
        updatedOptions = updatedOptions.filter((updatedOption) => updatedOption !== option);
    } else {
        updatedOptions.push(option);
    }
    setSelectedOptions(updatedOptions)
    handleInputChange('damagedAreas', updatedOptions)
  };
  
  const handleInputChange = (name, value) => {
    let updatedFormData = { ...formData };
    updatedFormData[name] = value;
    const allInputsFilled = Object.values(updatedFormData).every(val => {
      if (typeof val === 'string') {
        return val.trim() !== '';
      }
      return value.length != 0;
    });
    setFormData(updatedFormData);
    setDisabledAccident(!allInputsFilled);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const handleChoosePhoto = () => {
    setShowCamera(true);
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setShowCamera(false);
    }
  };

  // const handleChoosePhoto = () => {
  //   const options = {
  //     mediaType: 'photo',
  //     quality: 1,
  //   };
  
  //   // launchImageLibrary(options)
  //   //   .then(response => {
  //   //     if (response.assets && response.assets.length > 0) {
  //   //       const source = { uri: response.assets[0].uri };
  //   //       setImageUri(source.uri);
  //   //     }
  //   //   })
  //   //   .catch(error => {
  //   //     console.log('Error picking the image: ', error);
  //   //   });
      
  // };
  
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
            onValueChange={(value) => handleInputChange('numberOfLines', value)}
            items={linesList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/* forth Picker */}
        <View style={styles.formGroup}>
          <SText text='movement-before' classes="font-semibold mb-2"/>
          <RNPickerSelect 
            onValueChange={(value) => handleInputChange('movement', value)}
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
            onChangeText={(text) => handleInputChange('description', text)}
            value={formData.accidentDetails}
            placeholder={descriptionPlaceholder}
            multiline={true}
            numberOfLines={4}
          />
        </View>
    
        <View style={styles.formGroup}>
          <SText text='choose-damaged-areas' classes="font-semibold mb-2"/>
          <SText text='choose-more-than-one' classes="text-xs text-light-green mb-2"/>
          <View>
            <FlatList
              data={damagedAreasList}
              numColumns={3} // Render 3 columns per row
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOptions.includes(item.value) && styles.selectedOptionButton, // Apply the selected style conditionally
                  ]}
                  onPress={() => handlePress(item.value)}
                >
                  <Text style={[
                    styles.buttonText2,
                    selectedOptions.includes(item.value) && styles.selectedButtonText, // Apply the selected text style conditionally
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.value.toString()} // Ensure each key is unique
            />
          </View>
        </View>

        {/* Photo Upload */}
        <View style={styles.formGroup}>
          <SText text='vehicle-image' classes="font-semibold mb-2"/>
          <TouchableOpacity onPress={launchCamera} style={styles.uploadBox}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <View style={styles.uploadPrompt}>
                <Icon name="camera-outline" type="ionicon" size={40} color={'#737373'}/>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSubmit} className={`${disabledAccident ? "bg-light-green" : "bg-green"} m-4 rounded-md py-3`} disabled={disabledAccident}>
          <SText text='next' classes="text-white text-center font-semibold"/>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showCamera}
        animationType="slide"
        transparent={true}
      >
        <View className="flex-1">
          <CameraView
            style={{ flex: 1 }}
            className="h-5/6"
            type="back"
            ref={cameraRef}
          />
          <View style={{ position: 'absolute', top: 50, left: 30 }}>
            <TouchableOpacity onPress={() => setShowCamera(false)}>
              <Icon name="x-circle-fill" type='octicon' size={32} color={'#000'}/>
            </TouchableOpacity>
          </View>
          <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20 }}>
            <TouchableOpacity onPress={handleTakePicture} style={styles.cameraButton}>
              <Text style={styles.cameraButtonText}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
