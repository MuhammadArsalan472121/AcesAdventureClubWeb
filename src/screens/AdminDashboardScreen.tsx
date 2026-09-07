import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import StatCard from '../components/StatCard';
import MonthlyVisitors from '../components/MonthlyVisitors';
import RecentActivities from '../components/RecentActivities';
import UsersTable from '../components/UsersTable';
import { useData } from '../context/DataContext';

export default function AdminDashboardScreen() {
  const { trips, users, sponsors, gallery, inquiries } = useData();

  const stats = [
    {
      icon: '👥',
      value: users.length.toString(),
      label: 'REGISTERED USERS',
      change: `+${users.filter(u => u.status === 'ACTIVE').length} Active`,
    },
    {
      icon: '🏔️',
      value: trips.length.toString(),
      label: 'TOTAL EXPEDITIONS',
      change: `${trips.filter(t => t.status === 'UPCOMING' || t.status === 'ACTIVE').length} Live`,
    },
    {
      icon: '🤝',
      value: sponsors.length.toString(),
      label: 'ACTIVE SPONSORS',
      change: `${sponsors.filter(s => s.status === 'ACTIVE').length} Verified`,
    },
    {
      icon: '📸',
      value: gallery.length.toString(),
      label: 'GALLERY PHOTOS',
      change: `${gallery.length} Curated`,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebarContainer}>
        <Sidebar activeScreen="Dashboard" />
      </View>

      {/* Main Content */}
      <View style={styles.mainContainer}>
        <TopBar />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>👋 Welcome Back, Administrator</Text>

            <Text style={styles.welcomeText}>
              Aces Adventure Club Control Center. Connected to live website data, trips catalog, and real-time customer inquiries.
            </Text>
          </View>

          {/* Statistics */}
          <View style={styles.statsRow}>
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                change={stat.change}
              />
            ))}
          </View>

          {/* Chart + Activities */}
          <View style={styles.middleSection}>
            <MonthlyVisitors />

            <RecentActivities />
          </View>

          {/* Users Table */}
          <UsersTable />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
  },

  sidebarContainer: {
    width: 220,
    minHeight: '100%',
  },

  mainContainer: {
    flex: 1,
    minWidth: 0,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 36,
    paddingTop: 28,
    paddingBottom: 60,
    minWidth: 800,
  },

  welcomeSection: {
    marginBottom: 24,
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
  },

  welcomeText: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 20,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },

  middleSection: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
});