import React, { useState } from 'react';
import {
  Modal,
  Pressable,
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

export default function SponsorsManagementScreen() {
  const {
    sponsors,
    officialPartner,
    addSponsor,
    updateSponsor,
    deleteSponsor,
    updateOfficialPartner,
  } = useData();

  const [modalVisible, setModalVisible] = useState(false);
  const [partnerModalVisible, setPartnerModalVisible] = useState(false);
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null);

  // Sponsor form
  const [sponsorForm, setSponsorForm] = useState({
    sponsorName: '',
    companyName: '',
    phone: '',
    email: '',
    trips: '1',
    status: 'ACTIVE',
  });

  // Official Partner form
  const [partnerForm, setPartnerForm] = useState({
    name: officialPartner?.name || '',
    tag1: officialPartner?.tag1 || '',
    tag2: officialPartner?.tag2 || '',
    description: officialPartner?.description || '',
    imageKey: officialPartner?.imageKey || 'partnerProfile.jpg',
  });

  const handleOpenAdd = () => {
    setEditingSponsorId(null);
    setSponsorForm({
      sponsorName: '',
      companyName: '',
      phone: '',
      email: '',
      trips: '1',
      status: 'ACTIVE',
    });
    setModalVisible(true);
  };

  const handleOpenEdit = (sponsor: any) => {
    setEditingSponsorId(sponsor.id);
    setSponsorForm({
      sponsorName: sponsor.sponsorName || sponsor.name || '',
      companyName: sponsor.companyName || sponsor.name || '',
      phone: sponsor.phone || sponsor.contactNumber || '',
      email: sponsor.email || sponsor.contact || '',
      trips: sponsor.trips ? String(sponsor.trips) : '1',
      status: sponsor.status || 'ACTIVE',
    });
    setModalVisible(true);
  };

  const handleSaveSponsor = () => {
    if (!sponsorForm.sponsorName.trim()) {
      alert('Please enter sponsor name');
      return;
    }
    if (!sponsorForm.companyName.trim()) {
      alert('Please enter company name');
      return;
    }
    if (!sponsorForm.phone.trim()) {
      alert('Please enter contact number');
      return;
    }
    if (!sponsorForm.email.trim()) {
      alert('Please enter email address');
      return;
    }
    if (!sponsorForm.trips.trim()) {
      alert('Please enter sponsor trips count');
      return;
    }

    const payload = {
      sponsorName: sponsorForm.sponsorName.trim(),
      companyName: sponsorForm.companyName.trim(),
      name: sponsorForm.companyName.trim(),
      phone: sponsorForm.phone.trim(),
      email: sponsorForm.email.trim(),
      contact: sponsorForm.email.trim(),
      trips: sponsorForm.trips.trim(),
      status: sponsorForm.status,
    };

    if (editingSponsorId) {
      updateSponsor(editingSponsorId, payload);
    } else {
      addSponsor(payload);
    }
    setModalVisible(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from sponsors?`)) {
      deleteSponsor(id);
    }
  };

  const handleOpenPartnerEdit = () => {
    setPartnerForm({
      name: officialPartner?.name || '',
      tag1: officialPartner?.tag1 || '',
      tag2: officialPartner?.tag2 || '',
      description: officialPartner?.description || '',
      imageKey: officialPartner?.imageKey || 'partnerProfile.jpg',
    });
    setPartnerModalVisible(true);
  };

  const handleSavePartner = () => {
    updateOfficialPartner(partnerForm);
    setPartnerModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar activeScreen="Sponsors" />
      </View>

      <View style={styles.main}>
        <TopBar />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header */}
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>Sponsors & Strategic Partners</Text>
              <Text style={styles.subtitle}>
                Manage corporate partnerships, sponsored trips count, and the official featured partner on the live website.
              </Text>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={handleOpenAdd}>
              <Text style={styles.addBtnText}>+ ADD NEW SPONSOR</Text>
            </TouchableOpacity>
          </View>

          {/* Official Partner Highlight Card */}
          <View style={styles.partnerCard}>
            <View style={styles.partnerCardHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.partnerTag}>👑 CURRENT OFFICIAL FEATURED PARTNER</Text>
                <Text style={styles.partnerName}>{officialPartner?.name}</Text>
                <View style={styles.tagRow}>
                  <View style={styles.tagPill}><Text style={styles.tagPillText}>{officialPartner?.tag1}</Text></View>
                  <View style={styles.tagPill}><Text style={styles.tagPillText}>{officialPartner?.tag2}</Text></View>
                </View>
              </View>

              <TouchableOpacity style={styles.editPartnerBtn} onPress={handleOpenPartnerEdit}>
                <Text style={styles.editPartnerText}>✏️ Edit Partner Spotlight ➔</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.partnerDesc} numberOfLines={3}>
              {officialPartner?.description}
            </Text>
          </View>

          {/* Sponsors Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { flex: 1.5 }]}>SPONSOR NAME</Text>
              <Text style={[styles.th, { flex: 1.6 }]}>COMPANY NAME</Text>
              <Text style={[styles.th, { flex: 1.3 }]}>CONTACT NUMBER</Text>
              <Text style={[styles.th, { flex: 1.6 }]}>EMAIL</Text>
              <Text style={[styles.th, { flex: 1.2 }]}>SPONSORED TRIPS</Text>
              <Text style={[styles.th, { flex: 1 }]}>STATUS</Text>
              <Text style={[styles.th, { textAlign: 'center', width: 140, flex: 0 }]}>ACTIONS</Text>
            </View>

            {sponsors.map((sponsor) => {
              const displayName = sponsor.sponsorName || sponsor.name || 'Sponsor';
              const displayCompany = sponsor.companyName || sponsor.name || '-';
              const displayPhone = sponsor.phone || sponsor.contactNumber || '-';
              const displayEmail = sponsor.email || sponsor.contact || '-';
              const tripsCount = sponsor.trips || '0';
              const initials = (displayName || displayCompany).substring(0, 2).toUpperCase();

              return (
                <View style={styles.tableRow} key={sponsor.id}>
                  <View style={[styles.td, { flex: 1.5, flexDirection: 'row', alignItems: 'center', gap: 10 }]}>
                    <View style={styles.logoCircle}>
                      <Text style={styles.logoText}>{initials}</Text>
                    </View>
                    <Text style={styles.sponsorNameText} numberOfLines={1}>{displayName}</Text>
                  </View>

                  <Text style={[styles.td, { flex: 1.6, fontWeight: '600' }]} numberOfLines={1}>{displayCompany}</Text>
                  <Text style={[styles.td, { flex: 1.3 }]} numberOfLines={1}>{displayPhone}</Text>
                  <Text style={[styles.td, { flex: 1.6, color: '#0B5CAD' }]} numberOfLines={1}>{displayEmail}</Text>
                  <Text style={[styles.td, { flex: 1.2, fontWeight: '700' }]}>{tripsCount} Trips</Text>

                  <View style={[styles.td, { flex: 1 }]}>
                    <Text
                      style={[
                        styles.statusTag,
                        sponsor.status === 'ACTIVE'
                          ? styles.statusActive
                          : styles.statusInactive,
                      ]}
                    >
                      {sponsor.status}
                    </Text>
                  </View>

                  <View style={[styles.tdActions, { width: 140 }]}>
                    <TouchableOpacity
                      style={styles.editActionBtn}
                      onPress={() => handleOpenEdit(sponsor)}
                    >
                      <Text style={styles.editActionText}>✏️ Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteActionBtn}
                      onPress={() => handleDelete(sponsor.id, displayCompany || displayName)}
                    >
                      <Text style={styles.deleteActionText}>🗑️ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Add / Edit Sponsor Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {editingSponsorId ? 'Edit Sponsor Details' : 'Add New Sponsor'}
                </Text>
                <Text style={styles.modalSubTitle}>
                  Manage sponsor contact information, company name, and sponsored trips.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGrid}>
              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                  <Text style={styles.formLabel}>SPONSOR NAME *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. John Doe / Muhammad Ali"
                    placeholderTextColor="#94A3B8"
                    value={sponsorForm.sponsorName}
                    onChangeText={(t) => setSponsorForm({ ...sponsorForm, sponsorName: t })}
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>COMPANY NAME *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Mountain Gear Pakistan"
                    placeholderTextColor="#94A3B8"
                    value={sponsorForm.companyName}
                    onChangeText={(t) => setSponsorForm({ ...sponsorForm, companyName: t })}
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                  <Text style={styles.formLabel}>CONTACT NUMBER *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. +92 300 1234567"
                    placeholderTextColor="#94A3B8"
                    value={sponsorForm.phone}
                    onChangeText={(t) => setSponsorForm({ ...sponsorForm, phone: t })}
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>EMAIL ADDRESS *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="contact@company.com"
                    placeholderTextColor="#94A3B8"
                    value={sponsorForm.email}
                    onChangeText={(t) => setSponsorForm({ ...sponsorForm, email: t })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                  <Text style={styles.formLabel}>SPONSOR TRIPS COUNT *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. 5"
                    placeholderTextColor="#94A3B8"
                    value={sponsorForm.trips}
                    onChangeText={(t) => setSponsorForm({ ...sponsorForm, trips: t })}
                    keyboardType="numeric"
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>ACCOUNT STATUS</Text>
                  <View style={styles.optionPillRow}>
                    {['ACTIVE', 'INACTIVE'].map((st) => (
                      <TouchableOpacity
                        key={st}
                        style={[
                          styles.optionPill,
                          sponsorForm.status === st && styles.activeOptionPill,
                        ]}
                        onPress={() => setSponsorForm({ ...sponsorForm, status: st })}
                      >
                        <Text
                          style={[
                            styles.optionPillText,
                            sponsorForm.status === st && styles.activeOptionPillText,
                          ]}
                        >
                          {st}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
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

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveSponsor}>
                <Text style={styles.saveBtnText}>
                  {editingSponsorId ? 'Save Changes' : 'Add Sponsor'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Official Partner Modal */}
      <Modal visible={partnerModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Edit Official Partner Spotlight</Text>
                <Text style={styles.modalSubTitle}>
                  Update the featured corporate partner displayed prominently on the Partners screen.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setPartnerModalVisible(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formGrid}>
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>PARTNER COMPANY NAME</Text>
                <TextInput
                  style={styles.formInput}
                  value={partnerForm.name}
                  onChangeText={(t) => setPartnerForm({ ...partnerForm, name: t })}
                />
              </View>

              <View style={styles.formRow}>
                <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                  <Text style={styles.formLabel}>BADGE TAG 1</Text>
                  <TextInput
                    style={styles.formInput}
                    value={partnerForm.tag1}
                    onChangeText={(t) => setPartnerForm({ ...partnerForm, tag1: t })}
                  />
                </View>

                <View style={[styles.formGroup, { flex: 1 }]}>
                  <Text style={styles.formLabel}>BADGE TAG 2</Text>
                  <TextInput
                    style={styles.formInput}
                    value={partnerForm.tag2}
                    onChangeText={(t) => setPartnerForm({ ...partnerForm, tag2: t })}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>PARTNER SPOTLIGHT DESCRIPTION</Text>
                <TextInput
                  style={[styles.formInput, { height: 100 }]}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  value={partnerForm.description}
                  onChangeText={(t) => setPartnerForm({ ...partnerForm, description: t })}
                />
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setPartnerModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSavePartner}>
                <Text style={styles.saveBtnText}>Update Partner Spotlight</Text>
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

  partnerCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },

  partnerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  partnerTag: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0B5CAD',
    letterSpacing: 0.8,
  },

  partnerName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 4,
  },

  tagRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },

  tagPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  tagPillText: {
    fontSize: 12,
    color: '#1D4ED8',
    fontWeight: '700',
  },

  editPartnerBtn: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  editPartnerText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B5CAD',
  },

  partnerDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
    marginTop: 4,
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

  logoCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: '#0284C7',
    fontSize: 13,
    fontWeight: '800',
  },

  sponsorNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
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

  // Modals
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