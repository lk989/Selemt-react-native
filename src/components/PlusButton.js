import { View, TouchableOpacity, Modal, Alert, Linking } from "react-native";
import { Icon } from 'react-native-elements'
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Camera } from "expo-camera";

import SText from "./SText";

const PlusButton = ({navigation}) => {
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  // ? get camera permission
  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      await AsyncStorage.setItem('cameraPermission', status);
    };

    getCameraPermissions();
  }, []);

  // ? checks camera permission before proceeding
  const handleInitiateReport = async (screen) => {
    setIsBarcodeModalVisible(false)
    if(hasPermission){
      navigation.navigate(screen)
    }
    else{
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      await AsyncStorage.setItem('cameraPermission', status);
      if(hasPermission){
        navigation.navigate(screen)
      }
      else{
        Alert.alert(
          'Permission Required',
          'Camera permission is required to proceed. Do you want to go to the settings to grant permission?',
          [
            { text: 'Settings', onPress: () => Linking.openSettings()},
            { text: 'Cancel', onPress: () => navigation.navigate('Home'), style: 'cancel'},
          ],
          { cancelable: false }
        );
      }
    }
  };

    return (
        <View className="absolute bottom-10 mx-10">
            <TouchableOpacity onPress={() => setIsBarcodeModalVisible(true)}>
                <Icon name='plus' type='feather' color='#016E46' size={18} reverse/>
            </TouchableOpacity>
            <Modal
            visible={isBarcodeModalVisible}
            onRequestClose={() => setIsBarcodeModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
            transparent>
            <View className="relative flex justify-end h-full">
                <View className="bg-white rounded-t-2xl shadow-lg flex p-2">
                <SText text='initiate-report' classes="text-black py-2 font-bold text-lg text-center mt-8"/>
                <SText text='initiate-report-description' classes="text-black py-2 text-center"/>
                <TouchableOpacity
                className="bg-green mx-6 my-2 rounded"
                underlayColor='#fff'
                onPress={() => {
                  handleInitiateReport('GenerateBarcode');
                }}>
                    <SText text='generate-barcode' classes="text-center text-white py-2"/>
                </TouchableOpacity>
                <TouchableOpacity
                    className="border border-green mx-6 mb-8 rounded"
                    underlayColor='#fff'
                    onPress={() => {
                      handleInitiateReport('ScanBarcode');
                    }}>
                    <SText text='scan-barcode' classes="text-center text-green py-2"/>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
            
        </View>
    );
}


  
export default PlusButton;