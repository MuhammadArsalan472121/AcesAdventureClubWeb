import React, { useState } from 'react';
import { Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../screens/firebaseConfig';

export default function TopBar() {
  const navigation = useNavigation<any>();

  const [adminName, setAdminName] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('aces_club_admin_name') || 'Hammad';
    }
    return 'Hammad';
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNameInput, setEditNameInput] = useState(adminName);

  const getInitials = (name: string) => {
    if (!name) return 'HA';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('[ADMIN_LOGOUT] Error during sign out:', err);
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('aces_admin_authenticated');
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'AdminLogin' }],
    });
  };

  const handleSaveProfile = () => {
    const trimmed = editNameInput.trim() || 'Hammad';
    setAdminName(trimmed);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('aces_club_admin_name', trimmed);
    }
    setEditModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Text style={styles.searchIcon}>🔍</Text>
        <Text style={styles.searchText}>Search club console...</Text>
      </View>

      <View style={styles.navigation}>
        <Pressable
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => navigation.navigate('AdminDashboard')}
        >
          <Text style={styles.activeNavText}>Overview</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminTrips')}
        >
          <Text style={styles.navText}>Trips</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminUsers')}
        >
          <Text style={styles.navText}>Users</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => navigation.navigate('AdminGallery')}
        >
          <Text style={styles.navText}>Gallery</Text>
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <Pressable
          style={styles.websiteBtn}
          onPress={() => {
            if (Platform.OS === 'web' && typeof window !== 'undefined') {
              window.open('/', '_blank');
            } else {
              navigation.navigate('Home');
            }
          }}
        >
          <Text style={styles.websiteBtnText}>🌐 View Live Website</Text>
        </Pressable>

        <View style={styles.divider} />

        {/* Profile Trigger */}
        <Pressable
          onPress={() => setMenuOpen(!menuOpen)}
          style={styles.profileTrigger}
        >
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.name}>{adminName}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={styles.role}>Super Admin</Text>
              <Text style={styles.dropdownArrow}>{menuOpen ? '▲' : '▼'}</Text>
            </View>
          </View>

          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{getInitials(adminName)}</Text>
          </View>
        </Pressable>

        {/* Dropdown Menu Popup */}
        {menuOpen && (
          <>
            <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)} />
            <View style={styles.dropdown}>
              <View style={styles.dropdownHeader}>
                <Text style={styles.dropdownHeaderName}>{adminName}</Text>
                <Text style={styles.dropdownHeaderRole}>Super Admin Console</Text>
              </View>

              <View style={styles.dropdownDivider} />

              {/* Option 1: View Dashboard */}
              <Pressable
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuOpen(false);
                  navigation.navigate('AdminDashboard');
                }}
              >
                <Text style={styles.dropdownItemIcon}>📊</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dropdownItemTitle}>View Dashboard</Text>
                  <Text style={styles.dropdownItemSub}>Overview analytics & stats</Text>
                </View>
              </Pressable>

              {/* Option 2: View Profile / Edit Name */}
              <Pressable
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuOpen(false);
                  setEditNameInput(adminName);
                  setEditModalOpen(true);
                }}
              >
                <Text style={styles.dropdownItemIcon}>👤</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dropdownItemTitle}>View Profile / Edit</Text>
                  <Text style={styles.dropdownItemSub}>Manage admin name & info</Text>
                </View>
              </Pressable>

              <View style={styles.dropdownDivider} />

              {/* Option 3: Logout */}
              <Pressable
                style={[styles.dropdownItem, styles.logoutDropdownItem]}
                onPress={handleLogout}
              >
                <Text style={styles.dropdownItemIcon}>🚪</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.dropdownItemTitle, styles.logoutText]}>Logout</Text>
                  <Text style={styles.dropdownItemSub}>Sign out of admin console</Text>
                </View>
              </Pressable>
            </View>
          </>
        )}
      </View>

      {/* Edit Admin Profile Modal */}
      <Modal
        visible={editModalOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setEditModalOpen(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setEditModalOpen(false)}>
          <Pressable style={styles.modalCard} onPress={(e) => e.stopPropagation?.()}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Admin Profile Settings</Text>
                <Text style={styles.modalSubtitle}>Update display name for the admin console</Text>
              </View>
              <Pressable onPress={() => setEditModalOpen(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.avatarPreviewRow}>
                <View style={styles.largeAvatar}>
                  <Text style={styles.largeAvatarText}>{getInitials(adminName)}</Text>
                </View>
                <View style={{ gap: 4 }}>
                  <Text style={styles.avatarNameText}>{adminName}</Text>
                  <View style={styles.badgePill}>
                    <Text style={styles.badgePillText}>⚡ Super Admin</Text>
                  </View>
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>ADMIN DISPLAY NAME</Text>
                <TextInput
                  style={styles.modalInput}
                  value={editNameInput}
                  onChangeText={setEditNameInput}
                  placeholder="Enter admin name..."
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>ROLE PERMISSIONS</Text>
                <TextInput
                  style={[styles.modalInput, styles.disabledInput]}
                  value="Super Admin (Full Console Access)"
                  editable={false}
                />
              </View>
            </View>

            <View style={styles.modalFooter}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setEditModalOpen(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>

              <Pressable style={styles.saveBtn} onPress={handleSaveProfile}>
                <Text style={styles.saveBtnText}>Save Profile Name</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 68,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 6,
    zIndex: 100,
  },

  searchBox: {
    width: 240,
    height: 40,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    backgroundColor: '#F8FAFC',
  },

  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },

  searchText: {
    color: '#64748B',
    fontSize: 13,
  },

  navigation: {
    flexDirection: 'row',
    marginLeft: 32,
    gap: 24,
    height: '100%',
    alignItems: 'center',
  },

  navItem: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },

  activeNavItem: {
    borderBottomWidth: 3,
    borderBottomColor: '#0B5CAD',
  },

  navText: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },

  activeNavText: {
    color: '#0B5CAD',
    fontSize: 14,
    fontWeight: '700',
  },

  profileSection: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    position: 'relative',
    zIndex: 150,
  },

  divider: {
    width: 1,
    height: 32,
    backgroundColor: '#E2E8F0',
  },

  profileTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    cursor: 'pointer' as any,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    textAlign: 'right',
  },

  role: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'right',
  },

  dropdownArrow: {
    fontSize: 10,
    color: '#64748B',
    marginLeft: 2,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#0F1E36',
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarText: {
    color: '#38BDF8',
    fontSize: 13,
    fontWeight: '800',
  },

  websiteBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  websiteBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D4ED8',
  },

  /* Dropdown Styles */
  backdrop: {
    position: 'fixed' as any,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 998,
  },

  dropdown: {
    position: 'absolute',
    top: 52,
    right: 0,
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    zIndex: 999,
  },

  dropdownHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  dropdownHeaderName: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  dropdownHeaderRole: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  dropdownDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 6,
  },

  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },

  dropdownItemIcon: {
    fontSize: 18,
  },

  dropdownItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },

  dropdownItemSub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },

  logoutDropdownItem: {
    backgroundColor: '#FEF2F2',
  },

  logoutText: {
    color: '#DC2626',
  },

  /* Modal Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },

  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 3,
  },

  closeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },

  closeBtnText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '700',
  },

  modalBody: {
    gap: 18,
    marginBottom: 24,
  },

  avatarPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  largeAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F1E36',
    justifyContent: 'center',
    alignItems: 'center',
  },

  largeAvatarText: {
    color: '#38BDF8',
    fontSize: 16,
    fontWeight: '800',
  },

  avatarNameText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },

  badgePill: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },

  badgePillText: {
    color: '#1D4ED8',
    fontSize: 11,
    fontWeight: '700',
  },

  inputGroup: {
    gap: 6,
  },

  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
  },

  modalInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },

  disabledInput: {
    backgroundColor: '#F1F5F9',
    color: '#64748B',
  },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },

  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
  },

  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },

  saveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#0B5CAD',
  },

  saveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});