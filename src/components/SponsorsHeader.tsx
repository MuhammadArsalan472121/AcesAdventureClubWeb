import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type SponsorsHeaderProps = {
  onAddSponsor?: () => void;
};

export default function SponsorsHeader({
  onAddSponsor,
}: SponsorsHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Sponsors Management</Text>
        <Text style={styles.subtitle}>
          Manage sponsors, partnerships and sponsorship details.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={onAddSponsor}>
        <Text style={styles.buttonText}>+ ADD SPONSOR</Text>
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