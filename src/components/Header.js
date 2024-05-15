import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from 'react-native-elements';
import SText,{ setLocale }from "./SText";
import { useState } from "react";
import { getLocales } from "expo-localization";


const hello = () => {
    console.log('object')
};
const Header = ({ navigation }) => {
    let name = 'Lama Bugis';
    const [locale, setLocaleState] = useState(getLocales()[0].languageCode);
    const toggleLanguage = () => {
        const newLocale = locale.startsWith('en') ? 'ar' : 'en';
        setLocale(newLocale);
        setLocaleState(newLocale);
    }

    return ( 
        <View className="bg-white p-4 pt-20 flex-row justify-between items-center z-50">
            <SText text='hello' params={name} classes="text-green text-2xl"/>
            <View className="flex-row space-x-2">
                <TouchableOpacity className="border rounded-full p-2 border-light-gray shadow-sm">
                    <Icon name='language-outline' type="ionicon" color='#ABC7BD' size={16} onPress={toggleLanguage}/>
                </TouchableOpacity>
                <TouchableOpacity className="border rounded-full p-2 border-light-gray shadow-sm">
                    <Icon name='person-outline' type="ionicon" color='#ABC7BD' size={16} onPress={() => navigation.navigate('ProfileScreen')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}
 
export default Header;