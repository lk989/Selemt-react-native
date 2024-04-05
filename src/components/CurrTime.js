
const CurrTime = () => {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const meridiem = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  const formattedMinute = minute < 10 ? `0${minute}` : minute;
  return `${formattedHour}:${formattedMinute} ${meridiem}`;
};

export default CurrTime;