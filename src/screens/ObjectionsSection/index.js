import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,StatusBar     } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { getLocales } from 'expo-localization';
import PlusButton from '../../components/PlusButton';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import SText from '../../components/SText';


const SegmentedControl = ({ navigation }) => {
  let appLocale = getLocales()[0].languageCode;
 
  const [objections, setObjections] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}objections`, {
      params: {
        // !! send a dynamic id here
        user_id: '2'
      }
    })
      .then(response => {
        setObjections(response.data.objections);
      })
      .catch(error => console.error('Error fetching objections:', error.response.data.message));
  }, []); 

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toDateString(); // Returns the date portion only
  };
  const formatTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleTimeString(); // Returns the date portion only
  };

  return (
    <View className="mt-5">
      <ScrollView  style={styles.container}>

        {objections.map((objection, index) => (
          <View key={index} style={styles.card}>
            <View>
              <SText text='code' classes="mx-3 text-center font-bold"/>
              <Text className="mx-3 text-center font-bold">#{objection.id}</Text>
            </View>
            <View className="flex-1 mx-3 space-y-5">
              <View className="flex-row">
                <Text style={{...styles.headerText, backgroundColor: objection.status.color}} className="text-xs">{appLocale == 'ar' ? objection.status.name_ar : objection.status.name_en}</Text>
              </View>
              <Text style={styles.contentText}>{objection.reason}</Text>
              <View className="flex-row justify-between">
                <Text className="text-xs">{formatDate(objection.created_at)}</Text>
                <Text className="text-xs">{formatTime(objection.created_at)}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ObjectionDetails')} style={styles.button}>
                <SText text='view-objection-details' classes="font-semibold"/>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView >
      <PlusButton navigation={navigation}/>
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


export default SegmentedControl;
