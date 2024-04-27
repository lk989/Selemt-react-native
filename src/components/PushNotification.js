import axios from 'axios';


const sendPushNotification = async () => {
  const apiUrl = 'https://app.nativenotify.com/api/notification';
  
  const pushData = {
    appId: 21001,
    appToken: 'wbQMKL75qxKvw4vb1Y0uFw',
    title: 'Push title here as a string',
    body: 'Push message here as a string',
    dateSent: '4-27-2024 8:31PM',
  };
  
  try {
    const response = await axios.post(apiUrl, pushData);
    console.log('Push notification sent:', response.data);
  } catch (error) {
    console.error('Error sending push notification:', error);
  }
};