import React from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../screens/firebaseConfig';

type SidebarProps = {
  activeScreen?: string;
};

export default function Sidebar({
  activeScreen = 'Dashboard',
}: SidebarProps) {
  const navigation = useNavigation<any>();

  const menuItems = [
    { label: 'Dashboard', icon: '▦', screen: 'AdminDashboard' },
    { label: 'Users', icon: '👥', screen: 'AdminUsers' },
    { label: 'Trips', icon: '🏔️', screen: 'AdminTrips' },
    { label: 'Sponsors', icon: '🤝', screen: 'AdminSponsors' },
    { label: 'Gallery', icon: '📸', screen: 'AdminGallery' },
    { label: 'Settings', icon: '⚙️', screen: 'AdminSettings' },
  ];

  const handleNavigation = (screenName: string) => {
    navigation.navigate(screenName);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('[ADMIN_LOGOUT] Error during sign out:', err);
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdminLogin' }],
    });
  };

  return (
    <View style={styles.sidebar}>
      <View>
        <Pressable style={styles.logoContainer} onPress={() => navigation.navigate('Home')}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>◆</Text>
          </View>

          <View>
            <Text style={styles.logoTitle}>ACES ADVENTURE</Text>
            <Text style={styles.logoSubtitle}>ADMIN CONSOLE</Text>
          </View>
        </Pressable>

        <View style={styles.menu}>
          {menuItems.map((item) => {
            const active = activeScreen === item.label;

            return (
              <Pressable
                key={item.label}
                onPress={() => handleNavigation(item.screen)}
                style={[
                  styles.menuItem,
                  active && styles.activeMenuItem,
                ]}
              >
                <Text
                  style={[
                    styles.icon,
                    active && styles.activeText,
                  ]}
                >
                  {item.icon}
                </Text>

                <Text
                  style={[
                    styles.menuText,
                    active && styles.activeText,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.footerSection}>
        <Pressable
          style={styles.websiteLink}
          onPress={() => {
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.open('/', '_blank');
            } else {
              navigation.navigate('Home');
            }
          }}
        >
          <Text style={styles.websiteLinkText}>← Public Website</Text>
        </Pressable>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutBtnText}>Exit & Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    minHeight: '100%',
    backgroundColor: '#0F1E36',
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'space-between',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.08)',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
    paddingHorizontal: 4,
  },

  logoCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#38BDF8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  logoIcon: {
    color: '#0F1E36',
    fontSize: 18,
    fontWeight: '800',
  },

  logoTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
  },

  logoSubtitle: {
    color: '#38BDF8',
    fontSize: 10,
    letterSpacing: 1.2,
    fontWeight: '700',
    marginTop: 2,
  },

  menu: {
    gap: 8,
  },

  menuItem: {
    height: 44,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: 'transparent',
  },

  activeMenuItem: {
    backgroundColor: '#1E3A5F',
    borderLeftWidth: 4,
    borderLeftColor: '#38BDF8',
  },

  icon: {
    width: 28,
    fontSize: 16,
    marginRight: 10,
  },

  menuText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
  },

  activeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  footerSection: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
    gap: 10,
  },

  websiteLink: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    alignItems: 'center',
  },

  websiteLinkText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
  },

  logoutBtn: {
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutBtnText: {
    color: '#F87171',
    fontSize: 13,
    fontWeight: '700',
  },
});