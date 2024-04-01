import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

function ReportSection({ navigation }) {
    
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          {/* Icon would be here, use an image or an icon library */}
          <Text>Menu</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>اهلا بك عبد!</Text>
        <TouchableOpacity style={styles.addButton}>
          {/* Plus icon */}
          <Text>+</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text>البيانات</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text>الإعدادات</Text>
        </TouchableOpacity>
      </View>

      {/* List of Items */}
      <ScrollView style={styles.itemList}>
        {/* Repeat this View for each item in your data array */}
        <View style={styles.itemCard}>
          <Text style={styles.itemText}>
            {/* Insert text here */}
            وصف البيان وصف البيان وصف البيان وصف البيان وصف البيان
          </Text>
          <Text style={styles.itemTime}>00:51AM</Text>
          <Text style={styles.itemDate}>23 / 01 / 2024</Text>
          <Text style={styles.itemNumber}>#0001</Text>
        </View>
        {/* ... other items */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#F8F8F8',
  },
  menuButton: {
    // styling for the menu button
  },
  addButton: {
    // styling for the add button
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#E8E8E8',
  },
  tab: {
    // styling for tabs
  },
  itemList: {
    flex: 1,
  },
  itemCard: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    elevation: 3,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 2 },
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  itemTime: {
    fontSize: 14,
    color: '#666',
  },
  itemDate: {
    fontSize: 14,
    color: '#666',
  },
  itemNumber: {
    fontSize: 14,
    color: '#666',
    alignSelf: 'flex-end',
  },
});

export default ReportSection;
