import { getLocales } from "expo-localization";

export const BASE_URL = 'https://selemt.com/api/';
export let appLocale = getLocales()[0].languageCode == 'en' ? 'en' : 'ae';

// export const BASE_URL = 'http://127.0.0.1:8000/api/';