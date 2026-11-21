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
import { useData, resolveAsset } from '../context/DataContext';
import { pickImageFromDevice } from '../utils/imageUpload';

const GALLERY_PRESETS = [
  { key: 'gallery1.jpg', label: 'Hunza Valley' },
  { key: 'gallery2.jpg', label: 'Mountain Ridge' },
  { key: 'gallery3.jpg', label: 'Turquoise Lake' },
  { key: 'gallery4.jpg', label: 'Night Camping' },
  { key: 'gallery5.jpg', label: 'Glacier Trek' },
  { key: 'gallery6.jpg', label: 'Forest Trail' },
  { key: 'hiking.jpg', label: 'High Hike' },
  { key: 'camping.jpg', label: 'Wilderness Camp' },
  { key: 'fairy.jpg', label: 'Fairy Meadows' },
  { key: 'hub2.jpg', label: 'Scenic Camp' },
  { key: 'hub3.jpg', label: 'Crystal Basin' },
  { key: 'nature.jpg', label: 'Nature Track' },
  { key: 'galleryHero.jpg', label: 'Expedition Summit' },
];

export default function GalleryManagementScreen() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem } = useData() as any;

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [modalVisible, setModalVisible] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'MOUNTAINS',
    imageKey: 'gallery1.jpg',
    height: 260,
    uploadedFileName: '',
    uploadedFileSize: '',
  });

  const categories = ['ALL', 'MOUNTAINS', 'LAKES', 'CAMPING', 'TREKKING', 'NATURE TRAILS'];

  const handleUploadFromDevice = async () => {
    try {
      const res = await pickImageFromDevice();
      if (res && res.dataUrl) {
        setFormData((prev) => ({
          ...prev,
          imageKey: res.dataUrl,
          uploadedFileName: res.fileName,
          uploadedFileSize: res.fileSize,
        }));
      }
    } catch (e) {
      console.warn('Error picking file from device:', e);
    }
  };

  const handleOpenAdd = () => {
    setEditingItemId(null);
    setFormData({
      title: '',
      category: selectedCategory === 'ALL' ? 'MOUNTAINS' : selectedCategory,
      imageKey: 'gallery1.jpg',
      height: 260,
      uploadedFileName: '',
      uploadedFileSize: '',
    });
    setModalVisible(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItemId(item.id);
    setFormData({
      title: item.title || '',
      category: item.category || 'MOUNTAINS',
      imageKey: item.imageKey || 'gallery1.jpg',
      height: item.height || 260,
      uploadedFileName: '',
      uploadedFileSize: '',
    });
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      alert('Please enter a photo title or caption');
      return;
    }

    if (editingItemId) {
      updateGalleryItem(editingItemId, formData);
    } else {
      addGalleryItem(formData);
    }
    setModalVisible(false);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from the gallery?`)) {
      deleteGalleryItem(id);
    }
  };

  const filteredGallery =
    selectedCategory.toUpperCase() === 'ALL'
      ? (gallery || [])
      : (gallery || []).filter((item: any) =>
          String(item.category || '').trim().toUpperCase() === selectedCategory.trim().toUpperCase()
        );

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar activeScreen="Gallery" />
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
              <Text style={styles.title}>Visual Media & Gallery Manager</Text>
              <Text style={styles.subtitle}>
                Upload, edit, categorize, and curate high-resolution expedition imagery shown across the public website gallery.
              </Text>
            </View>

            <TouchableOpacity style={styles.addBtn} onPress={handleOpenAdd}>
              <Text style={styles.addBtnText}>+ ADD NEW PHOTO</Text>
            </TouchableOpacity>
          </View>

          {/* Category Filter Pills */}
          <View style={styles.categoryRow}>
            {categories.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryPill,
                  selectedCategory === cat && styles.activeCategoryPill,
                ]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text
                  style={[
                    styles.categoryPillText,
                    selectedCategory === cat && styles.activeCategoryPillText,
                  ]}
                >
                  {cat}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Gallery Media Grid */}
          <View style={styles.grid}>
            {filteredGallery.map((item: any) => (
              <View style={styles.card} key={item.id}>
                <Image
                  source={resolveAsset(item.imageKey, 'gallery1.jpg')}
                  style={styles.cardImage}
                  resizeMode="cover"
                />

                <View style={styles.cardInfo}>
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{item.category}</Text>
                  </View>
                  <Text style={styles.cardTitle}>{item.title}</Text>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.cardEditBtn}
                      onPress={() => handleOpenEdit(item)}
                    >
                      <Text style={styles.cardEditText}>✏️ Edit Photo</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.cardDeleteBtn}
                      onPress={() => handleDelete(item.id, item.title)}
                    >
                      <Text style={styles.cardDeleteText}>🗑️ Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
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
                  {editingItemId ? 'Edit Gallery Photo Details' : 'Add Photo to Gallery'}
                </Text>
                <Text style={styles.modalSubTitle}>
                  Select picture from existing presets or provide a custom web URL.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 480 }} showsVerticalScrollIndicator={false}>
              <View style={styles.formGrid}>
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>PHOTO TITLE / CAPTION *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Hunza Valley Sunrise, Glacier Ridge Trek"
                    placeholderTextColor="#94A3B8"
                    value={formData.title}
                    onChangeText={(t) => setFormData({ ...formData, title: t })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>CATEGORY</Text>
                  <View style={styles.optionPillRow}>
                    {categories
                      .filter((c) => c !== 'ALL')
                      .map((cat) => (
                        <TouchableOpacity
                          key={cat}
                          style={[
                            styles.optionPill,
                            formData.category === cat && styles.activeOptionPill,
                          ]}
                          onPress={() => setFormData({ ...formData, category: cat })}
                        >
                          <Text
                            style={[
                              styles.optionPillText,
                              formData.category === cat && styles.activeOptionPillText,
                            ]}
                          >
                            {cat}
                          </Text>
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>

                {/* Upload Image From Device Option */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>UPLOAD IMAGE → FROM YOUR DEVICE</Text>

                  {formData.imageKey && formData.imageKey.startsWith('data:') ? (
                    <View style={styles.devicePreviewCard}>
                      <Image
                        source={resolveAsset(formData.imageKey)}
                        style={styles.devicePreviewThumb}
                      />
                      <View style={{ flex: 1 }}>
                        <View style={styles.deviceSuccessChip}>
                          <Text style={styles.deviceSuccessChipText}>✓ Ready from Device</Text>
                        </View>
                        <Text style={styles.devicePreviewName} numberOfLines={1}>
                          {formData.uploadedFileName || 'Image from your device'}
                        </Text>
                        <Text style={styles.devicePreviewSize}>
                          {formData.uploadedFileSize || 'Compressed for web'}
                        </Text>
                        <TouchableOpacity
                          style={styles.deviceChangeBtn}
                          onPress={handleUploadFromDevice}
                        >
                          <Text style={styles.deviceChangeBtnText}>Change Device Image</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.deviceUploadCard}
                      onPress={handleUploadFromDevice}
                      activeOpacity={0.8}
                    >
                      <View style={styles.deviceIconCircle}>
                        <Text style={{ fontSize: 24 }}>📁</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.deviceCardTitle}>Upload Image → From Your Device</Text>
                        <Text style={styles.deviceCardSub}>
                          Select any JPG, PNG, or WebP photo directly from your computer or phone
                        </Text>
                      </View>
                      <View style={styles.deviceBrowseBtn}>
                        <Text style={styles.deviceBrowseBtnText}>Browse Files</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Preset image selector */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>OR CHOOSE FROM PRESETS</Text>
                  <View style={styles.presetGrid}>
                    {GALLERY_PRESETS.map((preset) => (
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

                  <Text style={[styles.formLabel, { marginTop: 8 }]}>CUSTOM ASSET KEY OR WEB URL</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="gallery1.jpg or https://images.unsplash.com/..."
                    placeholderTextColor="#94A3B8"
                    value={formData.imageKey}
                    onChangeText={(t) => setFormData({ ...formData, imageKey: t })}
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>
                  {editingItemId ? 'Save & Update Photo' : 'Add to Public Gallery'}
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

  categoryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
    flexWrap: 'wrap',
  },

  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  activeCategoryPill: {
    backgroundColor: '#0B5CAD',
    borderColor: '#0B5CAD',
  },

  categoryPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },

  activeCategoryPillText: {
    color: '#FFFFFF',
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },

  card: {
    width: 255,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
  },

  cardImage: {
    width: '100%',
    height: 170,
  },

  cardInfo: {
    padding: 14,
  },

  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 6,
  },

  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0B5CAD',
    letterSpacing: 0.6,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 14,
  },

  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },

  cardEditBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  cardEditText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0B5CAD',
  },

  cardDeleteBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },

  cardDeleteText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
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
    maxWidth: 620,
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
    paddingRight: 4,
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

  /* Device Upload Card Styles */
  deviceUploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 2,
    borderColor: '#BFDBFE',
    borderStyle: 'dashed',
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#F8FAFC',
    cursor: 'pointer',
  },

  deviceIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deviceCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0B5CAD',
  },

  deviceCardSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  deviceBrowseBtn: {
    backgroundColor: '#0B5CAD',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },

  deviceBrowseBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  devicePreviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    padding: 12,
  },

  devicePreviewThumb: {
    width: 72,
    height: 72,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
  },

  deviceSuccessChip: {
    alignSelf: 'flex-start',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },

  deviceSuccessChipText: {
    color: '#16A34A',
    fontSize: 11,
    fontWeight: '700',
  },

  devicePreviewName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },

  devicePreviewSize: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  deviceChangeBtn: {
    marginTop: 4,
    alignSelf: 'flex-start',
  },

  deviceChangeBtnText: {
    fontSize: 11,
    color: '#0B5CAD',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
});