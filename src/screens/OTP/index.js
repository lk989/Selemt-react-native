// ? libraries imports
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from 'react-native-elements';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { useState } from "react";

// ? components imports
import {extractCleanNumber, showErrorToast} from '../../utils/utils';
import { BASE_URL, appLocale } from '../../config/config';
import SText from "../../components/SText";
import CountdownTimer from "../../components/CountdownTimer";

function OTP({ route, navigation }) {
  // ? the screen is used to go back to using back arrow
  const { otpData, screen } = route.params;

  const [otpGenerated, setOtpGenerated] = useState(otpData.value); 
  const [otp, setOtp] = useState(''); 
  const [otpDisabled, setOtpDisabled] = useState(true); 

  // ? update OTP after resend
  const updateOtp = (newOtp) => {
    setOtpGenerated(newOtp);
  };

  // ? validate OTP before submit
  const handleOtp = (otp) => {
    setOtp(extractCleanNumber(otp));
    setOtpDisabled(otp.length != 4);
  };

  const validateOtp = () => {
    axios.post(`${BASE_URL}login`,
      { phone: otpData.phone, otp: otp },
      { headers: { 'Accept-Language': appLocale } }
    )
    .then(function (response) {
      // ? save user's data in a session
      AsyncStorage.multiSet([
        ['userId', JSON.stringify(response.data.user.id.toString())],
        ['userToken', response.data.token],
        ['userName', response.data.user.name]
      ])
      .then(() => {
        navigation.navigate('Home')
        })
        .catch(error => {
          console.error('Failed to save user data', error);
        });
    })
    .catch(function (error) {
      showErrorToast(error.response.data.message);
      setOtpDisabled(true);
    });
  };
  const handleGoBack = () => {
    navigation.navigate(screen);
  }
    return (
      <KeyboardAvoidingView className="h-full" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableOpacity className='absolute top-20 mx-8' onPress={handleGoBack}>
      <Icon name='chevron-back-outline' type='ionicon' color='#016E46' size={20} />
      </TouchableOpacity>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="p-4 space-y-8 my-auto">
          <View className="items-center space-y-5">
            <SText text='validate-phone' classes="text-green font-bold text-xl pb-4"/>
            <SText text='enter-otp' classes="text-black font-semibold"/>
            <Text className="text-green font-semibold">{'+966' + otpData.phone}</Text>
            <Text className="text-xs">{otpGenerated}</Text>
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
          <CountdownTimer phone={otpData.phone} updateOtp={updateOtp}/>
          <TouchableOpacity className={`${otpDisabled ? 'bg-light-green' : 'bg-green'} rounded-md`} onPress={() => validateOtp()} disabled={otpDisabled}>
            <SText text='validate' classes="text-white text-center text-xl p-2"/>
          </TouchableOpacity>
        </View>
        </TouchableWithoutFeedback>
        <Toast />
      </KeyboardAvoidingView>
    );
}
export default OTP;