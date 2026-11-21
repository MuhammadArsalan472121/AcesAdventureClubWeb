import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const galleryItems = [
  {
    title: 'Hunza Valley',
    category: 'TRIPS',
    image:
      'https://images.unsplash.com/photo-1548013146-72479768bada?w=600',
  },
  {
    title: 'Mountain Adventure',
    category: 'ADVENTURE',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600',
  },
  {
    title: 'Skardu',
    category: 'TRIPS',
    image:
      'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600',
  },
  {
    title: 'Camping',
    category: 'ADVENTURE',
    image:
      'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=600',
  },
  {
    title: 'Fairy Meadows',
    category: 'TRIPS',
    image:
      'https://images.unsplash.com/photo-1486911278844-a81c5267e227?w=600',
  },
  {
    title: 'Mountain Trek',
    category: 'ADVENTURE',
    image:
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
  },
];

export default function GalleryGrid() {
  return (
    <View style={styles.container}>
      {galleryItems.map((item, index) => (
        <View style={styles.card} key={index}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />

          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
  },

  card: {
    width: 220,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E2DB',
    borderRadius: 12,
    overflow: 'hidden',
  },

  image: {
    width: '100%',
    height: 145,
  },

  info: {
    padding: 12,
  },

  title: {
    fontSize: 10,
    fontWeight: '700',
    color: '#17253A',
  },

  category: {
    marginTop: 5,
    fontSize: 6,
    fontWeight: '600',
    color: '#78A8C8',
    letterSpacing: 0.7,
  },
});