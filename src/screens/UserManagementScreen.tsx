import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { deleteApp, initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signOut } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { useData } from '../context/DataContext';
import { auth, db } from './firebaseConfig';

const SUPER_ADMIN_UID = "dAA4wFxhnjZHLP5yQA4lwuiSKDv1";
const SUPER_ADMIN_EMAIL = "superadmin@acesclub.com";
const SUPER_ADMIN_PHONE = "+92 340 5866007";

const firebaseConfig = {
  apiKey: "AIzaSyCRJw3PyOjkmcVVjKxItQB7qa75RA6Z0hM",
  authDomain: "adventuresacesclub.firebaseapp.com",
  projectId: "adventuresacesclub",
  storageBucket: "adventuresacesclub.firebasestorage.app",
  messagingSenderId: "1017011729372",
  appId: "1:1017011729372:web:3514640408ec101f991519",
  measurementId: "G-687NLPDK9L"
};

export default function UserManagementScreen() {
  const navigation = useNavigation<any>();
  const { users, addUser, updateUser, deleteUser, deleteAllUsersExceptSuperAdmin } = useData();

  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'AdminLogin' }],
      });
      return;
    }

    const currentUid = auth.currentUser.uid;
    const currentEmail = auth.currentUser.email?.toLowerCase();

    if (currentUid === SUPER_ADMIN_UID || currentEmail === SUPER_ADMIN_EMAIL) {
      setIsSuperAdmin(true);
      // Ensure super admin default phone and role in Firestore
      setDoc(
        doc(db, "users", currentUid),
        {
          phone: SUPER_ADMIN_PHONE,
          role: "Super Admin",
          status: "ACTIVE",
        },
        { merge: true }
      ).catch((err) => console.warn("Failed to set default super admin data:", err));
    }

    // Fetch user role from Firestore
    getDoc(doc(db, "users", currentUid))
      .then((snap) => {
        if (snap.exists()) {
          const role = String(snap.data()?.role || snap.data()?.Role || '').trim().toLowerCase().replace(/[\s-]+/g, "_");
          if (role === 'super_admin' || currentUid === SUPER_ADMIN_UID || currentEmail === SUPER_ADMIN_EMAIL) {
            setIsSuperAdmin(true);
          } else {
            setIsSuperAdmin(false);
          }
        }
      })
      .catch((err) => {
        console.warn("Could not fetch admin role:", err);
      });
  }, [navigation]);

  console.log('[USERS_DEBUG] UserManagementScreen rendered. users count:', users?.length, users);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [savingLoading, setSavingLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: 'Member',
    status: 'ACTIVE',
    password: '',
    confirmPassword: '',
    isVerified: false,
  });

  const roles = isSuperAdmin
    ? ['Super Admin', 'Admin', 'Elite Voyager', 'Member', 'Sponsor Rep']
    : ['Admin', 'Elite Voyager', 'Member', 'Sponsor Rep'];

  const handleOpenAdd = () => {
    setEditingUserId(null);
    setFormError('');
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      role: 'Member',
      status: 'ACTIVE',
      password: '',
      confirmPassword: '',
      isVerified: false,
    });
    setModalVisible(true);
  };

  const handleOpenEdit = (user: any) => {
    const isTargetSuper = user.id === SUPER_ADMIN_UID || user.email?.toLowerCase() === SUPER_ADMIN_EMAIL || (user.role && String(user.role).toLowerCase().includes('super'));
    setEditingUserId(user.id);
    setFormError('');
    setFormData({
      name: user.name || (isTargetSuper ? 'Super Admin' : ''),
      email: user.email || '',
      phone: user.phone || (isTargetSuper ? SUPER_ADMIN_PHONE : ''),
      location: user.location || '',
      role: isTargetSuper ? 'Super Admin' : (user.role || 'Member'),
      status: isTargetSuper ? 'ACTIVE' : (user.status || 'ACTIVE'),
      password: '',
      confirmPassword: '',
      isVerified: isTargetSuper || user.emailVerified === true || user.isVerified === true,
    });
    setModalVisible(true);
  };

  const handleSave = async () => {
    setFormError('');
    if (!formData.name.trim()) {
      setFormError('Please enter user full name.');
      return;
    }
    if (!formData.email.trim()) {
      setFormError('Please enter valid email address.');
      return;
    }

    if (!editingUserId) {
      if (!formData.password) {
        setFormError('Please enter a password for the new member.');
        return;
      }
      if (formData.password.length < 6) {
        setFormError('Password must be at least 6 characters.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match.');
        return;
      }
    }

    setSavingLoading(true);

    if (editingUserId) {
      try {
        const isTargetSuper = editingUserId === SUPER_ADMIN_UID || formData.email?.toLowerCase() === SUPER_ADMIN_EMAIL || formData.role === 'Super Admin';
        const updatePayload: any = {
          name: formData.name.trim(),
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phone: isTargetSuper ? (formData.phone.trim() || SUPER_ADMIN_PHONE) : formData.phone.trim(),
          location: formData.location.trim(),
          role: isTargetSuper ? 'Super Admin' : formData.role,
          status: isTargetSuper ? 'ACTIVE' : formData.status,
        };
        if (isSuperAdmin) {
          updatePayload.emailVerified = !!formData.isVerified;
        }
        await updateUser(editingUserId, updatePayload);
        setSavingLoading(false);
        setModalVisible(false);
      } catch (err: any) {
        setSavingLoading(false);
        setFormError(err?.message || 'Failed to update user.');
      }
      return;
    }

    // Creating a brand new member in Authentication + Firestore
    let secondaryApp: any = null;
    try {
      const appName = `SecondaryAuth_${Date.now()}`;
      secondaryApp = initializeApp(firebaseConfig, appName);
      const secondaryAuth = getAuth(secondaryApp);

      const userCredential = await createUserWithEmailAndPassword(
        secondaryAuth,
        formData.email.trim(),
        formData.password
      );

      const newUid = userCredential.user.uid;
      const formattedJoined = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      // Role normalization
      let assignedRole = formData.role;
      if (!isSuperAdmin && assignedRole.toLowerCase().includes('super')) {
        assignedRole = 'Admin';
      }

      const userFirestoreDoc = {
        name: formData.name.trim(),
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || "+92 300 0000000",
        location: formData.location.trim() || "Islamabad, Pakistan",
        role: assignedRole,
        status: formData.status,
        emailVerified: isSuperAdmin ? !!formData.isVerified : false,
        joined: formattedJoined,
        createdAt: serverTimestamp(),
      };

      // Save document in Firestore users/{newUid}
      await setDoc(doc(db, "users", newUid), userFirestoreDoc);

      // Sign out from secondary auth and clean up instance
      await signOut(secondaryAuth);
      await deleteApp(secondaryApp);

      // Update UI state in DataContext
      addUser({
        id: newUid,
        ...userFirestoreDoc,
      });

      setSavingLoading(false);
      setModalVisible(false);
      alert('New member created successfully in both Authentication and Database!');
    } catch (err: any) {
      console.error("[ADD_USER_ERROR]", err);
      if (secondaryApp) {
        try {
          await deleteApp(secondaryApp);
        } catch (_) { }
      }
      setSavingLoading(false);
      if (err.code === 'auth/email-already-in-use') {
        setFormError('This email is already registered in Firebase Authentication.');
      } else if (err.code === 'auth/weak-password') {
        setFormError('Password is too weak. Please use at least 6 characters.');
      } else {
        setFormError(err?.message || 'Failed to create user in Authentication.');
      }
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (id === SUPER_ADMIN_UID) {
      alert("Super Admin account is protected and cannot be deleted!");
      return;
    }
    console.log(`[USERS_DEBUG] handleDelete invoked for user ID [${id}], name [${name}]`);
    if (confirm(`Are you sure you want to remove user "${name}" from the system?`)) {
      deleteUser(id);
    }
  };

  const handleDeleteAll = () => {
    if (!isSuperAdmin) {
      alert("Only Super Admin has permission to delete all members.");
      return;
    }
    const confirmed = confirm(
      "WARNING: Are you sure you want to delete ALL registered users?\n\n(Note: The Super Admin account is protected and will NOT be deleted.)"
    );
    if (confirmed) {
      deleteAllUsersExceptSuperAdmin();
      alert("All members have been removed. Super Admin account preserved.");
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

            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
              {isSuperAdmin && (
                <TouchableOpacity style={styles.deleteAllBtn} onPress={handleDeleteAll}>
                  <Text style={styles.deleteAllBtnText}>🗑️ DELETE ALL USERS</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity style={styles.addBtn} onPress={handleOpenAdd}>
                <Text style={styles.addBtnText}>+ ADD NEW MEMBER</Text>
              </TouchableOpacity>
            </View>
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
                          user.emailVerified === true || user.isVerified === true || user.status === 'VERIFIED'
                            ? styles.statusVerified
                            : user.status === 'ACTIVE'
                              ? styles.statusActive
                              : styles.statusInactive,
                        ]}
                      >
                        {user.emailVerified === true || user.isVerified === true || user.status === 'VERIFIED'
                          ? '✓ VERIFIED'
                          : user.status}
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

                      {user.id !== SUPER_ADMIN_UID && user.email?.toLowerCase() !== SUPER_ADMIN_EMAIL && (
                        <TouchableOpacity
                          style={styles.deleteActionBtn}
                          onPress={() => handleDelete(user.id, user.name)}
                        >
                          <Text style={styles.deleteActionText}>🗑️ Delete</Text>
                        </TouchableOpacity>
                      )}
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

            {formError ? (
              <View style={styles.formErrorBox}>
                <Text style={styles.formErrorText}>{formError}</Text>
              </View>
            ) : null}

            <View style={styles.formGrid}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>FULL NAME *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. Ali Khan"
                  placeholderTextColor="#94A3B8"
                  value={formData.name}
                  onChangeText={(t) => setFormData({ ...formData, name: t })}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>EMAIL ADDRESS *</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g. member@acesclub.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  editable={!editingUserId}
                  onChangeText={(t) => setFormData({ ...formData, email: t })}
                />
              </View>

              {/* Password Fields for New Member */}
              {!editingUserId && (
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.formLabel}>NEW PASSWORD *</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Min 6 characters"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry
                      value={formData.password}
                      onChangeText={(t) => setFormData({ ...formData, password: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>CONFIRM PASSWORD *</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Repeat password"
                      placeholderTextColor="#94A3B8"
                      secureTextEntry
                      value={formData.confirmPassword}
                      onChangeText={(t) => setFormData({ ...formData, confirmPassword: t })}
                    />
                  </View>
                </View>
              )}

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                  <Text style={styles.formLabel}>PHONE NUMBER</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. +92 300 1234567"
                    placeholderTextColor="#94A3B8"
                    value={formData.phone}
                    onChangeText={(t) => setFormData({ ...formData, phone: t })}
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>LOCATION / CITY</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Islamabad, Pakistan"
                    placeholderTextColor="#94A3B8"
                    value={formData.location}
                    onChangeText={(t) => setFormData({ ...formData, location: t })}
                  />
                </View>
              </View>

              {/* Role / Membership Tier & Status with Super Admin Protection */}
              {(() => {
                const isTargetSuper = editingUserId === SUPER_ADMIN_UID || formData.email?.toLowerCase() === SUPER_ADMIN_EMAIL;
                return (
                  <>
                    <View style={styles.formGroup}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={styles.formLabel}>ROLE / MEMBERSHIP TIER</Text>
                        {isTargetSuper && (
                          <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '800' }}>🔒 Super Admin (Permanent Role)</Text>
                        )}
                      </View>
                      <View style={styles.optionPillRow}>
                        {roles.map((r) => {
                          const isPillDisabled = isTargetSuper;
                          const isPillActive = isTargetSuper ? r === 'Super Admin' : formData.role === r;
                          return (
                            <TouchableOpacity
                              key={r}
                              disabled={isPillDisabled}
                              style={[
                                styles.optionPill,
                                isPillActive && styles.activeOptionPill,
                                isTargetSuper && r !== 'Super Admin' && { opacity: 0.35, cursor: 'not-allowed' as any },
                                isTargetSuper && r === 'Super Admin' && { cursor: 'not-allowed' as any },
                              ]}
                              onPress={() => !isTargetSuper && setFormData({ ...formData, role: r })}
                            >
                              <Text
                                style={[
                                  styles.optionPillText,
                                  isPillActive && styles.activeOptionPillText,
                                ]}
                              >
                                {r}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>

                    <View style={styles.formGroup}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <Text style={styles.formLabel}>ACCOUNT STATUS</Text>
                        {isTargetSuper && (
                          <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '800' }}>🔒 Status Locked (Active)</Text>
                        )}
                      </View>
                      <View style={styles.optionPillRow}>
                        {['ACTIVE', 'INACTIVE'].map((st) => {
                          const isPillDisabled = isTargetSuper;
                          const isPillActive = isTargetSuper ? st === 'ACTIVE' : formData.status === st;
                          return (
                            <TouchableOpacity
                              key={st}
                              disabled={isPillDisabled}
                              style={[
                                styles.optionPill,
                                isPillActive && styles.activeOptionPill,
                                isTargetSuper && st !== 'ACTIVE' && { opacity: 0.35, cursor: 'not-allowed' as any },
                                isTargetSuper && st === 'ACTIVE' && { cursor: 'not-allowed' as any },
                              ]}
                              onPress={() => !isTargetSuper && setFormData({ ...formData, status: st })}
                            >
                              <Text
                                style={[
                                  styles.optionPillText,
                                  isPillActive && styles.activeOptionPillText,
                                ]}
                              >
                                {st}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </View>
                  </>
                );
              })()}

              {/* Super Admin Exclusive: Pre-Verified Status Toggle */}
              {isSuperAdmin && (
                <View style={styles.verifiedBox}>
                  <TouchableOpacity
                    style={styles.checkboxRow}
                    activeOpacity={0.8}
                    onPress={() => setFormData({ ...formData, isVerified: !formData.isVerified })}
                  >
                    <View style={[styles.customCheckbox, formData.isVerified && styles.customCheckboxChecked]}>
                      {formData.isVerified && <Text style={styles.checkmarkIcon}>✓</Text>}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.verifiedTitle}>
                        🛡️ Pre-Verify Account (Super Admin Privilege)
                      </Text>
                      <Text style={styles.verifiedDesc}>
                        When enabled, member can directly log in without requiring manual email verification link confirmation.
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                disabled={savingLoading}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveBtn, savingLoading && { opacity: 0.7 }]}
                disabled={savingLoading}
                onPress={handleSave}
              >
                {savingLoading ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <Text style={styles.saveBtnText}>
                    {editingUserId ? 'Save Changes' : 'Create Member'}
                  </Text>
                )}
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

  deleteAllBtn: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  deleteAllBtnText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.4,
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
    color: '#B45309',
    backgroundColor: '#FEF3C7',
  },

  statusVerified: {
    color: '#15803D',
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

  formErrorBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },

  formErrorText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '600',
  },

  verifiedBox: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
  },

  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  customCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#16A34A',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  customCheckboxChecked: {
    backgroundColor: '#16A34A',
  },

  checkmarkIcon: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    marginTop: -2,
  },

  verifiedTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#15803D',
  },

  verifiedDesc: {
    fontSize: 11,
    color: '#166534',
    marginTop: 2,
    lineHeight: 15,
  },
});