import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const users = [
  {
    name: 'Sophia Miller',
    email: 'sophia.m@acesclub.com',
    role: 'Elite Voyager',
    status: 'ACTIVE',
    joined: 'Oct 12, 2024',
  },
  {
    name: 'James Kovic',
    email: 'j.kovic@adventure.org',
    role: 'Member',
    status: 'ACTIVE',
    joined: 'Oct 10, 2024',
  },
  {
    name: 'Aris Loucas',
    email: 'loucas.a@travel.co',
    role: 'Sponsor Rep',
    status: 'INACTIVE',
    joined: 'Oct 05, 2024',
  },
  {
    name: 'Elena Volkov',
    email: 'elena.v@expeditions.net',
    role: 'Elite Voyager',
    status: 'ACTIVE',
    joined: 'Sep 28, 2024',
  },
];

export default function UsersManagementTable() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>NAME</Text>
        <Text style={styles.headerText}>EMAIL</Text>
        <Text style={styles.headerText}>ROLE</Text>
        <Text style={styles.headerText}>STATUS</Text>
        <Text style={styles.headerText}>JOINED</Text>
        <Text style={styles.headerText}>ACTION</Text>
      </View>

      {users.map((user, index) => (
        <View style={styles.row} key={index}>
          <View style={styles.nameContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {user.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </Text>
            </View>

            <Text style={styles.name}>{user.name}</Text>
          </View>

          <Text style={styles.cell}>{user.email}</Text>

          <Text style={styles.cell}>{user.role}</Text>

          <View style={styles.cell}>
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

          <Text style={styles.cell}>{user.joined}</Text>

          <Text style={styles.action}>⋮</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E2DB',
    borderRadius: 12,
    overflow: 'hidden',
  },

  header: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },

  headerText: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 7,
    fontWeight: '700',
    color: '#555555',
    letterSpacing: 0.5,
  },

  row: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  nameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 20,
    backgroundColor: '#EAF1F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#527D9B',
    fontSize: 7,
    fontWeight: '700',
  },

  name: {
    fontSize: 8,
    color: '#17253A',
    fontWeight: '600',
  },

  cell: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 7,
    color: '#555555',
  },

  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 6,
    fontWeight: '700',
  },

  active: {
    color: '#2E8B57',
    backgroundColor: '#E7F6EC',
  },

  inactive: {
    color: '#777777',
    backgroundColor: '#EEEEEE',
  },

  action: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#555555',
  },
});