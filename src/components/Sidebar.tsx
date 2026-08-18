import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

type SidebarProps = {
  activeScreen?: string;
};

export default function Sidebar({
  activeScreen = 'Dashboard',
}: SidebarProps) {
  const menuItems = [
    { label: 'Dashboard', icon: '▦' },
    { label: 'Users', icon: '♙' },
    { label: 'Trips', icon: '◉' },
    { label: 'Sponsors', icon: '◇' },
    { label: 'Gallery', icon: '▣' },
    { label: 'Settings', icon: '⚙' },
  ];

  const handleNavigation = (screen: string) => {
    switch (screen) {
      case 'Dashboard':
        router.push('/');
        break;

      case 'Users':
        router.push('/users');
        break;

      case 'Trips':
        router.push('/trips');
        break;

      case 'Sponsors':
        router.push('/sponsors');
        break;

      case 'Gallery':
        router.push('/gallery');
        break;

      case 'Settings':
        router.push('/settings');
        break;

      default:
        break;
    }
  };

  return (
    <View style={styles.sidebar}>
      <View>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoIcon}>◆</Text>
          </View>

          <View>
            <Text style={styles.logoTitle}>ACES ADVENTURE</Text>
            <Text style={styles.logoSubtitle}>ADMIN CONSOLE</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item) => {
            const active = activeScreen === item.label;

            return (
              <Pressable
                key={item.label}
                onPress={() => handleNavigation(item.label)}
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

      <View>
        <Text style={styles.support}>♧ SUPPORT</Text>

        <Pressable style={styles.help}>
          <Text style={styles.helpText}>? HELP</Text>
        </Pressable>

        <Pressable style={styles.logout}>
          <Text style={styles.logoutText}>LOGOUT</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 170,
    flex: 1,
    backgroundColor: '#1D304F',
    paddingHorizontal: 12,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },

  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 42,
  },

  logoCircle: {
    width: 27,
    height: 27,
    borderRadius: 20,
    backgroundColor: '#78A8C8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },

  logoIcon: {
    color: '#1D304F',
    fontSize: 10,
  },

  logoTitle: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  logoSubtitle: {
    color: '#B7C4D5',
    fontSize: 6,
    letterSpacing: 1,
    marginTop: 2,
  },

  menu: {
    gap: 10,
  },

  menuItem: {
    height: 34,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },

  activeMenuItem: {
    backgroundColor: '#243D61',
  },

  icon: {
    width: 27,
    color: '#B7C4D5',
    fontSize: 13,
    textAlign: 'center',
  },

  menuText: {
    color: '#B7C4D5',
    fontSize: 10,
  },

  activeText: {
    color: '#78A8C8',
    fontWeight: '600',
  },

  support: {
    color: '#FFFFFF',
    fontSize: 7,
    marginBottom: 13,
  },

  help: {
    marginBottom: 12,
  },

  helpText: {
    color: '#FFFFFF',
    fontSize: 8,
  },

  logout: {
    height: 27,
    borderRadius: 6,
    backgroundColor: '#78A8C8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutText: {
    color: '#14263F',
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 1,
  },
});