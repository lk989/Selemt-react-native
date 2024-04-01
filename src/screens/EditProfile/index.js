<<<<<<< HEAD
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


function editProfile({ navigation }) {
    
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: new Date(),
    phoneNumber: '',
    gender: '',
    drivingLicenceType: '',
    insuranceOwned: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  let Name = "محمد";

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios'); // keep showing the picker on iOS
    handleInputChange('dateOfBirth', currentDate);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>

      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Icon name="bars" size={24} color="#000" style={styles.menuIcon} />
        <Text style={styles.welcomeText}>اهلا بك {Name}!</Text>
      </View>

      <ScrollView style={styles.container}>

      <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>البيانات الشخصية</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>الاسم</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange('name', value)}
            value={formData.name}
            placeholder="محمد احمد"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>تاريخ الميلاد</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={styles.textInput}>
              {formData.dateOfBirth.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>رقم الجوال </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            value={formData.phoneNumber}
            placeholder="05XXXXXXXX"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>الجنس</Text>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue) => handleInputChange('gender', itemValue)}>
            <Picker.Item label="ذكر" value="male" />
            <Picker.Item label="أنثى" value="female" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>نوع رخصة القيادة </Text>
          <Picker
            selectedValue={formData.drivingLicenceType}
            onValueChange={(itemValue) => handleInputChange('drivingLicenceType', itemValue)}>
            <Picker.Item label="خاصة" value="private" />
            <Picker.Item label="عمومية" value="public" />
            <Picker.Item label="دولية" value="international" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>هل تملك تأمين؟</Text>
          <Picker
            selectedValue={formData.insuranceOwned}
            onValueChange={(itemValue) => handleInputChange('insuranceOwned', itemValue)}>
            <Picker.Item label="لا" value="no" />
            <Picker.Item label="نعم" value="yes" />
          </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>التالي</Text>
        </TouchableOpacity>
      </ScrollView>
      
    </>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  formGroup: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical:0,
    flexDirection: 'column', // Ensures the label and picker are stacked
    alignItems: 'stretch',  // Stretches children to match the width of the container
    padding: 10,       
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#016E46',
    borderRadius: 4,
    marginHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'right',
  },
  textInput: {
    // Styles for the date text inside the TouchableOpacity
    fontSize: 16,
    color: '#333',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',// Choose a suitable background color
    borderRadius: 4,
    margin: 16,
    padding: 16,
    shadowColor: '#000', // These shadow properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4, // elevation is for Android
  },
  sectionTitle: {
    fontSize: 22,
    color: '#016E46',
    fontWeight: 'bold',
    marginBottom: 16, // Add some space below the title
    textAlign: 'right', // Center the title text
  },
  picker: {
    height: 10, // Set your desired height
    width: '100%', // Ensure the Picker fills the container width
  },
  placeholder : {
    textAlign:'right',

  },

});

export default editProfile;


=======
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


function editProfile({ navigation }) {
    
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: new Date(),
    phoneNumber: '',
    gender: '',
    drivingLicenceType: '',
    insuranceOwned: '',
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios'); // keep showing the picker on iOS
    handleInputChange('dateOfBirth', currentDate);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>

      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Icon name="bars" size={24} color="#000" style={styles.menuIcon} />
        <Text style={styles.welcomeText}>اهلا بك محمد!</Text>
      </View>

      <ScrollView style={styles.container}>

      <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>البيانات الشخصية</Text>
        <View style={styles.formGroup}>
          <Text style={styles.label}>الاسم</Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange('name', value)}
            value={formData.name}
            placeholder="محمد احمد"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>تاريخ الميلاد</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text style={styles.textInput}>
              {formData.dateOfBirth.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>رقم الجوال </Text>
          <TextInput
            style={styles.input}
            onChangeText={(value) => handleInputChange('phoneNumber', value)}
            value={formData.phoneNumber}
            placeholder="05XXXXXXXX"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>الجنس</Text>
          <Picker
            selectedValue={formData.gender}
            onValueChange={(itemValue) => handleInputChange('gender', itemValue)}>
            <Picker.Item label="ذكر" value="male" />
            <Picker.Item label="أنثى" value="female" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>نوع رخصة القيادة </Text>
          <Picker
            selectedValue={formData.drivingLicenceType}
            onValueChange={(itemValue) => handleInputChange('drivingLicenceType', itemValue)}>
            <Picker.Item label="خاصة" value="private" />
            <Picker.Item label="عمومية" value="public" />
            <Picker.Item label="دولية" value="international" />
          </Picker>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>هل تملك تأمين؟</Text>
          <Picker
            selectedValue={formData.insuranceOwned}
            onValueChange={(itemValue) => handleInputChange('insuranceOwned', itemValue)}>
            <Picker.Item label="لا" value="no" />
            <Picker.Item label="نعم" value="yes" />
          </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>التالي</Text>
        </TouchableOpacity>
      </ScrollView>
      
    </>
  );
};

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  formGroup: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical:0,
    flexDirection: 'column', // Ensures the label and picker are stacked
    alignItems: 'stretch',  // Stretches children to match the width of the container
    padding: 10,       
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#016E46',
    borderRadius: 4,
    marginHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: 'right',
  },
  textInput: {
    // Styles for the date text inside the TouchableOpacity
    fontSize: 16,
    color: '#333',
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',// Choose a suitable background color
    borderRadius: 4,
    margin: 16,
    padding: 16,
    shadowColor: '#000', // These shadow properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4, // elevation is for Android
  },
  sectionTitle: {
    fontSize: 22,
    color: '#016E46',
    fontWeight: 'bold',
    marginBottom: 16, // Add some space below the title
    textAlign: 'right', // Center the title text
  },
  picker: {
    height: 10, // Set your desired height
    width: '100%', // Ensure the Picker fills the container width
  },
  placeholder : {
    textAlign:'right',

  },

});

export default editProfile;


>>>>>>> 1a149e570b47fb90c580e6fea57a7f50614d742d
