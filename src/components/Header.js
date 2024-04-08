import { TouchableOpacity, View } from "react-native";
import SText from "./SText";
import { Icon } from 'react-native-elements'


const Header = () => {
    let name = 'لمى بوقس';
    return ( 
        <View className="bg-white p-4 pt-20 flex-row justify-between items-center z-50">
            <SText text='hello' params={name} classes="text-green text-2xl"/>
            <TouchableOpacity>
                <Icon name='menu' color='#ABC7BD' size={22}/>
            </TouchableOpacity>
        </View>
    );
}
 
export default Header;