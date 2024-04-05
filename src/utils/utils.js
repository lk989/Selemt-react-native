export function extractCleanPhone(phone){
    let cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.charAt(0) !== "5") {
      cleanPhone = cleanPhone.substring(1);
    }
    return cleanPhone;
}
export function validPhone(phone){
    return extractCleanPhone(phone).length == 9;
}
export function extractCleanNumber(number){
  let cleanNumber = number.replace(/\D/g, "");
  return cleanNumber;
}