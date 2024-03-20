import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput } from 'react-native';

const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']); 
  const [activeIndex, setActiveIndex] = useState(0); 
  const refs = useRef([]); 

  useEffect(() => {
    refs.current = refs.current.slice(0, otp.length).map((_, index) => refs.current[index] || React.createRef());
  }, [otp.length]);

  useEffect(() => {
    refs.current[0]?.current?.focus();
  }, []);

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '') {
      const nextIndex = index + 1;
      if (nextIndex < otp.length) {
        setActiveIndex(nextIndex);
        refs.current[nextIndex]?.current?.focus();
      }
    }
  };

  const handleBackSpace = (value, e, index) => {
    if(e.nativeEvent.key == 'Backspace'){
        const prevIndex = index - 1;
        if (prevIndex >= 0) {
            setActiveIndex(prevIndex);
            refs.current[prevIndex]?.current?.focus();
        }
    }
  }

  return (
    <View style={{ flexDirection: 'row' }}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={refs.current[index]}
          value={digit}
          onChangeText={(value) => handleOtpChange(index, value)}
          keyboardType="numeric"
          maxLength={1}
          className={`border ${activeIndex === index ? 'border-green text-green' : 'border-light-green text-light-green'} font-bold rounded-md px-4 py-3 mx-2`}
          placeholder='X'
          placeholderTextColor="#ABC7BD"
          editable={activeIndex === index} // Enable/disable input based on activeIndex
          onKeyPress={(e) => handleBackSpace(this.value, e, index)}
        />
      ))}
    </View>
  );
};

export default OtpInput;
