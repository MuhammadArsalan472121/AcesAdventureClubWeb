import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type StatCardProps = {
  icon: string;
  value: string;
  label: string;
  change: string;
};

export default function StatCard({
  icon,
  value,
  label,
  change,
}: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.change}>{change}</Text>
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
    height: 105,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  icon: {
    color: '#78A8C8',
    fontSize: 18,
  },

  change: {
    color: '#35A866',
    fontSize: 8,
    fontWeight: '600',
  },

  value: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 15,
    color: '#17253A',
  },

  label: {
    fontSize: 7,
    letterSpacing: 0.8,
    color: '#333333',
    marginTop: 4,
  },
});