import { View, Text, Image, FlatList, TouchableOpacity, Button } from "react-native";
import SText from "../../components/SText";
import LastUpdateCard from "../../components/home/LastUpdateCard";
import PieChart from 'react-native-pie-chart';
import { Icon } from 'react-native-elements'


function Home() {
    return (
      <View className="p-4 gap-8">
        <View className="flex-row justify-between">
          <View className="bg-white rounded-md flex-row px-3 py-1">
            <Icon name='navigation' type='feather' color='#ABC7BD' size={18} />
            <Text className="px-3">مكة المكرمة</Text>
          </View>
          <View className="bg-white rounded-md flex-row px-3 py-1">
            <Icon name='calendar-outline' type='ionicon' color='#ABC7BD' size={18} />
            <Text className="px-3">الاثنين</Text>
            <Text>03/01/2024</Text>
          </View>
        </View>
        <View className="bg-white rounded-2xl gap-6 pb-6">
          <View className="flex-row">
            <View className="bg-light-green rounded-full">
              <Text className=" px-3 py-1 text-xs">تتم المعالجة</Text>
            </View>
          </View>
          <Text className="text-lg font-semibold">رقم الحادث</Text>
          <TouchableOpacity
            className="bg-light-green mx-6 rounded"
            underlayColor='#fff'>
            <SText text='view-report-det' classes="text-center py-2"/>
        </TouchableOpacity>
        </View>
        <View className="gap-y-1">
          <SText text='last-updates' classes="font-bold"/>
          <View className="flex-row gap-4">
            {/* <LastUpdateCard/>
            <LastUpdateCard/> */}
            <View className="flex-1">
              <View className="bg-white rounded-lg p-3">
                  <View className="flex-row justify-between">
                      <SText text='accident-evaluation' classes="font-semibold"/>
                      <Text>#0001</Text>
                  </View>
                  <PieChart
                      className="my-3"
                      widthAndHeight={60}
                      series={[120, 240]}
                      sliceColor={['#016E46', '#ABC7BD']}
                      coverRadius={0.55}
                      coverFill={'#FFF'}
                  />
              </View>
            </View>
            <View className="flex-1">
              <View className="bg-white rounded-lg p-3">
                  <View className="flex-row justify-between">
                      <SText text='accident-evaluation' classes="font-semibold"/>
                      <Text>#0001</Text>
                  </View>
                  <PieChart
                      className="my-3"
                      widthAndHeight={60}
                      series={[120, 240]}
                      sliceColor={['#016E46', '#ABC7BD']}
                      coverRadius={0.55}
                      coverFill={'#FFF'}
                  />
              </View>
            </View>
          </View>
          <View className="flex-row gap-5">
            <View className="flex-1">
              <View className="bg-white rounded-lg p-3">
                <Icon name='comment-alert-outline' type='material-community' color='#ABC7BD' size={22} reverse/>
                <SText text='reports' classes="text-xl px-2 py-1"/>
              </View>
            </View>
            <View className="flex-1">
              <View className="bg-white rounded-lg p-3">
                <Icon name='comment-alert-outline' type='material-community' color='#ABC7BD' size={22} reverse/>
                <SText text='objections' classes="text-xl px-2 py-1"/>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
}
export default Home;