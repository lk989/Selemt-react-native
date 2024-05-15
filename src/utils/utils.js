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