import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const values = [85, 125, 165, 65, 145, 180];

export default function MonthlyVisitors() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Monthly Visitors</Text>
          <Text style={styles.subtitle}>
            Club activity overview for 2024
          </Text>
        </View>

        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Last 6 Months⌄</Text>
        </View>
      </View>

      <View style={styles.chart}>
        {values.map((value, index) => (
          <View style={styles.barColumn} key={months[index]}>
            <View
              style={[
                styles.bar,
                {
                  height: value,
                  backgroundColor:
                    index === values.length - 1 ? '#78A8C8' : '#2D466E',
                },
              ]}
            />

            <Text style={styles.month}>{months[index]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 450,
    height: 300,
    borderWidth: 1,
    borderColor: '#EEE4D7',
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#17253A',
  },

  subtitle: {
    fontSize: 8,
    color: '#555555',
    marginTop: 4,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#BBBBBB',
    borderRadius: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    height: 27,
  },

  dropdownText: {
    fontSize: 7,
  },

  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginTop: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  barColumn: {
    height: 210,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  bar: {
    width: 40,
    borderRadius: 5,
  },

  month: {
    fontSize: 7,
    marginTop: 8,
    marginBottom: 5,
    color: '#333333',
  },
});