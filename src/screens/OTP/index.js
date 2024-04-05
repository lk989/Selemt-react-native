import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import SText from "../../components/SText";
import { Icon } from 'react-native-elements';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import Toast from 'react-native-toast-message';
import {extractCleanNumber} from '../../utils/utils';
import { useState } from "react";

function OTP({ route, navigation }) {
  const { otpData, message, screen } = route.params;

  const [otp, setOtp] = useState(''); 

  const handleOtp = (otp) => {
    setOtp(extractCleanNumber(otp));
  };

  const showErrorOtpToast = (message) => {
    Toast.show({
      type: 'error',
      text1: message,
      topOffset: 70
    });
  }

  const validateOtp = () => {
    axios.post(`${BASE_URL}login`, {
      phone: otpData.phone,
      otp: otp
    })
    .then(function (response) {
      navigation.navigate('Home')
    })
    .catch(function (error) {
      showErrorOtpToast(error.response.data.message);
      // setDisabledLogin(true);
    });
  };
  const handleGoBack = () => {
    navigation.navigate(screen);
  }
    return (
      <View className="h-full">
        <TouchableOpacity className="absolute top-20 mx-8" onPress={handleGoBack}>
        <Icon name='chevron-back-outline' type='ionicon' color='#016E46' size={20} />
        </TouchableOpacity>
        <View className="p-4 space-y-8 my-auto">
          <View className="items-center space-y-5">
            <SText text='validate-phone' classes="text-green font-bold text-xl pb-4"/>
            <SText text='enter-otp' classes="text-black font-semibold"/>
            <Text className="text-green font-semibold">{'+966' + otpData.phone}</Text>
            <Text className="text-xs">{otpData.value}</Text>
            <View className="flex-row">
            <TextInput
              value={otp}
              onChangeText={(value) => handleOtp(value)}
              keyboardType="numeric"
              maxLength={4}
              className="border border-light-green bg-white rounded-md flex-1 text-center py-3 mx-20 text-green font-bold"
              placeholder='X X X X'
              placeholderTextColor="#ABC7BD"
            />
            </View>
          </View>
          <TouchableOpacity className="bg-green rounded-md" onPress={() => validateOtp()}>
            <SText text='validate' classes="text-white text-center text-xl p-2"/>
          </TouchableOpacity>
        </View>
        <Toast />
      </View>
    );
}
export default OTP;