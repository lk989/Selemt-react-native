import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import SText from "../../components/SText";
import { useState } from "react";
import {validPhone, extractCleanPhone} from '../../utils/utils';


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

  const [phoneDisabled, setphoneDisabled] = useState(true);
    return (
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
              />
            </View>
          </View>
        </View>
        <TouchableOpacity className={`${disabledSignup ? 'bg-light-green' : 'bg-green'} rounded-md`} onPress={() => navigation.navigate('OTP')} disabled={disabledSignup}>
        <SText text='signup' classes="text-white text-center text-xl p-2"/>
        </TouchableOpacity>
      </View>
    );
}
export default Signup;