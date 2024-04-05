import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Alert ,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

function EditProfile({ navigation }) {
const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: new Date(),
    phoneNumber: "",
    gender: "",
    drivingLicenceType: "",
    insuranceOwned: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  let Name = "محمد";

  const handleInputChange = (name, value) => {
    if (name === "phoneNumber") {
      // Allow only digits
      const cleanedValue = value.replace(/[^\d]/g, '');
  
      // Check if it starts with '0' and is up to 9 digits long
      if ((cleanedValue.startsWith('0') && cleanedValue.length <= 10) || cleanedValue === '') {
        setFormData({...formData, [name]: cleanedValue});
      } else {
        // Optional: Provide feedback to the user why the input was rejected
        Alert.alert("Invalid Input", "Phone number must start with 0 and be 10 digits long.");
      }
    } else {
      // Handle other inputs
      setFormData({...formData, [name]: value});
    }

  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.dateOfBirth;
    setShowDatePicker(Platform.OS === "ios"); // keep showing the picker on iOS
    handleInputChange("dateOfBirth", currentDate);
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
              onChangeText={(value) => handleInputChange("name", value)}
              value={formData.name}
              placeholder="محمد احمد"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>تاريخ الميلاد</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
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
              onChangeText={(value) => handleInputChange("phoneNumber", value)}
              value={formData.phoneNumber}
              placeholder="05XXXXXXXX"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>الجنس</Text>
            <RNPickerSelect
              onValueChange={(value) => handleInputChange("gender", value)}
              items={[
                { label: "ذكر", value: "male" },
                { label: "أنثى", value: "female" },
              ]}
              style={pickerSelectStyles}
              value={formData.gender}
              placeholder={{ label: "أختر", value: null }}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>نوع رخصة القيادة </Text>
            <RNPickerSelect
              onValueChange={(value) =>
                handleInputChange("drivingLicenceType", value)
              }
              items={[
                { label: "خاصة", value: "private" },
                { label: "عمومية", value: "public" },
                { label: "دولية", value: "international" },
              ]}
              style={pickerSelectStyles}
              value={formData.drivingLicenceType}
              placeholder={{ label: "أختر", value: null }}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>هل تملك تأمين؟</Text>
            <RNPickerSelect
              onValueChange={(value) =>
                handleInputChange("insuranceOwned", value)
              }
              items={[
                { label: "لا", value: "no" },
                { label: "نعم", value: "yes" },
              ]}
              value={formData.insuranceOwned}
              style={pickerSelectStyles}
              placeholder={{ label: "أختر", value: null }}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>التالي</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
  menuIcon: {
    marginRight: 16,
    color: "#016E46",
    marginTop: 16,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#016E46",
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  formGroup: {
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 0,
    flexDirection: "column", // Ensures the label and picker are stacked
    alignItems: "stretch", // Stretches children to match the width of the container
    padding: 10,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    padding: 16,
    fontSize: 16,
    color: "#333",
    textAlign: 'right',
  },
  button: {
    backgroundColor: "#016E46",
    borderRadius: 4,
    marginHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  label: {
    marginBottom: 5,
    fontSize: 20,
    textAlign: "right",
  },
  textInput: {
    // Styles for the date text inside the TouchableOpacity
    fontSize: 16,
    color: "#333",
  },
  sectionContainer: {
    backgroundColor: "#FFFFFF", // Choose a suitable background color
    borderRadius: 4,
    margin: 16,
    padding: 16,
    shadowColor: "#000", // These shadow properties are for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 4, // elevation is for Android
  },
  sectionTitle: {
    fontSize: 22,
    color: "#016E46",
    fontWeight: "bold",
    marginBottom: 16, // Add some space below the title
    textAlign: "right", // Center the title text
  },
  picker: {
    height: 10, // Set your desired height
    width: "100%", // Ensure the Picker fills the container width
  },
  placeholder: {
    textAlign: "Right",
  },
});









const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      height: 15,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#dcdcdc",
      borderRadius: 4,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: "white", // match background color
      textAlign: "right", // if you want the text aligned to the right
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: "#dcdcdc",
      borderRadius: 4,
      color: "black",
      paddingRight: 30, // to ensure the text is never behind the icon
      backgroundColor: "white", // match background color
      textAlign: "right", // if you want the text aligned to the right
    },
  
    placeholder: {
      color: "#9EA0A4", // Placeholder text color
    },
  
    iconContainer: {
      top: 5,
      right: 15, // Adjust positioning as needed
    },
  });
  
  export default EditProfile;