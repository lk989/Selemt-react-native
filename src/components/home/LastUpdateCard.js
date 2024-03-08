import { View, Text, Image, FlatList, TouchableOpacity, Button } from "react-native";
import SText from "../SText";
import PieChart from 'react-native-pie-chart';


const LastUpdateCard = () => {
    return (
        // <View className="flex-1">
            <View className="bg-white rounded-lg p-3 flex-1">
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
        // </View>
    );
}
 
export default LastUpdateCard;