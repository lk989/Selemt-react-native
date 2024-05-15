// ? libraries imports
import { View, Text, Image, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import Toast from 'react-native-toast-message';
import axios from 'axios';

// ? functions and components imports
import {validPhone, extractCleanPhone, showErrorToast} from '../../utils/utils';
import { BASE_URL, appLocale } from '../../config/config';
import SText from "../../components/SText";

function Login({ navigation }) {
  const [phone, setPhone] = useState('');
  const [disabledLogin, setDisabledLogin] = useState(true);

  // ? validate before login
  const handleLogin = (phoneNumber) => {
    setPhone(extractCleanPhone(phoneNumber));
    setDisabledLogin(!validPhone(phoneNumber))
  };

  const login = () => {
    // ? the header is to send the app locale
    axios.post(`${BASE_URL}send-otp`, {phone: phone}, {headers: {
      'Accept-Language': appLocale
    }})
    .then(function (response) {
      let otp = response.data.verification;
      navigation.navigate('OTP', { otpData: otp, screen: 'Login' });
    })
    .catch(function (error) {
      showErrorToast(error.response.data.message);
      setDisabledLogin(true);
    });
  };

    return (
      <View className="h-full">
        <View className="p-4 space-y-8 my-auto">
          <View className="items-center space-y-8">
            <Image source={require("../../assets/images/logo.png")} className=""/>
            <View className="flex-row">
              <SText text='sign-in' classes="text-green font-semibold text-lg"/>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <SText text='or-signup' classes="text-black font-semibold text-lg"/>
              </TouchableOpacity>
            </View>
            <View className="flex-row space-x-4">
              <View className="border border-light-green bg-white rounded-md px-8 py-3">
                <Text className="text-light-green font-bold">+966</Text>
              </View>
              <TextInput 
                className="border border-light-green bg-white rounded-md flex-1 px-2 text-green font-bold"
                keyboardType='numeric'
                onChangeText={handleLogin}
                value={phone}
                maxLength={9}
                placeholder="5XXXXXXXX"
                placeholderTextColor="#ABC7BD"
                returnKeyType='done'
                onSubmitEditing={login}
              />
            </View>
          </View>
          <TouchableOpacity className={`${disabledLogin ? 'bg-light-green' : 'bg-green'} rounded-md`} onPress={() => login()} disabled={disabledLogin}>
          <SText text='sign-in' classes="text-white text-center text-xl p-2"/>
          </TouchableOpacity>
        </View>
        <Toast className="my-12" />
      </View>
    );
}
export default Login;