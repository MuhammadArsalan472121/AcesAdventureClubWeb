import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const users = [
  {
    initials: 'SM',
    name: 'Sophia Miller',
    email: 'sophia.m@acesclub.com',
    role: 'Elite Voyager',
    status: 'ACTIVE',
    date: 'Oct 12, 2024',
  },
  {
    initials: 'JK',
    name: 'James Kovic',
    email: 'j.kovic@adventure.org',
    role: 'Member',
    status: 'ACTIVE',
    date: 'Oct 10, 2024',
  },
  {
    initials: 'AL',
    name: 'Aris Loucas',
    email: 'loucas.a@travel.co',
    role: 'Sponsor Rep',
    status: 'INACTIVE',
    date: 'Oct 05, 2024',
  },
  {
    initials: 'EV',
    name: 'Elena Volkov',
    email: 'elena.v@expeditions.net',
    role: 'Elite Voyager',
    status: 'ACTIVE',
    date: 'Sep 28, 2024',
  },
  {
    initials: 'DW',
    name: 'David Wright',
    email: 'dwright@private.me',
    role: 'Member',
    status: 'ACTIVE',
    date: 'Sep 24, 2024',
  },
];

export default function UsersTable() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Text style={styles.title}>Recent Users</Text>
        <Text style={styles.viewAll}>View All ›</Text>
      </View>

      {/* Table headings */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>NAME</Text>
        <Text style={styles.headerCell}>EMAIL</Text>
        <Text style={styles.headerCell}>ROLE</Text>
        <Text style={styles.headerCell}>STATUS</Text>
        <Text style={styles.headerCell}>JOIN DATE</Text>
        <Text style={styles.headerCell}>ACTION</Text>
      </View>

      {/* Rows */}
      {users.map((user, index) => (
        <View style={styles.row} key={index}>
          <View style={styles.nameCell}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.initials}</Text>
            </View>

            <Text style={styles.name}>{user.name}</Text>
          </View>

          <Text style={styles.cell}>{user.email}</Text>

          <Text style={styles.cell}>{user.role}</Text>

          <View style={styles.statusCell}>
            <Text
              style={[
                styles.status,
                user.status === 'ACTIVE'
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              {user.status}
            </Text>
          </View>

          <Text style={styles.cell}>{user.date}</Text>

          <Text style={styles.action}>⋮</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#EEE4D7',
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },

  topHeader: {
    height: 55,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#17253A',
  },

  viewAll: {
    color: '#78A8C8',
    fontSize: 8,
    fontWeight: '600',
  },

  tableHeader: {
    height: 32,
    backgroundColor: '#FAFAFA',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerCell: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 6,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: '#444444',
  },

  row: {
    minHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    flexDirection: 'row',
    alignItems: 'center',
  },

  nameCell: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  avatar: {
    width: 22,
    height: 22,
    borderRadius: 15,
    backgroundColor: '#EDF3F7',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#6090B0',
    fontSize: 5,
    fontWeight: '700',
  },

  name: {
    fontSize: 7,
    color: '#222222',
  },

  cell: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 6,
    color: '#444444',
  },

  statusCell: {
    flex: 1,
    paddingHorizontal: 10,
  },

  status: {
    alignSelf: 'flex-start',
    fontSize: 5,
    fontWeight: '700',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },

  active: {
    color: '#2EA45B',
    backgroundColor: '#E7F7ED',
  },

  inactive: {
    color: '#666666',
    backgroundColor: '#E9E9E9',
  },

  action: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    color: '#555555',
  },
});