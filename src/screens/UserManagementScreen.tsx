import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import UserManagementHeader from '@/components/UserManagementHeader';
import UsersManagementTable from '@/components/UsersManagementTable';

export default function UserManagementScreen() {
  return (
    <View style={styles.container}>
      {/* Sidebar */}
      <View style={styles.sidebar}>
        <Sidebar activeScreen="Users" />
      </View>

      {/* Main Area */}
      <View style={styles.main}>
        <TopBar />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <UserManagementHeader />

          <UsersManagementTable />
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