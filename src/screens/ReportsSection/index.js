import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,ScrollView,StatusBar     } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import Layout from "../../components/Layout";



const SegmentedControl = ({ navigation }) => {
  const [activeSegment, setActiveSegment] = useState('Reports'); // 'data' or 'objections'
  const listItems = [
    { id: '#0001', time: '00:51 AM', date: '23 / 01 / 2024', text: 'وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ وصف البلاغ'},
    { id: '#0002', time: '00:51 AM', date: '23 / 01 / 2024', text: 'Some other text' },
    // ... other items
    
  ];
  const getCurrentTime = () => {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinute = minute < 10 ? `0${minute}` : minute;
    return `${formattedHour}:${formattedMinute} ${meridiem}`;
  };

  return (
    <>
  <Layout>

      <View style={styles.segmentedControlContainer}>  
      <TouchableOpacity
            style={[
              styles.segmentButton,
              activeSegment === 'objections' ? styles.activeSegment : {},
            ]}
            onPress={() => {
              setActiveSegment('objections');
              navigation.navigate('ObjectionsSection');
            }}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'objections' ? styles.activeSegmentText : {},
              ]}
            >
              الإعتراضات
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.segmentButton,
              activeSegment === 'Reports' ? styles.activeSegment : {},
            ]}
            onPress={() => {
              setActiveSegment('Reports');
              navigation.navigate('ReportsSection');
            }}
          >
            <Text
              style={[
                styles.segmentText,
                activeSegment === 'Reports' ? styles.activeSegmentText : {},
              ]}
            >
              البلاغات
            </Text>
          </TouchableOpacity>
    </View>

    {listItems.map((item, index) => (
  <View key={index} style={styles.card}>
    <View style={styles.cardContent}>
      <View style={styles.cardHeader}>
        <Text style={styles.headerText}>حالة البلاغ</Text>
      </View>
      <Text style={styles.contentText}>{item.text}</Text>
      <Text style={styles.timeText}>{}</Text>
      <Text style={styles.dateText}>{item.date}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>مشاهدة تفاصيل البلاغ</Text>
      </TouchableOpacity>
    </View>
    <Text style={styles.idText}>{item.id}</Text>
  </View>
        ))}
   
   </Layout>      <TouchableOpacity style={styles.addButton}>
        <Icon name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
  backgroundColor:'#F0F0F0',
  },


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
  },
  menuIcon: {
    marginRight: 16,
    color : '#016E46',
    marginTop: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color : '#016E46',
    marginTop: 20,
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
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,

  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  headerText: {
    backgroundColor: '#ABC7BD',
    fontWeight: 'bold',
    paddingHorizontal: 10, // Horizontal padding for left and right
    paddingVertical: 5, // Vertical padding for top and bottom
    borderRadius: 5, // Rounded corners for the highlight effect
    overflow: 'hidden', // Ensures the background does not bleed outside the border radius
    alignSelf: 'flex-start', // Ensures the background only covers the text plus padding
    marginRight: 10, // If you wan
  },
  contentText: {
   marginBottom : 15,
  },
  timeText: {
   
  },
  dateText: {
    marginBottom : 10, 
  
  },
  idText: {
    fontWeight: 'bold',

  },
  button: {
    backgroundColor: '#ABC7BD', // Green background for the button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText:{
    fontWeight: 'bold',
  },
  cardContent: {
    flex: 1, // Take up all available space
    marginRight: 10,
  },
 addButton: {
  position: 'absolute',
  bottom: 20,
  left: 20,
  width: 56,
  height: 56,
  borderRadius: 28,
  backgroundColor: '#016E46',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
},
});


export default SegmentedControl;
