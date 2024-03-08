import { Text } from "react-native";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';

const translations = {
  ar: require('../langs/ar.json'),
  en: require('../langs/en.json'),
};
const i18n = new I18n(translations);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

const SText = (props) => {
    return ( 
        <Text className={props.classes}>{i18n.t(props.text)}</Text>
    );
}
 
export default SText;