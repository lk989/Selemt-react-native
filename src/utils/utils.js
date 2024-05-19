import Toast from "react-native-toast-message";

// ? validate entered phone number
export function extractCleanPhone(phone){
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.charAt(0) !== "5") {
      cleanPhone = cleanPhone.substring(1);
    }
    return cleanPhone;
}

// ? checks phone number's length
export function validPhone(phone){
    return extractCleanPhone(phone).length == 9;
}

// ? accepts only digits
export function extractCleanNumber(number){
  let cleanNumber = number.replace(/\D/g, "");
  return cleanNumber;
}

// ? taost error
export function showErrorToast(message, topOffset = 70){
  Toast.show({
    type: 'error', text1: message, topOffset: topOffset
  });
}

// ? taost success
export function showSuccessToast(message, topOffset = 70){
  Toast.show({
    type: 'success', text1: message, topOffset: topOffset
  });
}

// ? dateTime to date string
export function formatDate(dateTimeString){
  const date = new Date(dateTimeString);
  return date.toDateString(); 
};

// ? dateTime to time string
export function formatTime(dateTimeString){
  const date = new Date(dateTimeString);
  return date.toLocaleTimeString(); 
};

// ? date to string
export function dateToString(date){
  let day = String(date.getDate()).padStart(2, '0'); 
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

// ? string to date
export function stringToDate(stringDate){
  const [day, month, year] = stringDate.split('/').map(Number);
  return new Date(year, month - 1, day); 
};