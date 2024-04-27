import { View, TouchableOpacity, Modal,Alert } from "react-native";
import { Icon } from 'react-native-elements'
import React, { useState, useEffect } from 'react';
import SText from "./SText";


const PlusButton = ({navigation}) => {
  const [isOperationModalVisible, setIsOperationModalVisible] = useState(false);
  const [isBarcodeModalVisible, setIsBarcodeModalVisible] = useState(false);

  const handleScanBarcode = () => {
    Alert.alert(
      'Important',
      'Please make sure to allow access to your location and camera for the next steps.',
      [
        {
          text: "I didn't check",
          onPress: () => {navigation.navigate('Home')},
        },
        {
          text: 'I checked',
          onPress: () => {},
        },
      ]
    );
  };
  
    return (
        <View className="my-4">
            <TouchableOpacity onPress={() => setIsBarcodeModalVisible(true)}>
                <Icon name='plus' type='feather' color='#016E46' size={18} reverse/>
            </TouchableOpacity>
            <Modal
            visible={isOperationModalVisible}
            onRequestClose={() => setIsOperationModalVisible(false)}
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
                        handleScanBarcode();
                        setIsOperationModalVisible(false);
                        navigation.navigate('GenerateBarcode');
                      }}>
                    <SText text='generate-barcode' classes="text-center text-white py-2"/>
                </TouchableOpacity>
                <TouchableOpacity
                    className="border border-green mx-6 mb-8 rounded"
                    underlayColor='#fff'
                    onPress={() => {
                        handleScanBarcode();
                        setIsOperationModalVisible(false);
                        navigation.navigate('ScanBarcode');
                      }}>
                    <SText text='scan-barcode' classes="text-center text-green py-2"/>
                </TouchableOpacity>
                </View>
            </View>
            </Modal>
            <Modal
            visible={isBarcodeModalVisible}
            onRequestClose={() => setIsBarcodeModalVisible(false)}
            animationType="slide"
            presentationStyle="pageSheet"
            transparent>
            <View className="relative flex justify-end h-full">
                <View className="bg-white rounded-t-2xl shadow-lg flex p-2">
                <SText text='choose-operation' classes="text-black py-2 font-bold text-lg text-center mt-8"/>
                <TouchableOpacity
                className="bg-light-green mx-6 my-2 rounded flex-row items-center px-4 py-0.5 mb-2"
                underlayColor='#fff'
                onPress={() => {setIsBarcodeModalVisible(false); setIsOperationModalVisible(true);}}>
                    <SText text='initiate-report' classes="text-center text-s text-black p-2"/>
                <Icon name='car-crash' type='font-awesome-5' color='#fff' size={16}/>
                </TouchableOpacity>
                <TouchableOpacity
                className="bg-light-green mx-6 my-2 rounded flex-row justify-start items-center px-4 py-0.5 mb-5"
                underlayColor='#fff'
                onPress={() => {setIsBarcodeModalVisible(false); navigation.navigate('ObjectionsSection')}}>
                    <SText text='Raise-objection' classes="text-center text-s text-black p-2"/>
                <Icon name='alert-circle' type='ionicon' color='#fff' size={20}/>
                </TouchableOpacity>
                </View>
            </View>
            </Modal>
        </View>
    );
}
 
export default PlusButton;