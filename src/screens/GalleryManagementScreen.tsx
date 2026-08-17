import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import GalleryHeader from '@/components/GalleryHeader';
import GalleryGrid from '@/components/GalleryGrid';

export default function GalleryManagementScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar activeScreen="Gallery" />
      </View>

      <View style={styles.main}>
        <TopBar />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <GalleryHeader />

          <GalleryGrid />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
  },

  sidebar: {
    width: 170,
  },

  main: {
    flex: 1,
    minWidth: 0,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 45,
    paddingTop: 30,
    paddingBottom: 50,
    minWidth: 800,
  },
});