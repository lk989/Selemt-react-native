import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera/next';

const ScanBarcode = ({ navigation }) => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

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
                navigation.navigate('AccidentPersonalInfo');
              }
              else {
                  alert('Invalid QR code!');
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

  useEffect(() => {
    if (permission && permission.granted) {
      // Start listening for barcode scans when permission is granted
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function handleCancel() {
    navigation.goBack(); // Navigate back to the previous screen
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} barCodeScannerEnabled={true} onBarCodeScanned={handleBarCodeScanned}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancel}>
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,    
    backgroundColor: 'transparent',
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default ScanBarcode;