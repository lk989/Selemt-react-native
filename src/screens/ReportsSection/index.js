import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,StatusBar     } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import PlusButton from '../../components/PlusButton';
import SText from '../../components/SText';
import axios from 'axios';
import { BASE_URL } from '../../config/config';
import { getLocales } from 'expo-localization';



const SegmentedControl = ({ navigation }) => {
  let appLocale = getLocales()[0].languageCode;
 
  const [reports, setReports] = useState([]);
  const [closedStatus, setClosedStatus] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}reports`, {
      params: {
        // !! send a dynamic id here
        user_id: '2'
      }
    })
      .then(response => {
        setReports(response.data.reports);
        setClosedStatus(response.data.closed_status);
      })
      .catch(error => console.error('Error fetching reports:', error.response.data.message));
  }, []); 

  return (
    <View className="mt-5">
      <ScrollView  style={styles.container}>

        {reports.length > 0 ?
        reports.map((report, index) => (
          <View key={index} style={styles.card}>
            <View>
              <SText text='code' classes="mx-3 text-center font-bold"/>
              <Text className="mx-3 text-center font-bold">#{report.id}</Text>
            </View>
            <View className="flex-1 mx-3 space-y-5">
              <View className="flex-row">
                <Text style={{...styles.headerText, backgroundColor: report.accident.status.color}} className="text-xs">{appLocale == 'ar' ? report.accident.status.name_ar : report.accident.status.name_en}</Text>
              </View>
              <Text style={styles.contentText}>{report.description}</Text>
              <View className="flex-row justify-between">
                <Text className="text-xs">{formatDate(report.created_at)}</Text>
                <Text className="text-xs">{formatTime(report.created_at)}</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ReportDetails', {report: report, closedStatus: closedStatus})} style={styles.button}>
                <SText text='view-report-details' classes="font-semibold"/>
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
    </View>
  );
};

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
    paddingHorizontal: 16, // Horizontal padding for left and right
    paddingVertical: 3, // Vertical padding for top and bottom
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
