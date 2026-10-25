import React, { useState } from 'react';
import { Linking, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../screens/firebaseConfig';
import { useData } from '../context/DataContext';

export default function TopBar() {
  const navigation = useNavigation<any>();

  const { socialLinks, contactContent, updateSocialLinks } = useData() as any;

  const [adminName, setAdminName] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('aces_club_admin_name') || 'Hammad';
    }
    return 'Hammad';
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editNameInput, setEditNameInput] = useState(adminName);

  // Social handles state
  const [editInstaInput, setEditInstaInput] = useState(
    socialLinks?.instagram || contactContent?.instagram || 'https://www.instagram.com/aces_adventure_club/'
  );
  const [editYoutubeInput, setEditYoutubeInput] = useState(
    socialLinks?.youtube || contactContent?.youtube || 'https://www.youtube.com/@AcesAdventureClub-007'
  );
  const [editFacebookInput, setEditFacebookInput] = useState(
    socialLinks?.facebook || contactContent?.facebook || 'https://www.facebook.com/acesadventureclub'
  );
  const [editWhatsappInput, setEditWhatsappInput] = useState(
    socialLinks?.whatsapp || contactContent?.whatsapp || '+923121578099'
  );
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const getInitials = (name: string) => {
    if (!name) return 'HA';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const handleOpenEditModal = () => {
    setEditNameInput(adminName);
    setEditInstaInput(socialLinks?.instagram || contactContent?.instagram || 'https://www.instagram.com/aces_adventure_club/');
    setEditYoutubeInput(socialLinks?.youtube || contactContent?.youtube || 'https://www.youtube.com/@AcesAdventureClub-007');
    setEditFacebookInput(socialLinks?.facebook || contactContent?.facebook || 'https://www.facebook.com/acesadventureclub');
    setEditWhatsappInput(socialLinks?.whatsapp || contactContent?.whatsapp || '+923121578099');
    setSaveSuccessMsg('');
    setEditModalOpen(true);
  };

  const testExternalUrl = (rawUrl: string) => {
    if (!rawUrl) return;
    let url = rawUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.includes('@') || url.startsWith('+') || /^\d+$/.test(url.replace(/[\s+-]/g, ''))) {
        const cleanNumber = url.replace(/[^0-9]/g, '');
        url = `https://wa.me/${cleanNumber}`;
      } else {
        url = `https://${url}`;
      }
    }
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      Linking.openURL(url).catch((err) => console.warn('Failed to open link:', err));
    }
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

  const handleSaveProfile = async () => {
    const trimmed = editNameInput.trim() || 'Hammad';
    setAdminName(trimmed);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('aces_club_admin_name', trimmed);
    }

    if (updateSocialLinks) {
      await updateSocialLinks({
        instagram: editInstaInput.trim() || 'https://www.instagram.com/aces_adventure_club/',
        youtube: editYoutubeInput.trim() || 'https://www.youtube.com/@AcesAdventureClub-007',
        facebook: editFacebookInput.trim() || 'https://www.facebook.com/acesadventureclub',
        whatsapp: editWhatsappInput.trim() || '+923121578099',
      });
    }

    setSaveSuccessMsg('Profile & live social links updated!');
    setTimeout(() => {
      setEditModalOpen(false);
      setSaveSuccessMsg('');
    }, 1200);
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

              {/* Option 2: View Profile / Edit Name & Socials */}
              <Pressable
                style={styles.dropdownItem}
                onPress={() => {
                  setMenuOpen(false);
                  handleOpenEditModal();
                }}
              >
                <Text style={styles.dropdownItemIcon}>👤</Text>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dropdownItemTitle}>Profile & Social Links</Text>
                  <Text style={styles.dropdownItemSub}>Manage admin & club social handles</Text>
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

      {/* Edit Admin Profile & Social Media Modal */}
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
                <Text style={styles.modalTitle}>Admin Profile & Social Media Links</Text>
                <Text style={styles.modalSubtitle}>Update admin details and live website social channels</Text>
              </View>
              <Pressable onPress={() => setEditModalOpen(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </Pressable>
            </View>

            {saveSuccessMsg ? (
              <View style={styles.modalSuccessToast}>
                <Text style={styles.modalSuccessToastText}>✓ {saveSuccessMsg}</Text>
              </View>
            ) : null}

            <ScrollView style={{ maxHeight: 480 }} showsVerticalScrollIndicator={false}>
              <View style={styles.modalBody}>
                {/* Admin info banner */}
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

                {/* Display Name */}
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

                {/* Section Separator */}
                <View style={styles.socialHeaderBox}>
                  <Text style={styles.socialHeaderBoxTitle}>🌐 LIVE WEBSITE SOCIAL MEDIA CHANNELS</Text>
                  <Text style={styles.socialHeaderBoxSub}>
                    These links control where the Instagram, YouTube, Facebook, and WhatsApp icons lead when users click them on the footer.
                  </Text>
                </View>

                {/* Instagram */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputLabelRow}>
                    <Text style={styles.inputLabel}>📸 INSTAGRAM HANDLE / URL</Text>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(editInstaInput)}
                      style={styles.testLinkBtn}
                    >
                      <Text style={styles.testLinkBtnText}>🔗 Test Link</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.modalInput}
                    value={editInstaInput}
                    onChangeText={setEditInstaInput}
                    placeholder="https://www.instagram.com/aces_adventure_club/"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                </View>

                {/* YouTube */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputLabelRow}>
                    <Text style={styles.inputLabel}>▶️ YOUTUBE CHANNEL / URL</Text>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(editYoutubeInput)}
                      style={styles.testLinkBtn}
                    >
                      <Text style={styles.testLinkBtnText}>🔗 Test Link</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.modalInput}
                    value={editYoutubeInput}
                    onChangeText={setEditYoutubeInput}
                    placeholder="https://www.youtube.com/@AcesAdventureClub-007"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                </View>

                {/* Facebook */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputLabelRow}>
                    <Text style={styles.inputLabel}>📘 FACEBOOK PAGE / URL</Text>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(editFacebookInput)}
                      style={styles.testLinkBtn}
                    >
                      <Text style={styles.testLinkBtnText}>🔗 Test Link</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.modalInput}
                    value={editFacebookInput}
                    onChangeText={setEditFacebookInput}
                    placeholder="https://www.facebook.com/acesadventureclub"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                </View>

                {/* WhatsApp */}
                <View style={styles.inputGroup}>
                  <View style={styles.inputLabelRow}>
                    <Text style={styles.inputLabel}>💬 WHATSAPP NUMBER OR URL</Text>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(editWhatsappInput)}
                      style={styles.testLinkBtn}
                    >
                      <Text style={styles.testLinkBtnText}>🔗 Test Link</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.modalInput}
                    value={editWhatsappInput}
                    onChangeText={setEditWhatsappInput}
                    placeholder="+92 312 1578099 or https://wa.me/923121578099"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setEditModalOpen(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>

              <Pressable style={styles.saveBtn} onPress={handleSaveProfile}>
                <Text style={styles.saveBtnText}>Save Profile & Socials</Text>
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
    maxWidth: 540,
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

  modalSuccessToast: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
  },

  modalSuccessToastText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },

  socialHeaderBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    marginTop: 6,
    gap: 4,
  },

  socialHeaderBoxTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1D4ED8',
    letterSpacing: 0.5,
  },

  socialHeaderBoxSub: {
    fontSize: 11,
    color: '#3B82F6',
    lineHeight: 16,
  },

  inputLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  testLinkBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  testLinkBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B5CAD',
  },
});