import React, { useState, useEffect } from "react";
import { View, Alert } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import Layout from "../../components/Layout";
import SText from "../../components/SText";
import axios from "axios";
import { BASE_URL } from '../../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanBarcode = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      await AsyncStorage.setItem('cameraPermission', status);
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true);
    const userLocation = await AsyncStorage.getItem('userLocation');
    axios.post(`${BASE_URL}validate-qr-code`, {data: data, userLocation: userLocation})
      .then(function (response) {
        if (response.data != 0) {
          navigation.navigate('AccidentPersonalInfo', {accident_id: response.data, party: '2'});
        }
        else {
          Alert.alert(
            'Invalid QR code!',
            '',
            [
              { text: 'Scan again', onPress: () => setScanned(false)},
              { text: 'Cancel', onPress: () => navigation.navigate('Home'), style: 'cancel'},
            ],
            { cancelable: false }
          );
        }
      })
      .catch(function (error) {
        console.error("Error fetching QR code:", error.response.data.message);
      });
  };

  if (hasPermission === null) {
    return <SText text= 'Requesting-for-camera-permission' classes="text-black py-10 font-bold text-lg text-center mt-8"/>;
  }
  if (hasPermission === false) {
    return <SText text='no-access-cam' classes="text-black py-10 font-bold text-lg text-center mt-20"/>;
  }

  return (
    <Layout>
      <View className="p-2 space-y-12">
        <View className="bg-white rounded-lg shadow-sm w-full aspect-square mt-8">
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
            }}
              width="100%" height="100%" 
          />
        </View>
        <View>
          <SText text='scan-barcode-title' classes="text-xl text-black font-bold text-justify" />
          <SText text='scan-barcode-description' classes="text-black text-lg font-medium text-justify py-4" />
          {/* {scanned && (
            <TouchableOpacity onPress={() => setScanned(false)} className="border border-green rounded-md bg-white">
              <SText text='scan-again' classes="text-green font-medium text-justify py-3 text-center" />
            </TouchableOpacity>
          )} */}
        </View>
      </View>
    </Layout>
  );
}

export default ScanBarcode;
