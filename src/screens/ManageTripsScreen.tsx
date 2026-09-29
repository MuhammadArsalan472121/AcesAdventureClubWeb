import React, { useState } from 'react';
import {
  Image,
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
import { useData, resolveAsset, ASSET_MAP } from '../context/DataContext';

const PRESET_IMAGES = [
  { key: 'hunza.jpg', label: 'Hunza Valley' },
  { key: 'fairy.jpg', label: 'Fairy Meadows' },
  { key: 'skardu.jpg', label: 'Skardu Lake' },
  { key: 'naran.jpg', label: 'Naran Valley' },
  { key: 'nature.jpg', label: 'Swat Nature' },
  { key: 'featured1.jpg', label: 'K2 Base Camp' },
  { key: 'hiking.jpg', label: 'High Hike' },
  { key: 'camping.jpg', label: 'Wilderness Camp' },
  { key: 'trekking.jpg', label: 'Alpine Trek' },
];

export default function ManageTripsScreen() {
  const { trips, addTrip, updateTrip, deleteTrip } = useData() as any;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    duration: '5 Days',
    difficulty: 'Easy',
    price: 'PKR 40,000',
    badge: 'Featured',
    category: 'Hiking',
    status: 'UPCOMING',
    members: '20',
    description: '',
    aboutText: '',
    fitnessLevel: 'Moderate',
    groupSize: '15 Max',
    bestSeason: 'Spring - Autumn',
    imageKey: 'hunza.jpg',
  });

  const handleOpenAddModal = () => {
    setEditingTripId(null);
    setFormData({
      title: '',
      location: 'Northern Areas, Pakistan',
      duration: '5 Days',
      difficulty: 'Moderate',
      price: 'PKR 45,000',
      badge: 'Featured',
      category: 'Hiking',
      status: 'UPCOMING',
      members: '20',
      description: 'Experience scenic mountain views and guided nature expeditions with ACES Adventure Club.',
      aboutText: 'An incredible mountain expedition through pristine valleys and ancient trails.',
      fitnessLevel: 'Moderate',
      groupSize: '15 Max',
      bestSeason: 'Spring - Autumn',
      imageKey: 'hunza.jpg',
    });
    setModalVisible(true);
  };

  const handleOpenEditModal = (trip: any) => {
    setEditingTripId(trip.id);
    setFormData({
      title: trip.title || '',
      location: trip.location || '',
      duration: trip.duration || '5 Days',
      difficulty: trip.difficulty || 'Easy',
      price: trip.price || 'PKR 40,000',
      badge: trip.badge || 'Featured',
      category: trip.category || 'Hiking',
      status: trip.status || 'UPCOMING',
      members: trip.members ? trip.members.toString() : '20',
      description: trip.description || '',
      aboutText: trip.aboutText || trip.description || '',
      fitnessLevel: trip.fitnessLevel || trip.difficulty || 'Moderate',
      groupSize: trip.groupSize || (trip.members ? `${trip.members} Max` : '15 Max'),
      bestSeason: trip.bestSeason || 'Spring - Autumn',
      imageKey: trip.imageKey || 'hunza.jpg',
    });
    setModalVisible(true);
  };

  const handleSaveTrip = () => {
    if (!formData.title.trim()) {
      alert('Please enter an expedition title');
      return;
    }

    let diffColor = '#22C55E';
    if (formData.difficulty === 'Moderate') diffColor = '#F59E0B';
    if (formData.difficulty === 'Hard') diffColor = '#EF4444';

    if (editingTripId) {
      updateTrip(editingTripId, {
        ...formData,
        difficultyColor: diffColor,
      });
    } else {
      addTrip({
        ...formData,
        difficultyColor: diffColor,
      });
    }
    setModalVisible(false);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteTrip(id);
    }
  };

  const filteredTrips = trips.filter((trip: any) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (trip.category && trip.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || trip.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar activeScreen="Trips" />
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
              <Text style={styles.title}>Trips & Expeditions Manager</Text>
              <Text style={styles.subtitle}>
                Add, edit, delete, and control all adventure packages displayed across the public website.
              </Text>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={handleOpenAddModal}>
              <Text style={styles.addBtnText}>+ ADD NEW EXPEDITION</Text>
            </TouchableOpacity>
          </View>

          {/* Filters & Search Bar */}
          <View style={styles.filterRow}>
            <View style={styles.searchWrapper}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search expeditions by name, location, or category..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.tabFilters}>
              {['ALL', 'UPCOMING', 'ACTIVE', 'COMPLETED', 'DRAFT'].map((st) => (
                <Pressable
                  key={st}
                  style={[
                    styles.tabBtn,
                    statusFilter === st && styles.activeTabBtn,
                  ]}
                  onPress={() => setStatusFilter(st)}
                >
                  <Text
                    style={[
                      styles.tabBtnText,
                      statusFilter === st && styles.activeTabBtnText,
                    ]}
                  >
                    {st}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Table */}
          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={[styles.th, { flex: 2.2 }]}>EXPEDITION & COVER</Text>
              <Text style={[styles.th, { flex: 1.6 }]}>LOCATION</Text>
              <Text style={styles.th}>CATEGORY</Text>
              <Text style={styles.th}>DURATION</Text>
              <Text style={styles.th}>DIFFICULTY</Text>
              <Text style={styles.th}>PRICE (PKR)</Text>
              <Text style={styles.th}>STATUS</Text>
              <Text style={[styles.th, { textAlign: 'center', width: 150, flex: 0 }]}>ACTIONS</Text>
            </View>

            {filteredTrips.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No expeditions found matching your search.</Text>
              </View>
            ) : (
              filteredTrips.map((trip: any) => (
                <View style={styles.tableRow} key={trip.id}>
                  {/* Title & Image & Badge */}
                  <View style={[styles.td, { flex: 2.2, flexDirection: 'row', alignItems: 'center', gap: 12 }]}>
                    <Image
                      source={resolveAsset(trip.imageKey, 'hunza.jpg')}
                      style={styles.tripThumb}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.tripTitleText}>{trip.title}</Text>
                      <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
                        {trip.badge ? (
                          <View style={styles.badgeChip}>
                            <Text style={styles.badgeText}>{trip.badge}</Text>
                          </View>
                        ) : null}
                        <Text style={styles.membersText}>👥 {trip.members || '20'} max</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={[styles.td, { flex: 1.6 }]}>{trip.location}</Text>
                  <Text style={styles.td}>{trip.category || 'Hiking'}</Text>
                  <Text style={styles.td}>{trip.duration}</Text>

                  {/* Difficulty */}
                  <View style={styles.td}>
                    <View
                      style={[
                        styles.diffBadge,
                        {
                          backgroundColor:
                            trip.difficulty === 'Easy'
                              ? '#DCFCE7'
                              : trip.difficulty === 'Moderate'
                              ? '#FEF3C7'
                              : '#FEE2E2',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.diffText,
                          {
                            color:
                              trip.difficulty === 'Easy'
                                ? '#16A34A'
                                : trip.difficulty === 'Moderate'
                                ? '#D97706'
                                : '#DC2626',
                          },
                        ]}
                      >
                        {trip.difficulty}
                      </Text>
                    </View>
                  </View>

                  <Text style={[styles.td, { fontWeight: '800', color: '#0B5CAD', fontSize: 14 }]}>
                    {trip.price}
                  </Text>

                  {/* Status */}
                  <View style={styles.td}>
                    <Text
                      style={[
                        styles.statusTag,
                        trip.status === 'UPCOMING'
                          ? styles.statusUpcoming
                          : trip.status === 'ACTIVE'
                          ? styles.statusActive
                          : trip.status === 'COMPLETED'
                          ? styles.statusCompleted
                          : styles.statusDraft,
                      ]}
                    >
                      {trip.status}
                    </Text>
                  </View>

                  {/* Actions */}
                  <View style={[styles.tdActions, { width: 150 }]}>
                    <TouchableOpacity
                      style={styles.editActionBtn}
                      onPress={() => handleOpenEditModal(trip)}
                    >
                      <Text style={styles.editActionText}>✏️ Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteActionBtn}
                      onPress={() => handleDelete(trip.id, trip.title)}
                    >
                      <Text style={styles.deleteActionText}>🗑️ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>

      {/* Add / Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {editingTripId ? 'Edit Expedition Package' : 'Create New Expedition'}
                </Text>
                <Text style={styles.modalSubTitle}>
                  Fill all details exactly as displayed on the live frontend trip cards & details page.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 520 }} showsVerticalScrollIndicator={false}>
              <View style={styles.formGrid}>
                {/* Title */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>EXPEDITION TITLE *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Hunza Explorer, Fairy Meadows Trek"
                    placeholderTextColor="#94A3B8"
                    value={formData.title}
                    onChangeText={(t) => setFormData({ ...formData, title: t })}
                  />
                </View>

                {/* Location */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>LOCATION / REGION *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Gilgit, Pakistan or Skardu, Pakistan"
                    placeholderTextColor="#94A3B8"
                    value={formData.location}
                    onChangeText={(t) => setFormData({ ...formData, location: t })}
                  />
                </View>

                {/* Duration & Price */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.formLabel}>DURATION</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. 5 Days / 7 Days"
                      placeholderTextColor="#94A3B8"
                      value={formData.duration}
                      onChangeText={(t) => setFormData({ ...formData, duration: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>PRICE (FORMATTED PKR)</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. PKR 40,000"
                      placeholderTextColor="#94A3B8"
                      value={formData.price}
                      onChangeText={(t) => setFormData({ ...formData, price: t })}
                    />
                  </View>
                </View>

                {/* Category & Badge */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.formLabel}>CATEGORY</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Hiking, Camping, Trekking, Nature Trails"
                      placeholderTextColor="#94A3B8"
                      value={formData.category}
                      onChangeText={(t) => setFormData({ ...formData, category: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>BADGE TAG</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="Featured, Popular, Recommended, Elite"
                      placeholderTextColor="#94A3B8"
                      value={formData.badge}
                      onChangeText={(t) => setFormData({ ...formData, badge: t })}
                    />
                  </View>
                </View>

                {/* Difficulty & Status */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.formLabel}>DIFFICULTY LEVEL</Text>
                    <View style={styles.optionPillRow}>
                      {['Easy', 'Moderate', 'Hard'].map((diff) => (
                        <TouchableOpacity
                          key={diff}
                          style={[
                            styles.optionPill,
                            formData.difficulty === diff && styles.activeOptionPill,
                          ]}
                          onPress={() => setFormData({ ...formData, difficulty: diff })}
                        >
                          <Text
                            style={[
                              styles.optionPillText,
                              formData.difficulty === diff && styles.activeOptionPillText,
                            ]}
                          >
                            {diff}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>EXPEDITION STATUS</Text>
                    <View style={styles.optionPillRow}>
                      {['UPCOMING', 'ACTIVE', 'COMPLETED', 'DRAFT'].map((st) => (
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

                {/* Max Members */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>MAX TRAVELERS / MEMBERS CAPACITY</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. 20"
                    placeholderTextColor="#94A3B8"
                    value={formData.members}
                    onChangeText={(t) => setFormData({ ...formData, members: t })}
                  />
                </View>

                {/* Fitness Level & Best Season */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.formLabel}>FITNESS LEVEL</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. Easy-Mod, High, Extreme"
                      placeholderTextColor="#94A3B8"
                      value={formData.fitnessLevel}
                      onChangeText={(t) => setFormData({ ...formData, fitnessLevel: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>BEST SEASON</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. Spring - Autumn, Summer"
                      placeholderTextColor="#94A3B8"
                      value={formData.bestSeason}
                      onChangeText={(t) => setFormData({ ...formData, bestSeason: t })}
                    />
                  </View>
                </View>

                {/* Description */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>CARD OVERVIEW DESCRIPTION</Text>
                  <TextInput
                    style={[styles.formInput, { height: 70 }]}
                    placeholder="Brief description for trip cards..."
                    placeholderTextColor="#94A3B8"
                    multiline
                    numberOfLines={2}
                    textAlignVertical="top"
                    value={formData.description}
                    onChangeText={(t) => setFormData({ ...formData, description: t })}
                  />
                </View>

                {/* Full About / Experience Text */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>FULL ABOUT / EXPERIENCE DESCRIPTION (VIEW DETAILS SCREEN)</Text>
                  <TextInput
                    style={[styles.formInput, { height: 110 }]}
                    placeholder="Comprehensive overview paragraphs displayed when user opens View Details..."
                    placeholderTextColor="#94A3B8"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={formData.aboutText}
                    onChangeText={(t) => setFormData({ ...formData, aboutText: t })}
                  />
                </View>

                {/* Image Selection Presets */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>CHOOSE COVER IMAGE PRESET (OR ENTER CUSTOM URL)</Text>
                  <View style={styles.presetGrid}>
                    {PRESET_IMAGES.map((preset) => (
                      <TouchableOpacity
                        key={preset.key}
                        style={[
                          styles.presetBtn,
                          formData.imageKey === preset.key && styles.activePresetBtn,
                        ]}
                        onPress={() => setFormData({ ...formData, imageKey: preset.key })}
                      >
                        <Image
                          source={resolveAsset(preset.key)}
                          style={styles.presetImg}
                        />
                        <Text
                          style={[
                            styles.presetLabel,
                            formData.imageKey === preset.key && styles.activePresetLabel,
                          ]}
                          numberOfLines={1}
                        >
                          {preset.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TextInput
                    style={[styles.formInput, { marginTop: 8 }]}
                    placeholder="Custom image file (hunza.jpg) or web image URL (https://...)"
                    placeholderTextColor="#94A3B8"
                    value={formData.imageKey}
                    onChangeText={(t) => setFormData({ ...formData, imageKey: t })}
                  />
                </View>
              </View>
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveTrip}>
                <Text style={styles.saveBtnText}>
                  {editingTripId ? 'Save & Publish Changes' : 'Create & Publish Expedition'}
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
    marginBottom: 24,
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
    letterSpacing: 0.5,
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    gap: 16,
  },

  searchWrapper: {
    flex: 1,
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

  tabFilters: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    padding: 4,
    gap: 4,
  },

  tabBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  activeTabBtn: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },

  tabBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },

  activeTabBtnText: {
    color: '#0B5CAD',
    fontWeight: '800',
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

  tripThumb: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },

  tripTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  badgeChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0B5CAD',
  },

  membersText: {
    fontSize: 12,
    color: '#64748B',
  },

  diffBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  diffText: {
    fontSize: 12,
    fontWeight: '700',
  },

  statusTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 11,
    fontWeight: '800',
  },

  statusUpcoming: {
    color: '#0284C7',
    backgroundColor: '#E0F2FE',
  },

  statusActive: {
    color: '#16A34A',
    backgroundColor: '#DCFCE7',
  },

  statusCompleted: {
    color: '#475569',
    backgroundColor: '#F1F5F9',
  },

  statusDraft: {
    color: '#9333EA',
    backgroundColor: '#F3E8FF',
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

  // Modal styles
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalContent: {
    width: '100%',
    maxWidth: 680,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 25,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
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
    paddingRight: 4,
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

  presetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 4,
  },

  presetBtn: {
    width: '31%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
    gap: 8,
  },

  activePresetBtn: {
    borderColor: '#0B5CAD',
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
  },

  presetImg: {
    width: 32,
    height: 32,
    borderRadius: 6,
  },

  presetLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
    flex: 1,
  },

  activePresetLabel: {
    color: '#0B5CAD',
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