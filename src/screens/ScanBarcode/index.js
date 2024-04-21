import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Linking, TouchableOpacity } from 'react-native';
import { CameraView, Camera } from "expo-camera/next";
import Layout from "../../components/Layout";
import SText from "../../components/SText";
import axios from "axios";
import { BASE_URL } from '../../config/config';

const ScanBarcode = ({navigation}) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      axios.post(`${BASE_URL}validate-qr-code`, {data: data})
          .then(function (response) {
              if (response.data == 1) {
                navigation.navigate('Home');
              }
              else {
                  alert(`${data}`);
              }
        })
        .catch(function (error) {
            console.error("Error fetching QR code:", error.response.data.message);
        });
      
    // Check if `data` is a URL. This is a basic check; adjust according to your needs.
    // const isValidUrl = (url) => {
    //   let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    //     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    //     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    //     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    //   return !!pattern.test(url);
    // };
  
    // if (isValidUrl(data)) {
    //   Linking.openURL(data).catch(err => console.error('An error occurred', err));
    // } else {
    // }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
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
                    {scanned && (
                        <TouchableOpacity onPress={() => setScanned(false)} className="border border-green rounded-md bg-white">
                            <SText text='scan-again' classes="text-green font-medium text-justify py-3 text-center" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default ScanBarcode;
