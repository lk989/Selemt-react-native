import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import SText from "../../components/SText";
import { useState } from "react";
import {validPhone, extractCleanPhone} from '../../utils/utils';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import Toast from 'react-native-toast-message';


function Signup({ navigation }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [disabledSignup, setDisabledSignup] = useState(true);

  const handleName = (nameInput) => {
    setName(nameInput)
    setDisabledSignup(!(nameInput.length > 0 && validPhone(phone)))
  }

  const handlePhone = (phoneNumber) => {
    setPhone(extractCleanPhone(phoneNumber));
    setDisabledSignup(!(name.length > 0 && validPhone(phoneNumber)))
  }

  const showErrorRegisterToast = (message) => {
    Toast.show({
      type: 'error',
      text1: message,
      topOffset: 70
    });
  }

  const signup = () => {
    axios.post(`${BASE_URL}register`, {
      phone: phone,
      name: name
    })
    .then(function (response) {
      axios.post(`${BASE_URL}send-otp`, {
        phone: response.data.user.phone,
      })
      .then(function (response) {
        let message = response.data.message;
        let otp = response.data.verification;
        navigation.navigate('OTP', { otpData: otp, message: message , screen: 'Signup'})
      })
      .catch(function (error) {
        showErrorRegisterToast(error.response.data.message);
      });
    })
    .catch(function (error) {
      showErrorRegisterToast(error.response.data.message);
    });
  }

  const [phoneDisabled, setphoneDisabled] = useState(true);
    return (
      <View className="h-full">
        <View className="p-4 space-y-8 my-auto">
          <View className="items-center space-y-8">
            <Image source={require("../../assets/images/logo.png")} className=""/>
            <View className="flex-row">
              <SText text='new-signup' classes="text-green font-semibold text-lg"/>
            </View>
            <View className="w-full space-y-2">
              <SText text='name' classes="text-black font-semibold text-lg"/>
              <TextInput 
                className="border border-light-green bg-white rounded-md py-3 px-2 text-green font-bold"
                onChangeText={handleName}
                value={name}
                placeholder="محمد إبراهيم "
                placeholderTextColor="#ABC7BD"
                returnKeyType='done' // Display "Done" button on the keyboard

              />
            </View>
            <View className="w-full space-y-2">
              <SText text='phone' classes="text-black font-semibold text-lg"/>
              <View className="flex-row space-x-4">
                <View className="border border-light-green bg-white rounded-md px-8 py-3">
                  <Text className="text-light-green font-bold">+966</Text>
                </View>
                <TextInput 
                  className="border border-light-green bg-white rounded-md flex-1 px-2 text-green font-bold"
                  keyboardType='numeric'
                  onChangeText={handlePhone}
                  value={phone}
                  maxLength={9}
                  placeholder="5XXXXXXXX"
                  placeholderTextColor="#ABC7BD"
                  returnKeyType='done' // Display "Done" button on the keyboard
                  onSubmitEditing={signup} 
                />
              </View>
            </View>
          </View>
          <TouchableOpacity className={`${disabledSignup ? 'bg-light-green' : 'bg-green'} rounded-md`} onPress={() => signup()} disabled={disabledSignup}>
          <SText text='signup' classes="text-white text-center text-xl p-2"/>
          </TouchableOpacity>
          <View className="flex-row justify-center">
            <SText text='have-account' classes="text-black text-center text-sm font-semibold"/>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <SText text='sign-in' classes="text-green text-center text-sm font-semibold" />
            </TouchableOpacity>
          </View>
        </View>
        <Toast/>
      </View>
    );
}
export default Signup;