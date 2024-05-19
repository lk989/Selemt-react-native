import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';

import { Icon } from 'react-native-elements'
import Layout from "../../components/Layout";
import SText from '../../components/SText';
import { BASE_URL, appLocale } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { dateToString, showErrorToast, showSuccessToast } from '../../utils/utils';
import Toast from 'react-native-toast-message';


function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    'name': '',
    'phone': '',
    'birthdate': '',
  });

  useEffect(() => {
    // ? fetching reports using user id
    AsyncStorage.getItem('userId')
    .then(userIdString => {
      if (userIdString) {
        axios.get(`${BASE_URL}user-info`, {params: { user_id: JSON.parse(userIdString)}})
          .then(response => {
            const userData = response.data.user;
            setProfileData(prevFormData => ({
              ...prevFormData,
              name: userData.name,
              phone: userData.phone,
              birthdate: (userData.date_of_birth !== null) ?
              dateToString(new Date(userData.date_of_birth)) : dateToString(new Date()),
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

// Function to return the correct label for each field
const getLabel = (field) => {
    switch (field) {
      case 'name':
        return appLocale == 'en' ? 'Name' : 'الاسم';
      case 'phone':
        return appLocale == 'en' ? 'Phone' : 'رقم الجوال';
      case 'birthdate':
        return appLocale == 'en' ? 'Birthdate' : 'تاريخ الميلاد';
      default:
        return field;
    }
  };
  
  // Function to return the correct icon name for each field
  const getIconName = (field) => {
    switch (field) {
      case 'name':
        return 'person-outline';
      case 'phone':
        return 'call-outline';
      case 'birthdate':
        return 'calendar-outline';
      default:
        return 'question-circle'; // default icon if field is not recognized
    }
  };

  const [editableField, setEditableField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleEdit = (field) => {
    setEditableField(field);
    setTempValue(profileData[field]);
    setModalVisible(true);
  };

  const saveEdit = () => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [editableField]: tempValue,
    }));
    setModalVisible(false);
    AsyncStorage.getItem('userId')
    .then(userIdString => {
      if (userIdString) {
        const updatedProfileData = {
          ...profileData,
          [editableField]: tempValue,
        };
        axios.post(`${BASE_URL}edit-user`,
        { user_id: JSON.parse(userIdString), name: updatedProfileData['name'], birthdate: updatedProfileData['birthdate']},
        { headers: { 'Accept-Language': appLocale } })
          .then(response => {
            showSuccessToast(response.data.message, 30)
          })
          .catch(error => {showErrorToast(error.response.data.message)
            console.log(error.response.data.message)
          });
      } else {
        console.log('No user ID found.');
      }
    })
    .catch(error => {
      console.error('Error retrieving user ID:', error);
    });
  };
  
  return (
     <Layout>
        <View className="rounded-md p-4 bg-white my-auto">
          <SText text='profile-settings' classes="text-green text-lg font-bold p-4"/>
      
          {Object.entries(profileData).map(([field, value]) => (
            <View key={field} className="flex-row px-4 py-3 justify-between">
              <View className="flex-row">
                <Icon name={getIconName(field)} size={20} type="ionicon" color="#016E46" className=""/>
                <View className="flex-col mx-3">
                  <Text className="text-black font-bold">{getLabel(field)}</Text>
                  <Text className="text-gray p-2">{value}</Text>
                </View>
              </View>
              {field != 'phone' ? 
                <TouchableOpacity className="" onPress={() => handleEdit(field)}>
                  <Icon name="edit" type="feather" size={12} color="#000" />
                </TouchableOpacity>
              :
              <></>
              }
            </View>
          ))}
        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View className="h-full ">
            <View className="my-auto bg-white shadow-md shadow-gray mx-4 border border-light-gray rounded-2xl">
              <TextInput
                className="border border-[#dddddd] rounded-md p-3 m-4"
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus={true}
              />
              <View className="flex-row mx-4 mb-3 space-x-2">
                <TouchableOpacity className="bg-green rounded-md flex-1" onPress={saveEdit}>
                  <SText text='save' classes="text-white text-center font-semibold py-2"/>
                </TouchableOpacity>
                <TouchableOpacity className="bg-white border flex-1 border-green rounded-md" onPress={() => setModalVisible(false)}>
                  <SText text='cancel' classes="text-green text-center font-semibold py-2"/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <Toast />
      </Layout>
  );
}

export default ProfileScreen;
