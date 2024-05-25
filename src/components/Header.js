import { TouchableOpacity, View, Text } from "react-native";
import { Icon } from 'react-native-elements';
import { useEffect, useState } from "react";
import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SText,{ setLocale }from "./SText";

const Header = ({ navigation, buttons = [] }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        // ? retreiving the user's name from the session
        AsyncStorage.getItem('userName')
        .then(userNameString => {
          if (userNameString) {
            setName(userNameString)
          } else {
            console.log('No user name found.');
          }
        })
        .catch(error => {
          console.error('Error retrieving user name:', error);
        });
      }, []); 

    const [locale, setLocaleState] = useState(getLocales()[0].languageCode);
    const toggleLanguage = () => {
        const newLocale = locale.startsWith('en') ? 'ar' : 'en';
        setLocale(newLocale);
        setLocaleState(newLocale);
    }

  return ( 
    <View className="bg-white p-4 pt-20 flex-row justify-between items-center z-50">
      <View className="flex-row space-x-2">
        {buttons.includes('lang') ?
          <TouchableOpacity className="border rounded-full p-2 border-light-gray shadow-sm">
              <Icon name='language-outline' type="ionicon" color='#ABC7BD' size={16} onPress={toggleLanguage}/>
          </TouchableOpacity>
        : ''}
        {buttons.includes('profile') ?
          <TouchableOpacity className="border rounded-full p-2 border-light-gray shadow-sm">
              <Icon name='person-outline' type="ionicon" color='#ABC7BD' size={16} onPress={() => navigation.navigate('ProfileScreen')}/>
          </TouchableOpacity>
        : ''}
        {buttons.includes('home') ?
          <TouchableOpacity className="border rounded-full p-2 border-light-gray shadow-sm">
              <Icon name='home' type="antdesign" color='#ABC7BD' size={16} onPress={() => navigation.navigate('Home')}/>
          </TouchableOpacity>
        : ''}
        {buttons.includes('back') ?
          <TouchableOpacity className="p-2">
              <Icon name='chevron-back' type="ionicon" color='#016E46' size={20} onPress={() => navigation.goBack()}/>
          </TouchableOpacity>
        : ''}
      </View>
      <SText text='hello' params={name} classes="text-green text-2xl"/>
    </View>
  );
}
 
export default Header;