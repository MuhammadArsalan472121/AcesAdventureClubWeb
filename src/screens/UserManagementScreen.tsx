import React, { useState, useEffect } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { useData } from '../context/DataContext';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebaseConfig';

export default function UserManagementScreen() {
  const navigation = useNavigation<any>();
  const { users, addUser, updateUser, deleteUser } = useData();

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminLogin' }],
      });
    }
  }, [navigation]);

  console.log('[USERS_DEBUG] UserManagementScreen rendered. users count:', users?.length, users);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: 'Member',
    status: 'ACTIVE',
  });

  const roles = ['Super Admin', 'Admin', 'Elite Voyager', 'Member', 'Sponsor Rep'];

  const handleOpenAdd = () => {
    setEditingUserId(null);
    setFormData({
      name: '',
      email: '',
      phone: '+92 300 0000000',
      location: 'Islamabad, Pakistan',
      role: 'Member',
      status: 'ACTIVE',
    });
    setModalVisible(true);
  };

  const handleOpenEdit = (user: any) => {
    setEditingUserId(user.id);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      location: user.location || '',
      role: user.role || 'Member',
      status: user.status || 'ACTIVE',
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    console.log('[USERS_DEBUG] handleSave invoked. editingUserId:', editingUserId, 'formData:', formData);
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please fill in user full name and email address');
      return;
    }

    if (editingUserId) {
      updateUser(editingUserId, formData);
    } else {
      addUser(formData);
    }
    setModalVisible(false);
  };

  const handleDelete = (id: string, name: string) => {
    console.log(`[USERS_DEBUG] handleDelete invoked for user ID [${id}], name [${name}]`);
    if (confirm(`Are you sure you want to remove user "${name}" from the system?`)) {
      deleteUser(id);
    }
  };

  console.log('[ADMIN_USERS_READ_DEBUG] 9. useData().users length inside UserManagementScreen:', users?.length, users);

  const filteredUsers = users.filter(
    (u) =>
      (u.name && u.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.email && u.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.role && u.role.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (u.location && u.location.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  console.log('[ADMIN_USERS_READ_DEBUG] 10. filteredUsers length:', filteredUsers.length, filteredUsers);
  console.log('[ADMIN_USERS_READ_DEBUG] 11. displayed users length:', filteredUsers.length);
  console.log('[ADMIN_USERS_READ_DEBUG] 12. Exact user count rendered by Users page:', filteredUsers.length);

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar activeScreen="Users" />
      </View>

      <View style={styles.main}>
        <TopBar />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>User & Membership Management</Text>
              <Text style={styles.subtitle}>
                Manage registered club members, VIP tier statuses, assigned administrative roles, and accounts.
              </Text>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={handleOpenAdd}>
              <Text style={styles.addBtnText}>+ ADD NEW MEMBER</Text>
            </TouchableOpacity>
          </View>

          {/* Search Bar */}
          <View style={styles.searchRow}>
            <View style={styles.searchWrapper}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search members by name, email, role, or city..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>

          {/* Users Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { flex: 2.2 }]}>MEMBER</Text>
              <Text style={[styles.th, { flex: 2 }]}>EMAIL ADDRESS</Text>
              <Text style={styles.th}>ROLE / TIER</Text>
              <Text style={styles.th}>STATUS</Text>
              <Text style={styles.th}>JOIN DATE</Text>
              <Text style={[styles.th, { textAlign: 'center', width: 150, flex: 0 }]}>ACTIONS</Text>
            </View>

            {filteredUsers.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No members found matching your search.</Text>
              </View>
            ) : (
              filteredUsers.map((user) => {
                const initials = user.name
                  ? user.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'U';

                return (
                  <View style={styles.tableRow} key={user.id}>
                    <View style={[styles.td, { flex: 2.2, flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{initials}</Text>
                      </View>
                      <View>
                        <Text style={styles.nameText}>{user.name}</Text>
                        {user.location ? <Text style={styles.subText}>{user.location}</Text> : null}
                      </View>
                    </View>

                    <Text style={[styles.td, { flex: 2 }]}>{user.email}</Text>
                    <Text style={[styles.td, { fontWeight: '700', color: '#0B5CAD' }]}>{user.role}</Text>

                    <View style={styles.td}>
                      <Text
                        style={[
                          styles.statusTag,
                          user.status === 'ACTIVE'
                            ? styles.statusActive
                            : styles.statusInactive,
                        ]}
                      >
                        {user.status}
                      </Text>
                    </View>

                    <Text style={styles.td}>{user.joined}</Text>

                    <View style={[styles.tdActions, { width: 150 }]}>
                      <TouchableOpacity
                        style={styles.editActionBtn}
                        onPress={() => handleOpenEdit(user)}
                      >
                        <Text style={styles.editActionText}>✏️ Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.deleteActionBtn}
                        onPress={() => handleDelete(user.id, user.name)}
                      >
                        <Text style={styles.deleteActionText}>🗑️ Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </ScrollView>
      </View>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {editingUserId ? 'Edit Member Profile' : 'Add New Member'}
                </Text>
                <Text style={styles.modalSubTitle}>
                  Configure account credentials, permissions, and status.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGrid}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>FULL NAME *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. Sophia Miller"
                  placeholderTextColor="#94A3B8"
                  value={formData.name}
                  onChangeText={(t) => setFormData({ ...formData, name: t })}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>EMAIL ADDRESS *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="sophia@example.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(t) => setFormData({ ...formData, email: t })}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                  <Text style={styles.formLabel}>PHONE NUMBER</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="+92 300 1234567"
                    placeholderTextColor="#94A3B8"
                    value={formData.phone}
                    onChangeText={(t) => setFormData({ ...formData, phone: t })}
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>LOCATION / CITY</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="Islamabad, Pakistan"
                    placeholderTextColor="#94A3B8"
                    value={formData.location}
                    onChangeText={(t) => setFormData({ ...formData, location: t })}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>ROLE / MEMBERSHIP TIER</Text>
                <View style={styles.optionPillRow}>
                  {roles.map((r) => (
                    <TouchableOpacity
                      key={r}
                      style={[
                        styles.optionPill,
                        formData.role === r && styles.activeOptionPill,
                      ]}
                      onPress={() => setFormData({ ...formData, role: r })}
                    >
                      <Text
                        style={[
                          styles.optionPillText,
                          formData.role === r && styles.activeOptionPillText,
                        ]}
                      >
                        {r}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>ACCOUNT STATUS</Text>
                <View style={styles.optionPillRow}>
                  {['ACTIVE', 'INACTIVE'].map((st) => (
                    <TouchableOpacity
                      key={st}
                      style={[
                        styles.optionPill,
                        formData.status === st && styles.activeOptionPill,
                      ]}
                      onPress={() => setFormData({ ...formData, status: st })}
                    >
                      <Text
                        style={[
                          styles.optionPillText,
                          formData.status === st && styles.activeOptionPillText,
                        ]}
                      >
                        {st}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>
                  {editingUserId ? 'Save Changes' : 'Create Member'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
  },

  sidebar: {
    width: 220,
    minHeight: '100%',
  },

  main: {
    flex: 1,
    minWidth: 0,
  },

  scroll: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 36,
    paddingTop: 28,
    paddingBottom: 60,
    minWidth: 800,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },

  addBtn: {
    backgroundColor: '#0B5CAD',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#0B5CAD',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },

  addBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  searchRow: {
    marginBottom: 20,
  },

  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
  },

  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
    height: '100%',
  },

  tableContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },

  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  th: {
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  td: {
    flex: 1,
    fontSize: 14,
    color: '#334155',
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '800',
  },

  nameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  subText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '800',
  },

  statusActive: {
    color: '#16A34A',
    backgroundColor: '#DCFCE7',
  },

  statusInactive: {
    color: '#64748B',
    backgroundColor: '#F1F5F9',
  },

  tdActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },

  editActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  editActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B5CAD',
  },

  deleteActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  deleteActionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },

  emptyState: {
    padding: 40,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: '#64748B',
  },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalContent: {
    width: '100%',
    maxWidth: 600,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },

  modalSubTitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
  },

  closeBtn: {
    padding: 6,
  },

  closeBtnText: {
    fontSize: 18,
    color: '#64748B',
    fontWeight: '700',
  },

  formGrid: {
    gap: 16,
  },

  formRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  formGroup: {
    gap: 6,
  },

  formLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 0.5,
  },

  formInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: '#0F172A',
  },

  optionPillRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  optionPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  activeOptionPill: {
    backgroundColor: '#0B5CAD',
    borderColor: '#0B5CAD',
  },

  optionPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },

  activeOptionPillText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },

  cancelBtn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },

  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },

  saveBtn: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#0B5CAD',
  },

  saveBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});