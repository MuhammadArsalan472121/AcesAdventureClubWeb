import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TopBar() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>Search club console...</Text>
      </View>

      <View style={styles.navigation}>
        <Pressable
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => navigation.navigate('AdminDashboard')}
        >
          <Text style={styles.activeNavText}>Overview</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminTrips')}
        >
          <Text style={styles.navText}>Trips</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminUsers')}
        >
          <Text style={styles.navText}>Users</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminGallery')}
        >
          <Text style={styles.navText}>Gallery</Text>
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <Pressable
          style={styles.websiteBtn}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.websiteBtnText}>🌐 View Live Website</Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable onPress={() => navigation.navigate('AdminSettings')} style={{ alignItems: 'flex-end' }}>
          <Text style={styles.name}>Alex Mercer</Text>
          <Text style={styles.role}>Super Admin</Text>
        </Pressable>

        <Pressable
          style={styles.avatar}
          onPress={() => navigation.navigate('AdminSettings')}
        >
          <Text style={styles.avatarText}>AM</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 6,
  },

  searchBox: {
    width: 240,
    height: 40,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
  },

  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },

  searchText: {
    color: '#64748B',
    fontSize: 13,
  },

  navigation: {
    flexDirection: 'row',
    marginLeft: 32,
    gap: 24,
    height: '100%',
    alignItems: 'center',
  },

  navItem: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  activeNavItem: {
    borderBottomWidth: 3,
    borderBottomColor: '#0B5CAD',
  },

  navText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },

  activeNavText: {
    color: '#0B5CAD',
    fontSize: 14,
    fontWeight: '700',
  },

  profileSection: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },

  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },

  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'right',
  },

  role: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'right',
    marginTop: 2,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0F1E36',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#38BDF8',
    fontSize: 14,
    fontWeight: '700',
  },

  websiteBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  websiteBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D4ED8',
  },
});