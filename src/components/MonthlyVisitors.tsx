import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
const values = [85, 125, 165, 65, 145, 180];

export default function MonthlyVisitors() {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Monthly Visitors & Explorers</Text>
          <Text style={styles.subtitle}>
            Platform analytics & member expedition bookings for 2026
          </Text>
        </View>

        <View style={styles.dropdown}>
          <Text style={styles.dropdownText}>Last 6 Months ▾</Text>
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
                    index === values.length - 1 ? '#0B5CAD' : '#93C5FD',
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
    height: 330,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },

  dropdown: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F8FAFC',
  },

  dropdownText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },

  chart: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 4,
  },

  barColumn: {
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  bar: {
    width: 44,
    borderRadius: 8,
  },

  month: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
    color: '#475569',
  },
});