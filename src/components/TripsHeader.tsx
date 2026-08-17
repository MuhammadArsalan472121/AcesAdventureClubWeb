import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type TripsHeaderProps = {
  onAddTrip?: () => void;
};

export default function TripsHeader({ onAddTrip }: TripsHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Manage Trips</Text>
        <Text style={styles.subtitle}>
          Create, edit and manage all adventure expeditions.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={onAddTrip}>
        <Text style={styles.buttonText}>+ ADD NEW EXPEDITION</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

  button: {
    backgroundColor: '#1D304F',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});