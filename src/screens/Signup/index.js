// ? libraries imports
import { View, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import axios from 'axios';
import Toast from 'react-native-toast-message';

// ? components imports
import SText from "../../components/SText";
import { BASE_URL, appLocale } from '../../config/config';
import { validPhone, extractCleanPhone, showErrorToast } from '../../utils/utils';

function Signup({ navigation }) {

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [disabledSignup, setDisabledSignup] = useState(true);

  const namePlaceholder = appLocale == 'en' ? 'Mohammed Alghamdi' : 'محمد الغامدي'

  // ? checks name input
  const handleName = (nameInput) => {
    setName(nameInput)
    setDisabledSignup(!(nameInput.length > 0 && validPhone(phone)))
  }

  // ? checks phone input
  const handlePhone = (phoneNumber) => {
    setPhone(extractCleanPhone(phoneNumber));
    setDisabledSignup(!(name.length > 0 && validPhone(phoneNumber)))
  }

  const signup = () => {
    axios.post(`${BASE_URL}register`,
      { phone: phone, name: name },
      { headers: { 'Accept-Language': appLocale } })
      .then(function (response) {
        axios.post(`${BASE_URL}send-otp`, {
          phone: response.data.user.phone,
        })
          .then(function (response) {
            let otp = response.data.verification;
            navigation.navigate('OTP', { otpData: otp, screen: 'Signup' });
          })
          .catch(function (error) {
            showErrorToast(error.response.data.message);
            setDisabledSignup(true)
          });
        })
      .catch(function (error) {
        showErrorToast(error.response.data.message);
        setDisabledSignup(true)
      }
    );
  }

  return (
    <KeyboardAvoidingView className="h-full" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="p-4 space-y-8 my-auto">
        <View className="items-center space-y-8">
          <Image source={require("../../assets/images/logo.png")} className="" />
          <View className="flex-row">
            <SText text='new-signup' classes="text-green font-semibold text-lg" />
          </View>
          <View className="w-full space-y-2">
            <SText text='name' classes="text-black font-semibold text-lg" />
            <TextInput
              className="border border-light-green bg-white rounded-md py-3 px-2 text-green font-bold"
              onChangeText={handleName}
              value={name}
              placeholder={namePlaceholder}
              placeholderTextColor="#ABC7BD"
            />
          </View>
          <View className="w-full space-y-2">
            <SText text='phone' classes="text-black font-semibold text-lg" />
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
              />
            </View>
          </View>
        </View>
        <TouchableOpacity className={`${disabledSignup ? 'bg-light-green' : 'bg-green'} rounded-md`} onPress={() => signup()} disabled={disabledSignup}>
          <SText text='signup' classes="text-white text-center text-xl p-2" />
        </TouchableOpacity>
        <View className="flex-row justify-center">
          <SText text='have-account' classes="text-black text-center text-sm font-semibold" />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <SText text='sign-in' classes="text-green text-center text-sm font-semibold" />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableWithoutFeedback>
      <Toast />
    </KeyboardAvoidingView>
  );
}
export default Signup;