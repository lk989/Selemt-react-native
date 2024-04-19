import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
  Button,
  StatusBar,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Layout from "../../components/Layout";


function ProfileScreen() {
    const [profileData, setProfileData] = useState({
        'name': 'John Doe',
        'email': 'john.doe@example.com',
        'phone': '+123456789',
        'birthdate': '1990-01-01',
      });

// Function to return the correct label for each field
const getLabel = (field) => {
    switch (field) {
      case 'name':
        return 'الاسم';
      case 'email':
        return 'البريد الإلكتروني';
      case 'phone':
        return 'رقم الجوال';
      case 'birthdate':
        return 'تاريخ الميلاد';
      default:
        return field;
    }
  };
  
  // Function to return the correct icon name for each field
  const getIconName = (field) => {
    switch (field) {
      case 'name':
        return 'user';
      case 'email':
        return 'envelope';
      case 'phone':
        return 'phone';
      case 'birthdate':
        return 'calendar-alt';
      default:
        return 'question-circle'; // default icon if field is not recognized
    }
  };

  const [editableField, setEditableField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  

  const handleEdit = (field) => {
    setEditableField(field);
    setTempValue(profileData[field]);
    setModalVisible(true);
  };

  const saveEdit = () => {
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [editableField]: tempValue,
    }));
    setModalVisible(false);
  };



  
  return (
    <>
     <Layout>

      <TouchableOpacity onPress={() => console.log('Edit profile image')}>
        <Image
  style={styles.profileImage}
  source={require('../../assets/images/profile-image.jpeg')}
  />
        </TouchableOpacity>

      <ScrollView style={styles.container}>
        <View style={styles.sectionContainer}>
      

      {Object.entries(profileData).map(([field, value]) => (
                <View key={field} style={styles.fieldContainer}>
                {/* Use a function to get the correct icon name based on the field */}
                <Icon
                name={getIconName(field)}
                size={16}
                color="#333"
                
              
              
                style={styles.fieldIcon}
                />
                <View style={styles.textContainer}>
                <Text style={styles.fieldLabel}>{getLabel(field)}</Text>
                <Text style={styles.fieldValue}>{value}</Text>
                </View>
                <TouchableOpacity style={styles.editIcon} onPress={() => handleEdit(field)}>
                <Icon name="pencil-alt" size={16} color="#000" />
                </TouchableOpacity>
            </View>
       ))}


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.modalInput}
                value={tempValue}
                onChangeText={setTempValue}
                autoFocus={true}
              />
              <Button title="Save" onPress={saveEdit} />
              <Button title="Cancel" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
   
      </View>
      </ScrollView>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    padding: 2,
  },

  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4,
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
    color: '#016E46',
    marginTop: 16,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#016E46',
    marginTop: 20,
  },

  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 10,
    margin: 16,
    padding: 16,
  },
  fieldContainer: {
 
    flexDirection: 'row-reverse', // For right-to-left layout
    alignItems: 'center',
    justifyContent: 'space-between', // Aligns items to opposite ends
    marginBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    width: '100%', // Make sure it spans the full width
  },
  textContainer: {
    padding: 8,
    flex: 1, // Takes up the remaining space
    alignItems: 'flex-end', // Aligns text to the right
    marginTop: 25
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    
     
  },
  fieldValue: {
    fontSize: 12,
    color: '#555',
    padding: 7, // Makes the touch area larger
  },
  editIcon: {
    padding: 10, // Makes the touch area larger
    flexDirection: 'row', // Left-to-right layout
    marginBottom: 20,
    color: '#333',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 70,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    width: '100%',
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  // Add other styles as needed
});

export default ProfileScreen;
