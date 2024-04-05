import { TouchableOpacity, View, Text } from "react-native";
import SText from "./SText";
import { Icon } from 'react-native-elements'


const hello = () => {
    console.log('object')
};
const Header = ({ navigation }) => {
    let name = 'لمى بوقس';
    return ( 
        <View className="bg-white p-4 pt-20 flex-row justify-between items-center">
            <SText text='hello' params={name} classes="text-green text-2xl"/>
            <TouchableOpacity >
                <Icon name='menu' color='#ABC7BD' size={22} onPress={() => navigation.openDrawer()}/>
            </TouchableOpacity>
        </View>
    );
}
 
export default Header;