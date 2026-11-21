import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SettingsHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Console Settings</Text>

      <Text style={styles.subtitle}>
        Manage your admin console preferences and system settings.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#17253A',
  },

  subtitle: {
    fontSize: 10,
    color: '#777777',
    marginTop: 5,
  },
});