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
  const {
    trips,
    addTrip,
    updateTrip,
    deleteTrip,
    tripCategories = [],
    tripBadges = [],
    addTripCategory,
    deleteTripCategory,
    addTripBadge,
    deleteTripBadge,
  } = useData() as any;

  const DEFAULT_CATEGORIES = [
    'Hiking',
    'Camping',
    'Trekking',
    'Nature Trails',
    'Mountaineering',
    'Road Trip',
  ];

  const DEFAULT_BADGES = [
    'Featured',
    'Popular',
    'Recommended',
    'Elite',
    'Trending',
  ];

  const activeCategories = Array.isArray(tripCategories) && tripCategories.length > 0 ? tripCategories : DEFAULT_CATEGORIES;
  const activeBadges = Array.isArray(tripBadges) && tripBadges.length > 0 ? tripBadges : DEFAULT_BADGES;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTripId, setEditingTripId] = useState<string | null>(null);

  // Dropdown states for Add / Edit Modal
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [badgeDropdownOpen, setBadgeDropdownOpen] = useState(false);
  const [busesDropdownOpen, setBusesDropdownOpen] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [newBadgeInput, setNewBadgeInput] = useState('');

  // Standalone Presets Manager Modal state
  const [managePresetsModalVisible, setManagePresetsModalVisible] = useState(false);
  const [standaloneCategoryInput, setStandaloneCategoryInput] = useState('');
  const [standaloneBadgeInput, setStandaloneBadgeInput] = useState('');

  const ADDITIONAL_SERVICES_OPTIONS = [
    'Photography',
    'Tour Guide',
    'Music',
    'Luxury Transport',
    'First Aid Kit',
    'Breakfast',
    'Lunch',
    'Dinner',
    'Entry Tickets',
    'Fun Rides Tickets',
  ];

  const BUS_OPTIONS = ['1', '2'];

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
    tripStartDate: '',
    tripEndDate: '',
    numberOfBuses: '1',
    additionalServices: [] as string[],
    imageKey: 'hunza.jpg',
  });

  const handleOpenAddModal = () => {
    setEditingTripId(null);
    setCategoryDropdownOpen(false);
    setBadgeDropdownOpen(false);
    setBusesDropdownOpen(false);
    setNewCategoryInput('');
    setNewBadgeInput('');
    setFormData({
      title: '',
      location: 'Northern Areas, Pakistan',
      duration: '5 Days',
      difficulty: 'Moderate',
      price: 'PKR 45,000',
      badge: activeBadges[0] || 'Featured',
      category: activeCategories[0] || 'Hiking',
      status: 'UPCOMING',
      members: '20',
      description: 'Experience scenic mountain views and guided nature expeditions with ACES Adventure Club.',
      aboutText: 'An incredible mountain expedition through pristine valleys and ancient trails.',
      fitnessLevel: 'Moderate',
      groupSize: '15 Max',
      tripStartDate: '',
      tripEndDate: '',
      numberOfBuses: '1',
      additionalServices: [] as string[],
      imageKey: 'hunza.jpg',
    });
    setModalVisible(true);
  };

  const handleOpenEditModal = (trip: any) => {
    setEditingTripId(trip.id);
    setCategoryDropdownOpen(false);
    setBadgeDropdownOpen(false);
    setBusesDropdownOpen(false);
    setNewCategoryInput('');
    setNewBadgeInput('');
    setFormData({
      title: trip.title || '',
      location: trip.location || '',
      duration: trip.duration || '5 Days',
      difficulty: trip.difficulty || 'Easy',
      price: trip.price || 'PKR 40,000',
      badge: trip.badge || '',
      category: trip.category || activeCategories[0] || 'Hiking',
      status: trip.status || 'UPCOMING',
      members: trip.members ? trip.members.toString() : '20',
      description: trip.description || '',
      aboutText: trip.aboutText || trip.description || '',
      fitnessLevel: trip.fitnessLevel || trip.difficulty || 'Moderate',
      groupSize: trip.groupSize || (trip.members ? `${trip.members} Max` : '15 Max'),
      tripStartDate: trip.tripStartDate || '',
      tripEndDate: trip.tripEndDate || '',
      numberOfBuses: trip.numberOfBuses || '1',
      additionalServices: Array.isArray(trip.additionalServices) ? trip.additionalServices : [],
      imageKey: trip.imageKey || 'hunza.jpg',
    });
    setModalVisible(true);
  };

  const handleSaveTrip = () => {
    if (!formData.title.trim()) {
      alert('Please enter a trip title');
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
              <Text style={styles.title}>Trips Manager</Text>
              <Text style={styles.subtitle}>
                Add, edit, delete, and control all trip packages displayed across the public website.
              </Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <TouchableOpacity
                style={styles.managePresetsBtn}
                onPress={() => setManagePresetsModalVisible(true)}
              >
                <Text style={styles.managePresetsBtnText}>🏷️ Manage Presets</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.addBtn} onPress={handleOpenAddModal}>
                <Text style={styles.addBtnText}>+ ADD NEW TRIP</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Filters & Search Bar */}
          <View style={styles.filterRow}>
            <View style={styles.searchWrapper}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search trips by name, location, or category..."
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
              <Text style={[styles.th, { flex: 2.2 }]}>TRIP & COVER</Text>
              <Text style={[styles.th, { flex: 1.5 }]}>LOCATION</Text>
              <Text style={[styles.th, { flex: 1.1 }]}>START DATE</Text>
              <Text style={[styles.th, { flex: 1.1 }]}>END DATE</Text>
              <Text style={styles.th}>CATEGORY</Text>
              <Text style={styles.th}>DURATION</Text>
              <Text style={styles.th}>DIFFICULTY</Text>
              <Text style={styles.th}>PRICE (PKR)</Text>
              <Text style={styles.th}>STATUS</Text>
              <Text style={[styles.th, { textAlign: 'center', width: 150, flex: 0 }]}>ACTIONS</Text>
            </View>

            {filteredTrips.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No trips found matching your search.</Text>
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

                  <Text style={[styles.td, { flex: 1.5 }]}>{trip.location}</Text>
                  <Text style={[styles.td, { flex: 1.1, color: trip.tripStartDate ? '#0F172A' : '#94A3B8' }]}>
                    {trip.tripStartDate || '—'}
                  </Text>
                  <Text style={[styles.td, { flex: 1.1, color: trip.tripEndDate ? '#0F172A' : '#94A3B8' }]}>
                    {trip.tripEndDate || '—'}
                  </Text>
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
                  {editingTripId ? 'Edit Trip Package' : 'Create New Trip'}
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
                  <Text style={styles.formLabel}>TRIP TITLE *</Text>
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

                {/* Category & Badge Dropdowns */}
                <View style={[styles.formRow, { alignItems: 'flex-start' }]}>
                  {/* Category Dropdown */}
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <View style={styles.formLabelRow}>
                      <Text style={styles.formLabel}>CATEGORY *</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setCategoryDropdownOpen(!categoryDropdownOpen);
                          setBadgeDropdownOpen(false);
                        }}
                        style={styles.miniManageBtn}
                      >
                        <Text style={styles.miniManageBtnText}>
                          {categoryDropdownOpen ? 'Done' : '+ Add / Manage'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.dropdownTrigger,
                        categoryDropdownOpen && styles.dropdownTriggerActive,
                      ]}
                      onPress={() => {
                        setCategoryDropdownOpen(!categoryDropdownOpen);
                        setBadgeDropdownOpen(false);
                      }}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.dropdownTriggerText,
                          !formData.category && styles.dropdownPlaceholderText,
                        ]}
                      >
                        {formData.category || 'Select Category...'}
                      </Text>
                      <Text style={styles.dropdownChevron}>
                        {categoryDropdownOpen ? '▲' : '▼'}
                      </Text>
                    </TouchableOpacity>

                    {/* Category Dropdown Menu */}
                    {categoryDropdownOpen && (
                      <View style={styles.dropdownMenu}>
                        <Text style={styles.dropdownSectionTitle}>SELECT PRESET CATEGORY</Text>
                        <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled showsVerticalScrollIndicator={true}>
                          {activeCategories.map((cat: string) => {
                            const isSelected = formData.category?.toLowerCase() === cat.toLowerCase();
                            return (
                              <View
                                key={cat}
                                style={[
                                  styles.dropdownItemRow,
                                  isSelected && styles.dropdownItemRowSelected,
                                ]}
                              >
                                <TouchableOpacity
                                  style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
                                  onPress={() => {
                                    setFormData({ ...formData, category: cat });
                                    setCategoryDropdownOpen(false);
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.dropdownItemText,
                                      isSelected && styles.dropdownItemTextSelected,
                                    ]}
                                  >
                                    {isSelected ? '✓  ' : '   '}{cat}
                                  </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={styles.deleteOptionBtn}
                                  onPress={() => {
                                    deleteTripCategory(cat);
                                    if (formData.category?.toLowerCase() === cat.toLowerCase()) {
                                      const next = activeCategories.find((c: string) => c.toLowerCase() !== cat.toLowerCase());
                                      setFormData({ ...formData, category: next || '' });
                                    }
                                  }}
                                >
                                  <Text style={styles.deleteOptionBtnText}>✕</Text>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </ScrollView>

                        {/* Add New Category Inline */}
                        <View style={styles.dropdownAddRow}>
                          <TextInput
                            style={styles.dropdownAddInput}
                            placeholder="New category..."
                            placeholderTextColor="#94A3B8"
                            value={newCategoryInput}
                            onChangeText={setNewCategoryInput}
                            onSubmitEditing={() => {
                              if (newCategoryInput.trim()) {
                                addTripCategory(newCategoryInput.trim());
                                setFormData({ ...formData, category: newCategoryInput.trim() });
                                setNewCategoryInput('');
                              }
                            }}
                          />
                          <TouchableOpacity
                            style={styles.dropdownAddBtn}
                            onPress={() => {
                              if (newCategoryInput.trim()) {
                                addTripCategory(newCategoryInput.trim());
                                setFormData({ ...formData, category: newCategoryInput.trim() });
                                setNewCategoryInput('');
                              }
                            }}
                          >
                            <Text style={styles.dropdownAddBtnText}>+ Add</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  </View>

                  {/* Badge Tag Dropdown */}
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <View style={styles.formLabelRow}>
                      <Text style={styles.formLabel}>BADGE TAG</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setBadgeDropdownOpen(!badgeDropdownOpen);
                          setCategoryDropdownOpen(false);
                        }}
                        style={styles.miniManageBtn}
                      >
                        <Text style={styles.miniManageBtnText}>
                          {badgeDropdownOpen ? 'Done' : '+ Add / Manage'}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.dropdownTrigger,
                        badgeDropdownOpen && styles.dropdownTriggerActive,
                      ]}
                      onPress={() => {
                        setBadgeDropdownOpen(!badgeDropdownOpen);
                        setCategoryDropdownOpen(false);
                      }}
                      activeOpacity={0.8}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
                        {formData.badge ? (
                          <View style={styles.miniBadgePreview}>
                            <Text style={styles.miniBadgePreviewText}>{formData.badge}</Text>
                          </View>
                        ) : (
                          <Text style={styles.dropdownPlaceholderText}>None (No Badge)</Text>
                        )}
                      </View>
                      <Text style={styles.dropdownChevron}>
                        {badgeDropdownOpen ? '▲' : '▼'}
                      </Text>
                    </TouchableOpacity>

                    {/* Badge Dropdown Menu */}
                    {badgeDropdownOpen && (
                      <View style={styles.dropdownMenu}>
                        <Text style={styles.dropdownSectionTitle}>SELECT PRESET BADGE</Text>
                        <ScrollView style={{ maxHeight: 180 }} nestedScrollEnabled showsVerticalScrollIndicator={true}>
                          {/* Option: None / Clear Badge */}
                          <TouchableOpacity
                            style={[
                              styles.dropdownItemRow,
                              !formData.badge && styles.dropdownItemRowSelected,
                            ]}
                            onPress={() => {
                              setFormData({ ...formData, badge: '' });
                              setBadgeDropdownOpen(false);
                            }}
                          >
                            <Text
                              style={[
                                styles.dropdownItemText,
                                !formData.badge && styles.dropdownItemTextSelected,
                                { color: !formData.badge ? '#0B5CAD' : '#64748B' },
                              ]}
                            >
                              {!formData.badge ? '✓  ' : '   '}(None / Clear Badge)
                            </Text>
                          </TouchableOpacity>

                          {activeBadges.map((bg: string) => {
                            const isSelected = formData.badge?.toLowerCase() === bg.toLowerCase();
                            return (
                              <View
                                key={bg}
                                style={[
                                  styles.dropdownItemRow,
                                  isSelected && styles.dropdownItemRowSelected,
                                ]}
                              >
                                <TouchableOpacity
                                  style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}
                                  onPress={() => {
                                    setFormData({ ...formData, badge: bg });
                                    setBadgeDropdownOpen(false);
                                  }}
                                >
                                  <Text
                                    style={[
                                      styles.dropdownItemText,
                                      isSelected && styles.dropdownItemTextSelected,
                                    ]}
                                  >
                                    {isSelected ? '✓ ' : '  '}
                                  </Text>
                                  <View style={styles.miniBadgeOptionChip}>
                                    <Text style={styles.miniBadgeOptionChipText}>{bg}</Text>
                                  </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={styles.deleteOptionBtn}
                                  onPress={() => {
                                    deleteTripBadge(bg);
                                    if (formData.badge?.toLowerCase() === bg.toLowerCase()) {
                                      setFormData({ ...formData, badge: '' });
                                    }
                                  }}
                                >
                                  <Text style={styles.deleteOptionBtnText}>✕</Text>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </ScrollView>

                        {/* Add New Badge Inline */}
                        <View style={styles.dropdownAddRow}>
                          <TextInput
                            style={styles.dropdownAddInput}
                            placeholder="New badge..."
                            placeholderTextColor="#94A3B8"
                            value={newBadgeInput}
                            onChangeText={setNewBadgeInput}
                            onSubmitEditing={() => {
                              if (newBadgeInput.trim()) {
                                addTripBadge(newBadgeInput.trim());
                                setFormData({ ...formData, badge: newBadgeInput.trim() });
                                setNewBadgeInput('');
                              }
                            }}
                          />
                          <TouchableOpacity
                            style={styles.dropdownAddBtn}
                            onPress={() => {
                              if (newBadgeInput.trim()) {
                                addTripBadge(newBadgeInput.trim());
                                setFormData({ ...formData, badge: newBadgeInput.trim() });
                                setNewBadgeInput('');
                              }
                            }}
                          >
                            <Text style={styles.dropdownAddBtnText}>+ Add</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
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
                    <Text style={styles.formLabel}>TRIP STATUS</Text>
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

                {/* Fitness Level */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>FITNESS LEVEL</Text>
                  <View style={styles.optionPillRow}>
                    {['Hiking', 'Trekking', 'Camping', 'Easy', 'Moderate', 'High'].map((fit) => {
                      const isSelected = (formData.fitnessLevel || '').toLowerCase() === fit.toLowerCase();
                      return (
                        <TouchableOpacity
                          key={fit}
                          style={[
                            styles.optionPill,
                            isSelected && styles.activeOptionPill,
                          ]}
                          onPress={() => setFormData({ ...formData, fitnessLevel: fit })}
                        >
                          <Text
                            style={[
                              styles.optionPillText,
                              isSelected && styles.activeOptionPillText,
                            ]}
                          >
                            {fit}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Trip Start & End Dates */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.formLabel}>TRIP START DATE</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. 2026-06-01"
                      placeholderTextColor="#94A3B8"
                      value={formData.tripStartDate}
                      onChangeText={(t) => setFormData({ ...formData, tripStartDate: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>TRIP END DATE</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. 2026-06-06"
                      placeholderTextColor="#94A3B8"
                      value={formData.tripEndDate}
                      onChangeText={(t) => setFormData({ ...formData, tripEndDate: t })}
                    />
                  </View>
                </View>

                {/* Number of Buses Dropdown */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>NUMBER OF BUSES</Text>
                  <TouchableOpacity
                    style={[
                      styles.dropdownTrigger,
                      busesDropdownOpen && styles.dropdownTriggerActive,
                    ]}
                    onPress={() => {
                      setBusesDropdownOpen(!busesDropdownOpen);
                      setCategoryDropdownOpen(false);
                      setBadgeDropdownOpen(false);
                    }}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.dropdownTriggerText}>
                      {formData.numberOfBuses ? `${formData.numberOfBuses} Bus${parseInt(formData.numberOfBuses) > 1 ? 'es' : ''}` : 'Select...'}
                    </Text>
                    <Text style={styles.dropdownChevron}>
                      {busesDropdownOpen ? '▲' : '▼'}
                    </Text>
                  </TouchableOpacity>

                  {busesDropdownOpen && (
                    <View style={[styles.dropdownMenu, { maxHeight: 200 }]}>
                      <Text style={styles.dropdownSectionTitle}>SELECT NUMBER OF BUSES</Text>
                      <ScrollView style={{ maxHeight: 160 }} nestedScrollEnabled showsVerticalScrollIndicator={true}>
                        {BUS_OPTIONS.map((num) => {
                          const isSelected = formData.numberOfBuses === num;
                          return (
                            <TouchableOpacity
                              key={num}
                              style={[
                                styles.dropdownItemRow,
                                isSelected && styles.dropdownItemRowSelected,
                              ]}
                              onPress={() => {
                                setFormData({ ...formData, numberOfBuses: num });
                                setBusesDropdownOpen(false);
                              }}
                            >
                              <Text
                                style={[
                                  styles.dropdownItemText,
                                  isSelected && styles.dropdownItemTextSelected,
                                ]}
                              >
                                {isSelected ? '✓  ' : '   '}{num} Bus{parseInt(num) > 1 ? 'es' : ''}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* Additional Services */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>ADDITIONAL SERVICES</Text>
                  <Text style={[styles.formLabel, { fontSize: 11, color: '#64748B', marginBottom: 10, marginTop: -4 }]}>
                    Select all services included in this trip package
                  </Text>
                  <View style={styles.servicesGrid}>
                    {ADDITIONAL_SERVICES_OPTIONS.map((service) => {
                      const isSelected = formData.additionalServices.includes(service);
                      return (
                        <TouchableOpacity
                          key={service}
                          style={[
                            styles.serviceChip,
                            isSelected && styles.serviceChipActive,
                          ]}
                          onPress={() => {
                            const updated = isSelected
                              ? formData.additionalServices.filter((s: string) => s !== service)
                              : [...formData.additionalServices, service];
                            setFormData({ ...formData, additionalServices: updated });
                          }}
                          activeOpacity={0.75}
                        >
                          <Text style={[styles.serviceChipText, isSelected && styles.serviceChipTextActive]}>
                            {isSelected ? '✓ ' : ''}{service}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
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
                  <View style={[styles.formLabelRow, { marginBottom: 8 }]}>
                    <Text style={styles.formLabel}>TRIP IMAGES (COVER + GALLERY)</Text>
                    <TouchableOpacity
                      style={styles.addImageBtn}
                      onPress={() => {
                        if (typeof document !== 'undefined') {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.accept = 'image/*';
                          input.onchange = (e: any) => {
                            const file = e.target?.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (ev) => {
                                const dataUrl = ev.target?.result as string;
                                if (dataUrl) {
                                  setFormData((prev: any) => ({ ...prev, imageKey: dataUrl }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          };
                          input.click();
                        }
                      }}
                    >
                      <Text style={styles.addImageBtnText}>📁 Add New Image</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={[styles.formLabel, { fontSize: 11, color: '#64748B', marginBottom: 8, marginTop: -4 }]}>
                    Choose a preset cover image or upload a custom image file
                  </Text>

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
                    value={formData.imageKey.startsWith('data:') ? '(Uploaded image)' : formData.imageKey}
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

      {/* Standalone Presets Manager Modal */}
      <Modal visible={managePresetsModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={[styles.modalContent, { maxWidth: 760 }]}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Expedition Presets Manager</Text>
                <Text style={styles.modalSubTitle}>
                  Add or delete Category and Badge Tag options available in the expedition dropdowns.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setManagePresetsModalVisible(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.presetsManagerColumns}>
              {/* Categories Column */}
              <View style={styles.presetsManagerCol}>
                <View style={styles.presetsColHeader}>
                  <Text style={styles.presetsColTitle}>📂 Categories ({activeCategories.length})</Text>
                  <Text style={styles.presetsColDesc}>Options available in the Category dropdown</Text>
                </View>

                {/* Add Category Form */}
                <View style={styles.presetsAddRow}>
                  <TextInput
                    style={styles.presetsAddInput}
                    placeholder="Enter new category name..."
                    placeholderTextColor="#94A3B8"
                    value={standaloneCategoryInput}
                    onChangeText={setStandaloneCategoryInput}
                    onSubmitEditing={() => {
                      if (standaloneCategoryInput.trim()) {
                        addTripCategory(standaloneCategoryInput.trim());
                        setStandaloneCategoryInput('');
                      }
                    }}
                  />
                  <TouchableOpacity
                    style={styles.presetsAddBtn}
                    onPress={() => {
                      if (standaloneCategoryInput.trim()) {
                        addTripCategory(standaloneCategoryInput.trim());
                        setStandaloneCategoryInput('');
                      }
                    }}
                  >
                    <Text style={styles.presetsAddBtnText}>+ Add</Text>
                  </TouchableOpacity>
                </View>

                {/* List of Categories */}
                <ScrollView style={{ maxHeight: 280 }} showsVerticalScrollIndicator={false}>
                  <View style={styles.presetsItemList}>
                    {activeCategories.map((cat: string) => {
                      const tripCount = trips.filter((t: any) => t.category?.toLowerCase() === cat.toLowerCase()).length;
                      return (
                        <View key={cat} style={styles.presetsItemCard}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.presetsItemName}>{cat}</Text>
                            <Text style={styles.presetsItemMeta}>{tripCount} expedition{tripCount !== 1 ? 's' : ''}</Text>
                          </View>
                          <TouchableOpacity
                            style={styles.presetsItemDeleteBtn}
                            onPress={() => deleteTripCategory(cat)}
                          >
                            <Text style={styles.presetsItemDeleteBtnText}>✕ Delete</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>

              {/* Badges Column */}
              <View style={styles.presetsManagerCol}>
                <View style={styles.presetsColHeader}>
                  <Text style={styles.presetsColTitle}>🏷️ Badge Tags ({activeBadges.length})</Text>
                  <Text style={styles.presetsColDesc}>Options available in the Badge Tag dropdown</Text>
                </View>

                {/* Add Badge Form */}
                <View style={styles.presetsAddRow}>
                  <TextInput
                    style={styles.presetsAddInput}
                    placeholder="Enter new badge tag..."
                    placeholderTextColor="#94A3B8"
                    value={standaloneBadgeInput}
                    onChangeText={setStandaloneBadgeInput}
                    onSubmitEditing={() => {
                      if (standaloneBadgeInput.trim()) {
                        addTripBadge(standaloneBadgeInput.trim());
                        setStandaloneBadgeInput('');
                      }
                    }}
                  />
                  <TouchableOpacity
                    style={styles.presetsAddBtn}
                    onPress={() => {
                      if (standaloneBadgeInput.trim()) {
                        addTripBadge(standaloneBadgeInput.trim());
                        setStandaloneBadgeInput('');
                      }
                    }}
                  >
                    <Text style={styles.presetsAddBtnText}>+ Add</Text>
                  </TouchableOpacity>
                </View>

                {/* List of Badges */}
                <ScrollView style={{ maxHeight: 280 }} showsVerticalScrollIndicator={false}>
                  <View style={styles.presetsItemList}>
                    {activeBadges.map((bg: string) => {
                      const tripCount = trips.filter((t: any) => t.badge?.toLowerCase() === bg.toLowerCase()).length;
                      return (
                        <View key={bg} style={styles.presetsItemCard}>
                          <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                              <View style={styles.miniBadgeOptionChip}>
                                <Text style={styles.miniBadgeOptionChipText}>{bg}</Text>
                              </View>
                            </View>
                            <Text style={styles.presetsItemMeta}>{tripCount} expedition{tripCount !== 1 ? 's' : ''}</Text>
                          </View>
                          <TouchableOpacity
                            style={styles.presetsItemDeleteBtn}
                            onPress={() => deleteTripBadge(bg)}
                          >
                            <Text style={styles.presetsItemDeleteBtnText}>✕ Delete</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => setManagePresetsModalVisible(false)}
              >
                <Text style={styles.saveBtnText}>Done / Close</Text>
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

  /* Preset Management & Dropdown Styles */
  managePresetsBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  managePresetsBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0B5CAD',
  },

  formLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },

  miniManageBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#EFF6FF',
  },

  miniManageBtnText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0B5CAD',
  },

  dropdownTrigger: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownTriggerActive: {
    borderColor: '#0B5CAD',
    backgroundColor: '#FFFFFF',
  },

  dropdownTriggerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },

  dropdownPlaceholderText: {
    fontSize: 14,
    color: '#94A3B8',
  },

  dropdownChevron: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '800',
    marginLeft: 8,
  },

  dropdownMenu: {
    marginTop: 6,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },

  dropdownSectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    marginBottom: 8,
    paddingHorizontal: 4,
  },

  dropdownItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 3,
  },

  dropdownItemRowSelected: {
    backgroundColor: '#EFF6FF',
  },

  dropdownItemText: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '500',
  },

  dropdownItemTextSelected: {
    color: '#0B5CAD',
    fontWeight: '800',
  },

  deleteOptionBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#FEE2E2',
    marginLeft: 6,
  },

  deleteOptionBtnText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '800',
  },

  dropdownAddRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },

  dropdownAddInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
    fontSize: 12,
    color: '#0F172A',
  },

  dropdownAddBtn: {
    backgroundColor: '#0B5CAD',
    paddingHorizontal: 12,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dropdownAddBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  miniBadgePreview: {
    backgroundColor: '#0B5CAD',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },

  miniBadgePreviewText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },

  miniBadgeOptionChip: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },

  miniBadgeOptionChipText: {
    color: '#0B5CAD',
    fontSize: 11,
    fontWeight: '700',
  },

  /* Standalone Presets Modal Styles */
  presetsManagerColumns: {
    flexDirection: 'row',
    gap: 20,
    marginVertical: 10,
  },

  presetsManagerCol: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  presetsColHeader: {
    marginBottom: 12,
  },

  presetsColTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  presetsColDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  presetsAddRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },

  presetsAddInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 38,
    fontSize: 13,
    color: '#0F172A',
  },

  presetsAddBtn: {
    backgroundColor: '#0B5CAD',
    paddingHorizontal: 14,
    height: 38,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  presetsAddBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  presetsItemList: {
    gap: 8,
  },

  presetsItemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 10,
  },

  presetsItemName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },

  presetsItemMeta: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },

  presetsItemDeleteBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
  },

  presetsItemDeleteBtnText: {
    fontSize: 11,
    color: '#DC2626',
    fontWeight: '700',
  },

  /* Additional Services Checkbox Grid */
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  serviceChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    cursor: 'pointer',
  },

  serviceChipActive: {
    backgroundColor: '#EFF6FF',
    borderColor: '#0B5CAD',
  },

  serviceChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },

  serviceChipTextActive: {
    color: '#0B5CAD',
    fontWeight: '800',
  },

  /* Add New Image Button */
  addImageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B5CAD',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    cursor: 'pointer',
  },

  addImageBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});