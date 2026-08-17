import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import StatCard from '@/components/StatCard';
import MonthlyVisitors from '@/components/MonthlyVisitors';
import RecentActivities from '@/components/RecentActivities';
import UsersTable from '@/components/UsersTable';

const stats = [
  {
    icon: '♟',
    value: '1,240',
    label: 'TOTAL USERS',
    change: '+12%',
  },
  {
    icon: '◉',
    value: '48',
    label: 'TOTAL TRIPS',
    change: '+3',
  },
  {
    icon: '◇',
    value: '12',
    label: 'SPONSORS',
    change: 'New',
  },
  {
    icon: '▣',
    value: '856',
    label: 'GALLERY IMAGES',
    change: 'Live',
  },
];

export default function AdminDashboardScreen() {
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
            <Text style={styles.welcomeTitle}>👋</Text>

            <Text style={styles.welcomeText}>
              Welcome back to Aces Adventure Club dashboard. Here's what's
              happening today.
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

          {/* Users */}
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
    backgroundColor: '#FFFFFF',
  },

  sidebarContainer: {
    width: 170,
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
    paddingHorizontal: 45,
    paddingTop: 25,
    paddingBottom: 50,
    minWidth: 800,
  },

  welcomeSection: {
    marginBottom: 28,
  },

  welcomeTitle: {
    fontSize: 17,
    marginBottom: 4,
  },

  welcomeText: {
    color: '#333333',
    fontSize: 10,
  },

  statsRow: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 28,
  },

  middleSection: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 28,
  },
});