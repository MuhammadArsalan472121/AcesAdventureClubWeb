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
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.changeBadge}>
          <Text style={styles.change}>{change}</Text>
        </View>
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 170,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    color: '#0284C7',
    fontSize: 20,
  },

  changeBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },

  change: {
    color: '#16A34A',
    fontSize: 12,
    fontWeight: '700',
  },

  value: {
    fontSize: 30,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },

  label: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: '#64748B',
    marginTop: 4,
  },
});