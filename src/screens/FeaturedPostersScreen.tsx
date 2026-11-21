import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import { useData, resolveAsset } from '../context/DataContext';

const PRESET_POSTERS = [
  { key: 'galiyat-poster.jpg', label: 'Galiyat Flyer' },
  { key: 'hunza.jpg', label: 'Hunza Valley' },
  { key: 'fairy.jpg', label: 'Fairy Meadows' },
  { key: 'skardu.jpg', label: 'Skardu Lake' },
  { key: 'naran.jpg', label: 'Naran Valley' },
  { key: 'featured1.jpg', label: 'K2 Base Camp' },
];

export default function FeaturedPostersScreen() {
  const {
    featuredPosters = [],
    addFeaturedPoster,
    updateFeaturedPoster,
    deleteFeaturedPoster,
  } = useData() as any;

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [zoomModalVisible, setZoomModalVisible] = useState(false);
  const [zoomImage, setZoomImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    posterKey: 'galiyat-poster.jpg',
    badge: '🔥 FEATURED SPECIAL TRIP',
    title: '',
    subtitle: '',
    description: '',
    price: 'Rs. 4,000/-',
    priceTag: 'ONLY',
    departureTime: '6:00 AM',
    returnTime: '8:00 PM',
    pickupPoint: 'Islamabad / Rawalpindi',
    services: 'Entry Tickets (Ayubia Tunnel, Pipeline, Park), Luxury Air-Conditioned Transport, Delicious Dinner Included, Bonfire Night & Music Entertainment',
    whatsappMsg: '',
    status: 'ACTIVE',
  });

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      posterKey: 'galiyat-poster.jpg',
      badge: '🔥 FEATURED SPECIAL TRIP',
      title: '',
      subtitle: '',
      description: '',
      price: 'Rs. 4,000/-',
      priceTag: 'ONLY',
      departureTime: '6:00 AM',
      returnTime: '8:00 PM',
      pickupPoint: 'Islamabad / Rawalpindi',
      services: 'Entry Tickets (Ayubia Tunnel, Pipeline, Park), Luxury Air-Conditioned Transport, Delicious Dinner Included, Bonfire Night & Music Entertainment',
      whatsappMsg: '',
      status: 'ACTIVE',
    });
    setModalVisible(true);
  };

  const handleOpenEdit = (poster: any) => {
    setEditingId(poster.id);
    const servicesStr = Array.isArray(poster.services)
      ? poster.services.map((s: any) => (typeof s === 'string' ? s : s.text || s.label || '')).join(', ')
      : String(poster.services || '');

    setFormData({
      posterKey: poster.posterKey || 'galiyat-poster.jpg',
      badge: poster.badge || '🔥 FEATURED SPECIAL TRIP',
      title: poster.title || '',
      subtitle: poster.subtitle || '',
      description: poster.description || '',
      price: poster.price || 'Rs. 4,000/-',
      priceTag: poster.priceTag || 'ONLY',
      departureTime: poster.departureTime || '6:00 AM',
      returnTime: poster.returnTime || '8:00 PM',
      pickupPoint: poster.pickupPoint || 'Islamabad / Rawalpindi',
      services: servicesStr,
      whatsappMsg: poster.whatsappMsg || '',
      status: poster.status || 'ACTIVE',
    });
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Please enter a trip title for this promo poster.');
      return;
    }

    const servicesArr = formData.services
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      services: servicesArr,
    };

    if (editingId) {
      await updateFeaturedPoster(editingId, payload);
    } else {
      await addFeaturedPoster(payload);
    }
    setModalVisible(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete promo poster for "${title}"?`)) {
      deleteFeaturedPoster(id);
    }
  };

  const filteredPosters = (featuredPosters || []).filter((p: any) => {
    const matchesSearch =
      !searchQuery.trim() ||
      (p.title && p.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.subtitle && p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.price && p.price.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeCount = (featuredPosters || []).filter((p: any) => p.status === 'ACTIVE').length;

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar activeScreen="Featured Ads" />
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
              <Text style={styles.title}>Featured Ads & Posters Manager</Text>
              <Text style={styles.subtitle}>
                Control promotional tour flyers, advertisements, and announcements displayed on the homepage slider.
              </Text>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={handleOpenAdd}>
              <Text style={styles.addBtnText}>+ ADD NEW PROMO POSTER</Text>
            </TouchableOpacity>
          </View>

          {/* Dynamic Slider Rules Banner */}
          <View style={styles.ruleBanner}>
            <Text style={styles.ruleIcon}>💡</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.ruleTitle}>
                HOMEPAGE SLIDER STATUS: {activeCount > 1 ? `MULTI-SLIDER ACTIVE (${activeCount} Posters)` : 'SINGLE SPOTLIGHT (Static)'}
              </Text>
              <Text style={styles.ruleText}>
                {activeCount > 1
                  ? `You have ${activeCount} active posters. The homepage slider is auto-playing every 6 seconds with left/right arrows and dots!`
                  : `You currently have 1 active poster. The homepage displays it as a clean static featured showcase. Adding more posters will automatically activate the interactive multi-slide carousel!`}
              </Text>
            </View>
          </View>

          {/* Filters & Search */}
          <View style={styles.filterRow}>
            <View style={styles.searchWrapper}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search promo posters by title, destinations, or price..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <View style={styles.tabFilters}>
              {['ALL', 'ACTIVE', 'INACTIVE'].map((st) => (
                <Pressable
                  key={st}
                  style={[styles.tabBtn, statusFilter === st && styles.activeTabBtn]}
                  onPress={() => setStatusFilter(st)}
                >
                  <Text style={[styles.tabBtnText, statusFilter === st && styles.activeTabBtnText]}>
                    {st}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Posters Table with Horizontal Scroll */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            style={{ width: '100%' }}
            contentContainerStyle={{ minWidth: 1280 }}
          >
            <View style={[styles.tableContainer, { width: 1280 }]}>
              {/* Table Header */}
              <View style={[styles.tableHeader, { width: 1280 }]}>
                <View style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[styles.th, { textAlign: 'center' }]}>FLYER</Text>
                </View>
                <View style={{ width: 340, paddingRight: 14 }}>
                  <Text style={styles.th}>PROMO TRIP & DESTINATIONS</Text>
                </View>
                <View style={{ width: 150, paddingRight: 12 }}>
                  <Text style={styles.th}>CHARGES</Text>
                </View>
                <View style={{ width: 180, paddingRight: 12 }}>
                  <Text style={styles.th}>DEPARTURE & RETURN</Text>
                </View>
                <View style={{ width: 220, paddingRight: 12 }}>
                  <Text style={styles.th}>SERVICES INCLUDED</Text>
                </View>
                <View style={{ width: 110, paddingRight: 10 }}>
                  <Text style={styles.th}>STATUS</Text>
                </View>
                <View style={{ width: 160, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={[styles.th, { textAlign: 'center' }]}>ACTIONS</Text>
                </View>
              </View>

              {filteredPosters.length === 0 ? (
                <View style={[styles.emptyState, { width: 1280 }]}>
                  <Text style={styles.emptyText}>No promo posters found matching your search.</Text>
                </View>
              ) : (
                filteredPosters.map((poster: any) => {
                  const servicesList = Array.isArray(poster.services)
                    ? poster.services
                    : String(poster.services || '').split(',').map((s) => s.trim()).filter(Boolean);

                  return (
                    <View style={[styles.tableRow, { width: 1280 }]} key={poster.id}>
                      {/* 1. FLYER THUMB */}
                      <View style={{ width: 100, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                          onPress={() => {
                            setZoomImage(poster.posterKey);
                            setZoomModalVisible(true);
                          }}
                        >
                          <Image
                            source={resolveAsset(poster.posterKey, 'galiyat-poster.jpg')}
                            style={styles.posterThumb}
                            resizeMode="cover"
                          />
                        </TouchableOpacity>
                      </View>

                      {/* 2. TRIP & DESTINATIONS */}
                      <View style={{ width: 340, paddingRight: 14, justifyContent: 'center' }}>
                        <View style={styles.badgeChip}>
                          <Text style={styles.badgeText}>{poster.badge || 'PROMO'}</Text>
                        </View>
                        <Text style={styles.posterTitleText} numberOfLines={1}>{poster.title}</Text>
                        <Text style={styles.posterSubtitleText} numberOfLines={2}>{poster.subtitle}</Text>
                      </View>

                      {/* 3. CHARGES */}
                      <View style={{ width: 150, paddingRight: 12, justifyContent: 'center' }}>
                        <Text style={styles.priceBigText}>{poster.price}</Text>
                        <Text style={styles.priceTagText}>{poster.priceTag}</Text>
                      </View>

                      {/* 4. TIMINGS */}
                      <View style={{ width: 180, paddingRight: 12, justifyContent: 'center' }}>
                        <Text style={styles.timingItem}>🕒 Dep: {poster.departureTime}</Text>
                        <Text style={styles.timingItem}>🔄 Ret: {poster.returnTime}</Text>
                        <Text style={styles.pickupItem} numberOfLines={1}>📍 {poster.pickupPoint}</Text>
                      </View>

                      {/* 5. SERVICES */}
                      <View style={{ width: 220, paddingRight: 12, justifyContent: 'center' }}>
                        <Text style={styles.servicesCountText}>
                          {servicesList.length} services included
                        </Text>
                        <Text style={styles.servicesSampleText} numberOfLines={2}>
                          {servicesList.join(' • ')}
                        </Text>
                      </View>

                      {/* 6. STATUS */}
                      <View style={{ width: 110, paddingRight: 10, justifyContent: 'center' }}>
                        <TouchableOpacity
                          style={[
                            styles.statusTag,
                            poster.status === 'ACTIVE' ? styles.statusActive : styles.statusInactive,
                          ]}
                          onPress={() =>
                            updateFeaturedPoster(poster.id, {
                              status: poster.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
                            })
                          }
                        >
                          <Text
                            style={[
                              styles.statusTagText,
                              poster.status === 'ACTIVE' ? styles.statusActiveText : styles.statusInactiveText,
                            ]}
                          >
                            {poster.status === 'ACTIVE' ? '✓ ACTIVE' : '✕ INACTIVE'}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* 7. ACTIONS */}
                      <View style={{ width: 160, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity
                          style={styles.editActionBtn}
                          onPress={() => handleOpenEdit(poster)}
                        >
                          <Text style={styles.editActionText}>✏️ Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.deleteActionBtn}
                          onPress={() => handleDelete(poster.id, poster.title)}
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
        </ScrollView>
      </View>

      {/* Add / Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {editingId ? 'Edit Featured Promo Poster' : 'Create New Promo Poster'}
                </Text>
                <Text style={styles.modalSubTitle}>
                  Details entered here appear live on the homepage poster slider showcase.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 540 }} showsVerticalScrollIndicator={false}>
              <View style={styles.formGrid}>
                {/* Poster Image File Upload & Presets */}
                <View style={styles.formGroup}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={styles.formLabel}>POSTER / FLYER IMAGE *</Text>
                    <TouchableOpacity
                      style={styles.uploadBtn}
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
                                  setFormData((prev) => ({ ...prev, posterKey: dataUrl }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          };
                          input.click();
                        }
                      }}
                    >
                      <Text style={styles.uploadBtnText}>📁 Upload Poster Flyer</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.presetRow}>
                    {PRESET_POSTERS.map((preset) => (
                      <TouchableOpacity
                        key={preset.key}
                        style={[
                          styles.presetBtn,
                          formData.posterKey === preset.key && styles.activePresetBtn,
                        ]}
                        onPress={() => setFormData({ ...formData, posterKey: preset.key })}
                      >
                        <Image source={resolveAsset(preset.key)} style={styles.presetThumb} />
                        <Text style={styles.presetLabel} numberOfLines={1}>{preset.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TextInput
                    style={[styles.formInput, { marginTop: 8 }]}
                    placeholder="Poster file name (galiyat-poster.jpg) or web image URL (https://...)"
                    placeholderTextColor="#94A3B8"
                    value={formData.posterKey.startsWith('data:') ? '(Uploaded Custom Poster)' : formData.posterKey}
                    onChangeText={(t) => setFormData({ ...formData, posterKey: t })}
                  />
                </View>

                {/* Badge & Title */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>PROMO BADGE</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. 🔥 FEATURED SPECIAL TRIP"
                      placeholderTextColor="#94A3B8"
                      value={formData.badge}
                      onChangeText={(t) => setFormData({ ...formData, badge: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1.5 }]}>
                    <Text style={styles.formLabel}>TRIP / TOUR TITLE *</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. AN UNFORGETTABLE TRIP TO GALIYAT!"
                      placeholderTextColor="#94A3B8"
                      value={formData.title}
                      onChangeText={(t) => setFormData({ ...formData, title: t })}
                    />
                  </View>
                </View>

                {/* Subtitle / Destinations */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>DESTINATIONS & HIGHLIGHTS</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Ayubia • Pipeline Track • Dunga Gali • Nathia Gali • Wonderland Park"
                    placeholderTextColor="#94A3B8"
                    value={formData.subtitle}
                    onChangeText={(t) => setFormData({ ...formData, subtitle: t })}
                  />
                </View>

                {/* Description */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>SHORT OVERVIEW / TAGLINE</Text>
                  <TextInput
                    style={[styles.formInput, { height: 60 }]}
                    placeholder="Brief exciting overview..."
                    placeholderTextColor="#94A3B8"
                    multiline
                    numberOfLines={2}
                    value={formData.description}
                    onChangeText={(t) => setFormData({ ...formData, description: t })}
                  />
                </View>

                {/* Price, PriceTag, Pickup */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>CHARGES / PRICE</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. Rs. 4,000/-"
                      placeholderTextColor="#94A3B8"
                      value={formData.price}
                      onChangeText={(t) => setFormData({ ...formData, price: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 0.8 }]}>
                    <Text style={styles.formLabel}>PRICE TAG</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. ONLY or PER PERSON"
                      placeholderTextColor="#94A3B8"
                      value={formData.priceTag}
                      onChangeText={(t) => setFormData({ ...formData, priceTag: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1.2 }]}>
                    <Text style={styles.formLabel}>PICKUP POINT</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. Islamabad / Rawalpindi"
                      placeholderTextColor="#94A3B8"
                      value={formData.pickupPoint}
                      onChangeText={(t) => setFormData({ ...formData, pickupPoint: t })}
                    />
                  </View>
                </View>

                {/* Departure Time & Return Time */}
                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>DEPARTURE TIME</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. 6:00 AM"
                      placeholderTextColor="#94A3B8"
                      value={formData.departureTime}
                      onChangeText={(t) => setFormData({ ...formData, departureTime: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>RETURN TIME</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. 8:00 PM"
                      placeholderTextColor="#94A3B8"
                      value={formData.returnTime}
                      onChangeText={(t) => setFormData({ ...formData, returnTime: t })}
                    />
                  </View>

                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>STATUS</Text>
                    <View style={{ flexDirection: 'row', gap: 6, marginTop: 4 }}>
                      {['ACTIVE', 'INACTIVE'].map((st) => (
                        <TouchableOpacity
                          key={st}
                          style={[
                            styles.statusBtn,
                            formData.status === st && styles.statusBtnActive,
                          ]}
                          onPress={() => setFormData({ ...formData, status: st })}
                        >
                          <Text
                            style={[
                              styles.statusBtnText,
                              formData.status === st && styles.statusBtnTextActive,
                            ]}
                          >
                            {st}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>

                {/* Services Included */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>SERVICES INCLUDED (COMMA-SEPARATED)</Text>
                  <TextInput
                    style={[styles.formInput, { height: 60 }]}
                    placeholder="e.g. Luxury Air-Conditioned Transport, Delicious Dinner Included, Bonfire Night, Entry Tickets"
                    placeholderTextColor="#94A3B8"
                    multiline
                    numberOfLines={2}
                    value={formData.services}
                    onChangeText={(t) => setFormData({ ...formData, services: t })}
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>{editingId ? 'Save Changes' : 'Create Poster'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Zoom Modal */}
      <Modal visible={zoomModalVisible} transparent animationType="fade">
        <View style={styles.zoomBackdrop}>
          <TouchableOpacity style={styles.zoomCloseBtn} onPress={() => setZoomModalVisible(false)}>
            <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '700' }}>✕</Text>
          </TouchableOpacity>
          <Image
            source={resolveAsset(zoomImage || 'galiyat-poster.jpg', 'galiyat-poster.jpg')}
            style={{ width: '90%', height: '88%' }}
            resizeMode="contain"
          />
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
    letterSpacing: 0.5,
  },

  ruleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#93C5FD',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    gap: 14,
  },

  ruleIcon: {
    fontSize: 26,
  },

  ruleTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#1E40AF',
    letterSpacing: 0.5,
  },

  ruleText: {
    fontSize: 12,
    color: '#3B82F6',
    marginTop: 2,
    lineHeight: 18,
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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },

  th: {
    fontSize: 12,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
  },

  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  posterThumb: {
    width: 52,
    height: 72,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  badgeChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },

  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#DC2626',
  },

  posterTitleText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },

  posterSubtitleText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  priceBigText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0B5CAD',
  },

  priceTagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },

  timingItem: {
    fontSize: 12,
    color: '#0F172A',
    fontWeight: '600',
  },

  pickupItem: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  servicesCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B5CAD',
  },

  servicesSampleText: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  statusTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    cursor: 'pointer',
  },

  statusActive: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
  },

  statusInactive: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  statusTagText: {
    fontSize: 11,
    fontWeight: '800',
  },

  statusActiveText: {
    color: '#16A34A',
  },

  statusInactiveText: {
    color: '#64748B',
  },

  editActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    cursor: 'pointer',
  },

  editActionText: {
    color: '#1D4ED8',
    fontSize: 12,
    fontWeight: '700',
  },

  deleteActionBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    cursor: 'pointer',
  },

  deleteActionText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },

  emptyState: {
    paddingVertical: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },

  /* Modal Styles */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    width: '100%',
    maxWidth: 680,
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 16,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
  },

  modalSubTitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },

  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  closeBtnText: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '700',
  },

  formGrid: {
    gap: 14,
  },

  formGroup: {
    gap: 6,
  },

  formRow: {
    flexDirection: 'row',
    gap: 12,
  },

  formLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
  },

  formInput: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },

  uploadBtn: {
    backgroundColor: '#0B5CAD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    cursor: 'pointer',
  },

  uploadBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  presetRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },

  presetBtn: {
    alignItems: 'center',
    padding: 6,
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    width: 80,
  },

  activePresetBtn: {
    borderColor: '#0B5CAD',
    backgroundColor: '#EFF6FF',
  },

  presetThumb: {
    width: 44,
    height: 58,
    borderRadius: 6,
  },

  presetLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
    marginTop: 4,
  },

  statusBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  statusBtnActive: {
    backgroundColor: '#0B5CAD',
    borderColor: '#0B5CAD',
  },

  statusBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },

  statusBtnTextActive: {
    color: '#FFFFFF',
  },

  modalFooter: {
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
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },

  cancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },

  saveBtn: {
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#0B5CAD',
  },

  saveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  zoomBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  zoomCloseBtn: {
    position: 'absolute',
    top: 24,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
