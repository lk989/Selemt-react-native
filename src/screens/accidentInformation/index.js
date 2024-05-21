import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, FlatList, Modal} from 'react-native';
import { Icon } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select';
import { getLocales } from 'expo-localization';
import axios from 'axios';
import { CameraView, Camera } from "expo-camera";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Layout from '../../components/Layout';
import SText from '../../components/SText';
import { BASE_URL, appLocale } from '../../config/config';


function AccidentInformation({ route, navigation }) {
  let prevFormData = route.params.formData;

  const cameraRef = useRef(null);
  
  const [directionList, setDirectionList] = useState([]);
  const [streetTypeList, setStreetTypeList] = useState([]);
  const [movementList, setMovementList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [disabledAccident, setDisabledAccident] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isConfirmationModalVisible, setisConfirmationModalVisible] = useState(false);
  const [accidentError, setAccidentError] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);
  const [confirmationText, setConfirmationText] = useState('');
  const [formData, setFormData] = useState({
    ...prevFormData.prevFormData,
    ...prevFormData,
    direction: '',
    streetType: '',
    numberOfLines: '',
    movement: '',
    description: '',
    damagedAreas: [],
  });
  let accidentImage = new FormData();

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

  useEffect(() => {
    // ? check camera permission once the screen is rendered
    const checkPermission = async () => {
      const permissionStatus = await AsyncStorage.getItem('cameraPermission');
      setHasPermission(permissionStatus === 'granted');
    };
    checkPermission();
  }, []);

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
  
  const launchCamera = async () => {
    // ? logic of showing camera
    if (hasPermission) {
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

  const handlePress = (option) => {
    // ? logic of damaged areas buttons
    let updatedOptions = [...selectedOptions];

    if (updatedOptions.includes(option)) {
        updatedOptions = updatedOptions.filter((updatedOption) =>
          updatedOption !== option);
    } else {
        updatedOptions.push(option);
    }
    setSelectedOptions(updatedOptions)
    handleInputChange('damagedAreas', updatedOptions)
  };
  
  const handleInputChange = (name, value) => {
    let updatedFormData = { ...formData };
    updatedFormData[name] = value;
    setFormData(updatedFormData);
  };

  const handleTakePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({base64: true});
      setImageUri(photo.uri);
      setShowCamera(false);
      axios({
        method: "POST",
        url: "https://detect.roboflow.com/accident_detection-trmhu/1",
        params: {api_key: "rcXlc7gsf3g99MQGBOvg"},
        data: photo.base64,
        headers: {"Content-Type": "application/x-www-form-urlencoded"}
      })
      .then(function(response) {
          const allInputsFilled = Object.values(formData).every(val => {
            if (typeof val === 'string') return val.trim() !== '';
            if (Array.isArray(val)) return val.length !== 0;
            if (val === null) return false;
            return true;
          });
          setAccidentError(response.data.predictions.length == 0)
          setDisabledAccident(!allInputsFilled || response.data.predictions.length == 0);
      })
      .catch(function(error) {
          console.log(error.message);
      });
      // accidentImage.append({
      //   uri: photo.uri,
      //   name: 'photo.jpg',
      //   type: 'image/jpg',
      // });
    }
  };

  const handleSubmit = () => {
    console.log(formData)
      axios.post(`${BASE_URL}create-accident-statement`,{formData: formData}, {
        headers: {
          Accept: "application/json",
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(function (response) {
          setConfirmationText(response.data.message);
          setisConfirmationModalVisible(true);
        })
        .catch(function (error) {
            console.error("Error:", error.response.data.message);
        });
  };

  return (
    <Layout>
      <View className="rounded-md p-2 bg-white mb-8">
        <SText text='accident-information' classes="text-green text-lg font-bold p-4"/>

        {/* First Picker */}
        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='direction' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('direction', value)}
            items={directionList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/* Second Picker */}
        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='street-type' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('streetType', value)}
            items={streetTypeList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/*  Third Picker */}
        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='lines-number' classes="font-semibold mb-2"/>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('numberOfLines', value)}
            items={linesList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/* forth Picker */}
        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='movement-before' classes="font-semibold mb-2"/>
          <RNPickerSelect 
            onValueChange={(value) => handleInputChange('movement', value)}
            items={movementList}
            style={pickerSelectStyles}
            placeholder={selectPlaceholder}
          />
        </View>

        {/* Text Input */}
        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='accident-description' classes="font-semibold mb-2"/>
          <TextInput
            className="border border-[#dddddd] px-3 rounded-md text-lg h-40"
            onChangeText={(text) => handleInputChange('description', text)}
            value={formData.accidentDetails}
            placeholder={descriptionPlaceholder}
            multiline={true}
            numberOfLines={4}
          />
        </View>
    
        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='choose-damaged-areas' classes="font-semibold mb-1"/>
          <SText text='choose-more-than-one' classes="text-xs text-light-green mb-1"/>
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
        <View className="mb-4 px-4 py-0 flex-col items-stretch">
          <SText text='vehicle-image' classes="font-semibold mb-1" />
          {imageUri && (<SText text='tap-to-retake' classes="text-xs text-light-green mb-1"/>)}
          <TouchableOpacity onPress={launchCamera} style={styles.uploadBox}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            ) : (
              <View style={styles.uploadPrompt}>
                <Icon name="camera-outline" type="ionicon" size={40} color={'#737373'}/>
              </View>
            )}
          </TouchableOpacity>
          {accidentError ? 
          <SText text='accident-not-recognized' classes="text-[#b91c1c]"/>
          :
          <></>
          }
        </View>
        <TouchableOpacity onPress={handleSubmit} className={`${disabledAccident ? "bg-light-green" : "bg-green"} m-4 rounded-md py-3`} > 
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
            <TouchableOpacity onPress={handleTakePicture}>
              <TouchableOpacity onPress={handleTakePicture} className="border-4 border-light-gray rounded-full w-20 h-20">
                <View className="bg-light-gray w-16 h-16 rounded-full my-auto mx-auto">
                </View>
              </TouchableOpacity>
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
              <SText text='report-created-successfuly' classes="text-black py-4 font-bold text-lg text-center"/>
              <TouchableOpacity
              className="bg-green mx-8 my-1 rounded-full items-center px-4 py-0.5 mb-2"
              underlayColor='#fff'
              onPress={() => {setisConfirmationModalVisible(false); navigation.navigate('Home')}}>
                <SText text='go-home' classes="text-white py-2 font-bold text-lg text-center"/>
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
  sectionTitle: {
    fontSize: 22,
    color: '#016E46',
    fontWeight: 'bold',
    marginBottom: 16, // Add some space below the title
    textAlign: 'right', // Center the title text
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

export default AccidentInformation;
