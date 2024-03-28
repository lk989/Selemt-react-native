import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import SText from "../../components/SText";
import { useState } from "react";
import {validPhone, extractCleanPhone} from '../../utils/utils';


function Login({ navigation }) {
  const [phone, setPhone] = useState('');
  const [disabledLogin, setDisabledLogin] = useState(true);

  const handleLogin = (phoneNumber) => {
    setPhone(extractCleanPhone(phoneNumber));
    setDisabledLogin(!validPhone(phoneNumber))
  }

    return (
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
            />
          </View>
        </View>
        <TouchableOpacity className={`${disabledLogin ? 'bg-light-green' : 'bg-green'} rounded-md`} onPress={() => navigation.navigate('OTP')} disabled={disabledLogin}>
        <SText text='sign-in' classes="text-white text-center text-xl p-2"/>
        </TouchableOpacity>
      </View>
    );
}
export default Login;