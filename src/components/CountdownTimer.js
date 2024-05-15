// ? libraries imports
import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import axios from 'axios';

// ? components imports
import SText from './SText';
import { BASE_URL, appLocale } from '../config/config';
import { showErrorToast } from '../utils/utils';

const CountdownTimer = ({phone, updateOtp}) => {

  const [seconds, setSeconds] = useState(120);
  const [timerExpired, setTimerExpired] = useState(false);

  // ? update counter
  useEffect(() => {
    const countdown = setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setTimerExpired(true);
      }
    }, 1000); // Update every second
    return () => clearTimeout(countdown);
  }, [seconds]);

  const resendOtp = () => {
    axios.post(`${BASE_URL}send-otp`, {phone: phone}, {headers: {
        'Accept-Language': appLocale
      }})
      .then(function (response) {
        console.log(response)
        updateOtp(response.data.verification.value)
        setSeconds(120)
        setTimerExpired(false);
      })
      .catch(function (error) {
        showErrorToast(error);
      });
  }

  // ? Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <View className="mt-6">
      {(timerExpired) ?
        <TouchableOpacity onPress={resendOtp}>
            <SText text='resend-otp' classes="text-green text-center font-semibold"/>
        </TouchableOpacity>
        :
        <View className="flex-row justify-center">
            <SText text='not-receive-otp' classes="text-black font-semibold"/>
            <SText text='resend-otp-duration' classes="text-green font-semibold"
            params={`${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`}/>
        </View>
        }
    </View>
  );
};

export default CountdownTimer;
