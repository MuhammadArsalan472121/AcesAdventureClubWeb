import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type GalleryHeaderProps = {
  onAddImage?: () => void;
};

export default function GalleryHeader({
  onAddImage,
}: GalleryHeaderProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Gallery Management</Text>
        <Text style={styles.subtitle}>
          Manage adventure photos and gallery content.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={onAddImage}>
        <Text style={styles.buttonText}>+ ADD IMAGE</Text>
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