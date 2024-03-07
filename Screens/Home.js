import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";

function Home() {
    return (
      <View className="p-4 gap-8">
        <View className="flex-row justify-between">
          <View className="bg-white rounded-md flex-row px-3 py-1">
            <Image source={require("../assets/images/location.png")} className="w-4 h-4 object-contain"/>
            <Text className="px-3">مكة المكرمة</Text>
          </View>
          <View className="bg-white rounded-md flex-row px-3 py-1">
            <Image source={require("../assets/images/calendar.png")} className="w-4 h-4 object-contain"/>
            <Text className="px-3">الاثنين</Text>
            <Text>03/01/2024</Text>
          </View>
        </View>
        <View className="bg-white rounded-lg gap-6">
          <View className="flex-row">
            <View className="bg-light-green rounded-lg">
              <Text className=" px-2 py-1 text-xs">تتم المعالجة</Text>
            </View>
          </View>
          <Text className="text-lg font-semibold">رقم الحادث</Text>
        </View>
      </View>
    );
}
export default Home;