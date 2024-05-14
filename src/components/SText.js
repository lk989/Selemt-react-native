import React from 'react';
import { Text } from 'react-native';
import { I18n } from 'i18n-js';



const SText = (props) => {
    let params = props.params;
    return ( 
        <Text className={props.classes}>{t(props.text, {params})}</Text>
    );
}

const translations = {
  en: require('../langs/en.json'), 
  ar: require('../langs/ar.json'),
};

const i18n = new I18n(translations);

// Check if the current locale is Arabic or default to Arabic if not set

export function t(key, params = {}) {
  return i18n.t(key, params);
}

export function setLocale(locale) {
  i18n.locale = locale;
}
 
export default SText;


//const SText = ({ text, params = {}, style }) => {
  //return <Text style={style}>{t(text, params)}</Text>;