import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useData } from '../context/DataContext';

export default function UsersTable() {
  const { users } = useData();
  const navigation = useNavigation<any>();

  const recentUsers = users.slice(0, 5);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.title}>Recent Registered Members</Text>
          <Text style={styles.subtitle}>Latest club explorers & VIP membership profiles</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('AdminUsers')} style={styles.viewAllBtn}>
          <Text style={styles.viewAll}>View & Manage All ({users.length}) ➔</Text>
        </Pressable>
      </View>

      {/* Table headings */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 2 }]}>MEMBER NAME</Text>
        <Text style={[styles.headerCell, { flex: 2 }]}>EMAIL</Text>
        <Text style={styles.headerCell}>ROLE / TIER</Text>
        <Text style={styles.headerCell}>STATUS</Text>
        <Text style={styles.headerCell}>JOIN DATE</Text>
      </View>

      {/* Rows */}
      {recentUsers.map((user) => {
        const initials = user.name
          ? user.name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
          : 'U';

        return (
          <View style={styles.row} key={user.id}>
            <View style={[styles.nameCell, { flex: 2 }]}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{initials}</Text>
              </View>

              <Text style={styles.name}>{user.name}</Text>
            </View>

            <Text style={[styles.cell, { flex: 2 }]}>{user.email}</Text>

            <Text style={[styles.cell, { fontWeight: '700', color: '#0B5CAD' }]}>{user.role}</Text>

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

            <Text style={styles.cell}>{user.joined}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },

  topHeader: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },

  viewAllBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
  },

  viewAll: {
    color: '#0B5CAD',
    fontSize: 13,
    fontWeight: '700',
  },

  tableHeader: {
    height: 44,
    backgroundColor: '#F8FAFC',
    borderBottomWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  headerCell: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    color: '#475569',
  },

  row: {
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  nameCell: {
    flex: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '700',
  },

  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },

  cell: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#334155',
  },

  statusCell: {
    flex: 1,
    paddingHorizontal: 12,
  },

  status: {
    alignSelf: 'flex-start',
    fontSize: 11,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  active: {
    color: '#16A34A',
    backgroundColor: '#DCFCE7',
  },

  inactive: {
    color: '#64748B',
    backgroundColor: '#F1F5F9',
  },
});