import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from "react-native";
import SText from "../../components/SText";
import OtpInput from "./components/OtpInput";
import { Icon } from 'react-native-elements'


function OTP({ navigation }) {
    return (
      <View className="p-4 space-y-8 my-auto">
        <View className="items-center space-y-8">
          <SText text='validate-phone' classes="text-green font-bold text-xl pb-4"/>
          <SText text='enter-otp' classes="text-black font-semibold"/>
          <Text>+966 ** *** ***</Text>
          <View className="flex-row">
            <OtpInput/>
          </View>
        </View>
        <TouchableOpacity className="bg-green rounded-md" onPress={() => navigation.navigate('Home')}>
          <SText text='validate' classes="text-white text-center text-xl p-2"/>
        </TouchableOpacity>
      </View>
    );
}
export default OTP;