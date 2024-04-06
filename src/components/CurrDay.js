import { Text } from "react-native";
import React, { useState, useEffect } from 'react'

const CurrDay = () => {
  const [currentDay, setCurrentDay] = useState('');

  useEffect(() => {
    const getCurrentDayInArabic = () => {
      const options = { weekday: 'long', timeZone: 'UTC', locale: 'ar' };
      const today = new Date();
      return today.toLocaleDateString('ar', options);
    };
    
    setCurrentDay(getCurrentDayInArabic());
  }, []);

  return (
      <Text>{currentDay}</Text>
  );
};

export default CurrDay;