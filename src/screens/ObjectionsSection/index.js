import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL, appLocale } from '../../config/config';
import SText from '../../components/SText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDate, formatTime, showErrorToast } from '../../utils/utils';
import Toast from 'react-native-toast-message';


const ObjectionsSection = ({ navigation }) => {
  const [objections, setObjections] = useState([]);

  useEffect(() => {
    // ? fetching all objections
    AsyncStorage.getItem('userId')
      .then(userIdString => {
      console.log(JSON.parse(userIdString))
      if (userIdString) {
        axios.get(`${BASE_URL}objections`, {params: { user_id: JSON.parse(userIdString)}})
          .then(response => {
            setObjections(response.data.objections);
            setClosedStatus(response.data.closed_status);
          })
          .catch(error => showErrorToast('Error fetching objections:', error.response.data.message));
      } else {
        showErrorToast('No user ID found.');
      }
    })
    .catch(error => {
      showErrorToast('Error retrieving user ID:', error);
    });
  }, []); 

  return (
    <View className="mt-5">
      <ScrollView  style={styles.container}>

        {objections.length > 0 ?
         objections.map((objection, index) => (
          <View key={index} style={styles.card}>
            <View>
              <SText text='code' classes="mx-3 text-center font-bold"/>
              <Text className="mx-3 text-center font-bold">#{objection.id}</Text>
            </View>
            <View className="flex-1 mx-3 space-y-5">
              <View className="flex-row">
                <Text style={{...styles.headerText, backgroundColor: objection.status.color}} className="text-xs">{appLocale == 'en' ? objection.status.name_en : objection.status.name_ar}</Text>
              </View>
              <Text style={styles.contentText}>{objection.reason}</Text>
              <View className="flex-row justify-between">
                <Text className="text-xs">{formatDate(objection.created_at)}</Text>
                <Text className="text-xs">{formatTime(objection.created_at)}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ObjectionDetails', {objection: objection})} style={styles.button}>
                <SText text='view-objection-details' classes="font-semibold"/>
              </TouchableOpacity>
            </View>
          </View>
        ))
      :
      <View>
        <SText text='no-data' classes="text-gray my-4 text-center"/>
      </View>
      }
      </ScrollView >
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#F0F0F0',
    },
  
      segmentedControlContainer: {
        flexDirection: 'row',
        backgroundColor: 'white', // The base color of the segmented control
        borderRadius: 20, // Makes the entire control rounded
        margin: 16,
        overflow: 'hidden',
    },
    segmentButton: {
      flex: 1, // Each button will take up half of the space
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeSegment: {
      backgroundColor: '#ABC7BD', // Active segment background color
      borderRadius:20
  
    },
    segmentText: {
      fontSize: 14,
      textAlign: 'center',
      fontWeight: 'bold',
  
    },
    card: {
      flexDirection: 'row', // Align card children in a row
      justifyContent: 'space-between', // Space between the children
      alignItems: 'center', // Align children vertically in the center
      backgroundColor: '#FFF',
      borderRadius: 10,
      padding: 8,
      paddingTop: 16,
      paddingBottom: 16,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      elevation: 3,
    },
  headerText: {
    paddingHorizontal: 20, // Horizontal padding for left and right
    paddingVertical: 4, // Vertical padding for top and bottom
    borderRadius: 6, // Rounded corners for the highlight effect
    overflow: 'hidden', // Ensures the background does not bleed outside the border radius
    alignSelf: 'flex-start', // Ensures the background only covers the text plus padding
  },
    button: {
      backgroundColor: '#ABC7BD', // Green background for the button
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
    },
});


export default ObjectionsSection;
