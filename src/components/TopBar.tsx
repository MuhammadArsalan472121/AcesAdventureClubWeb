import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TopBar() {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>⌕</Text>
        <Text style={styles.searchText}>Search operations...</Text>
      </View>

      <View style={styles.navigation}>
        <Pressable style={[styles.navItem, styles.activeNavItem]}>
          <Text style={styles.activeNavText}>Overview</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <Text style={styles.navText}>Trips</Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <Text style={styles.navText}>Users</Text>
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.icon}>♧</Text>
        <Text style={styles.icon}>☾</Text>

        <View style={styles.divider} />

        <View>
          <Text style={styles.name}>Alex Mercer</Text>
          <Text style={styles.role}>Super Admin</Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>AM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
  },

  searchBox: {
    width: 180,
    height: 32,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 6,
  },

  searchText: {
    color: '#777777',
    fontSize: 10,
  },

  navigation: {
    flexDirection: 'row',
    marginLeft: 25,
    gap: 22,
    height: '100%',
    alignItems: 'center',
  },

  navItem: {
    height: '100%',
    justifyContent: 'center',
  },

  activeNavItem: {
    borderBottomWidth: 2,
    borderBottomColor: '#1D304F',
  },

  navText: {
    color: '#555555',
    fontSize: 10,
  },

  activeNavText: {
    color: '#1D304F',
    fontSize: 10,
    fontWeight: '700',
  },

  profileSection: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  icon: {
    fontSize: 17,
  },

  divider: {
    width: 1,
    height: 28,
    backgroundColor: '#DDDDDD',
  },

  name: {
    fontSize: 9,
    fontWeight: '700',
    textAlign: 'right',
  },

  role: {
    fontSize: 7,
    color: '#777777',
    textAlign: 'right',
    marginTop: 2,
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#273A59',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
  },
});