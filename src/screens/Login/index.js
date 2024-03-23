import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import SText from "../../components/SText";
import { useState } from "react";


function Login({ navigation }) {
  const [cleanNumber, setCleanNumber] = useState('');
  const [phoneDisabeld, setPhoneDisabeld] = useState(true);
  const handleNumberChange = (number) => {
    let cleanedNumber = number.replace(/\D/g, "");
    if (cleanedNumber.charAt(0) !== "5") {
      cleanedNumber = cleanedNumber.substring(1);
    }
    setCleanNumber(cleanedNumber);
    setPhoneDisabeld(cleanedNumber.length != 9)
  };
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
              onChangeText={handleNumberChange}
              value={cleanNumber}
              maxLength={9}
              placeholder="5XXXXXXXX"
              placeholderTextColor="#ABC7BD"
            />
          </View>
        </View>
        <TouchableOpacity className={`${phoneDisabeld ? 'bg-light-green' : 'bg-green'} rounded-md`} onPress={() => navigation.navigate('OTP')} disabled={phoneDisabeld}>
        <SText text='sign-in' classes="text-white text-center text-xl p-2"/>
        </TouchableOpacity>
      </View>
    );
}
export default Login;