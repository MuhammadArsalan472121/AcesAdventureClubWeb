import React, { useState, useEffect } from 'react';
import {
  Image,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { useData, resolveAsset } from '../context/DataContext';

const PRESET_GUIDE_IMAGES = [
  { key: 'guide1.jpg', label: 'Guide 1 (Marcus)' },
  { key: 'guide2.jpg', label: 'Guide 2 (Elena)' },
  { key: 'guide3.jpg', label: 'Guide 3 (Julian)' },
  { key: 'guide4.jpg', label: 'Guide 4 (Sofia)' },
];

export default function ConsoleSettingsScreen() {
  const {
    homeContent,
    aboutContent,
    contactContent,
    socialLinks,
    onboardingContent,
    inquiries,
    trips = [],
    tripCategories = [],
    tripBadges = [],
    addTripCategory,
    deleteTripCategory,
    addTripBadge,
    deleteTripBadge,
    updateHomeContent,
    updateAboutContent,
    addGuide,
    updateGuide,
    deleteGuide,
    updateContactContent,
    updateSocialLinks,
    updateOnboardingContent,
    updateInquiryStatus,
    deleteInquiry,
    resetToDefaults,
  } = useData() as any;

  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'guides' | 'contact' | 'social' | 'tripPresets' | 'onboarding' | 'inquiries' | 'system'>('home');

  const [adminCatInput, setAdminCatInput] = useState('');
  const [adminBadgeInput, setAdminBadgeInput] = useState('');

  // Guide Management State
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [editingGuideId, setEditingGuideId] = useState<string | null>(null);
  const [guideForm, setGuideForm] = useState({
    name: '',
    category: '',
    imageKey: 'guide1.jpg',
  });

  // Forms
  const [homeForm, setHomeForm] = useState(homeContent);
  const [aboutForm, setAboutForm] = useState(aboutContent);
  const [contactForm, setContactForm] = useState(contactContent);
  const [onboardingForm, setOnboardingForm] = useState(onboardingContent);
  const [socialForm, setSocialForm] = useState({
    instagram: socialLinks?.instagram || contactContent?.instagram || 'https://www.instagram.com/aces_adventure_club/',
    youtube: socialLinks?.youtube || contactContent?.youtube || 'https://www.youtube.com/@AcesAdventureClub-007',
    facebook: socialLinks?.facebook || contactContent?.facebook || 'https://www.facebook.com/acesadventureclub',
    whatsapp: socialLinks?.whatsapp || contactContent?.whatsapp || '+923121578099',
  });

  useEffect(() => {
    if (contactContent) {
      setContactForm((prev: any) => ({
        ...prev,
        ...contactContent,
      }));
    }
  }, [contactContent]);

  useEffect(() => {
    if (socialLinks || contactContent) {
      setSocialForm({
        instagram: socialLinks?.instagram || contactContent?.instagram || 'https://www.instagram.com/aces_adventure_club/',
        youtube: socialLinks?.youtube || contactContent?.youtube || 'https://www.youtube.com/@AcesAdventureClub-007',
        facebook: socialLinks?.facebook || contactContent?.facebook || 'https://www.facebook.com/acesadventureclub',
        whatsapp: socialLinks?.whatsapp || contactContent?.whatsapp || '+923121578099',
      });
    }
  }, [socialLinks, contactContent]);

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

  const [saveMessage, setSaveMessage] = useState('');

  const showSavedNotification = (text = 'Changes published successfully!') => {
    setSaveMessage(text);
    setTimeout(() => setSaveMessage(''), 3500);
  };

  const handleSaveHome = () => {
    updateHomeContent(homeForm);
    showSavedNotification('Home screen CMS content updated live!');
  };

  const handleSaveAbout = () => {
    updateAboutContent(aboutForm);
    showSavedNotification('About screen CMS content updated live!');
  };

  const openAddGuideModal = () => {
    setEditingGuideId(null);
    setGuideForm({
      name: '',
      category: '',
      imageKey: 'guide1.jpg',
    });
    setIsGuideModalOpen(true);
  };

  const openEditGuideModal = (guide: any) => {
    setEditingGuideId(guide.id);
    setGuideForm({
      name: guide.name || '',
      category: guide.category || '',
      imageKey: guide.imageKey || guide.image || 'guide1.jpg',
    });
    setIsGuideModalOpen(true);
  };

  const handleSaveGuide = () => {
    if (!guideForm.name.trim()) {
      alert('Please enter guide full name.');
      return;
    }
    if (!guideForm.category.trim()) {
      alert('Please enter guide category / designation.');
      return;
    }

    if (editingGuideId) {
      updateGuide(editingGuideId, guideForm);
      showSavedNotification(`Guide "${guideForm.name.toUpperCase()}" updated successfully!`);
    } else {
      addGuide(guideForm);
      showSavedNotification(`New guide "${guideForm.name.toUpperCase()}" added to About Us page!`);
    }

    setIsGuideModalOpen(false);
  };

  const handleDeleteGuide = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete guide "${name}" from the About Us page?`)) {
      deleteGuide(id);
      showSavedNotification(`Guide "${name}" removed!`);
    }
  };

  const handleSaveContact = () => {
    updateContactContent({
      ...contactForm,
      ...socialForm,
    });
    showSavedNotification('Official Contact channels & Social Details saved and published live!');
  };

  const handleSaveSocial = () => {
    if (updateSocialLinks) {
      updateSocialLinks(socialForm);
    }
    showSavedNotification('Website social media handles updated live across all pages!');
  };

  const handleSaveOnboarding = (slideKey: 'slide1' | 'slide2' | 'slide3') => {
    updateOnboardingContent(slideKey, onboardingForm[slideKey]);
    showSavedNotification(`Onboarding ${slideKey.toUpperCase()} updated live!`);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all website content, trips, and gallery to initial defaults?')) {
      resetToDefaults();
      showSavedNotification('All data reset to initial defaults!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <Sidebar activeScreen="Settings" />
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
              <Text style={styles.title}>CMS & Console Control Center</Text>
              <Text style={styles.subtitle}>
                Edit and control all text, headlines, stats, contact channels, and customer booking inquiries.
              </Text>
            </View>

            {saveMessage ? (
              <View style={styles.successToast}>
                <Text style={styles.successToastText}>✓ {saveMessage}</Text>
              </View>
            ) : null}
          </View>

          {/* Navigation Tabs */}
          <View style={styles.tabsRow}>
            {[
              { key: 'home', label: '🏠 Home Page CMS' },
              { key: 'about', label: '📖 About Page CMS' },
              { key: 'guides', label: '🧗 Tour Guides (About)' },
              { key: 'contact', label: '📞 Contact Info' },
              { key: 'social', label: '🌐 Social Handles' },
              { key: 'tripPresets', label: '🏷️ Categories & Badges' },
              { key: 'inquiries', label: `📥 Inquiries Inbox (${inquiries.filter((i: any) => i.status === 'NEW').length} New)` },
              { key: 'onboarding', label: '📱 Onboarding Slides' },
              { key: 'system', label: '⚙️ System & Reset' },
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabButton, activeTab === tab.key && styles.activeTabButton]}
                onPress={() => setActiveTab(tab.key as any)}
              >
                <Text style={[styles.tabButtonText, activeTab === tab.key && styles.activeTabButtonText]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* TAB 1: HOME PAGE CMS */}
          {activeTab === 'home' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>Home Screen Hero & Intro Editor</Text>

              <View style={styles.fieldGrid}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>HERO BADGE TEXT</Text>
                  <TextInput
                    style={styles.input}
                    value={homeForm.heroBadge}
                    onChangeText={(t) => setHomeForm({ ...homeForm, heroBadge: t })}
                  />
                </View>

                <View style={styles.rowTwo}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.label}>HERO TITLE LINE 1</Text>
                    <TextInput
                      style={styles.input}
                      value={homeForm.heroHeadingWhite}
                      onChangeText={(t) => setHomeForm({ ...homeForm, heroHeadingWhite: t })}
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>HERO TITLE LINE 2 (BLUE ACCENT)</Text>
                    <TextInput
                      style={styles.input}
                      value={homeForm.heroHeadingBlue}
                      onChangeText={(t) => setHomeForm({ ...homeForm, heroHeadingBlue: t })}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>HERO SUBTITLE PARAGRAPH</Text>
                  <TextInput
                    style={[styles.input, { height: 75 }]}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={homeForm.heroParagraph}
                    onChangeText={(t) => setHomeForm({ ...homeForm, heroParagraph: t })}
                  />
                </View>

                <View style={styles.divider} />

                <Text style={styles.subSectionTitle}>Statistics Displayed On Homepage</Text>
                <View style={styles.rowTwo}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.label}>TRIPS COMPLETED</Text>
                    <TextInput
                      style={styles.input}
                      value={homeForm.statTrips}
                      onChangeText={(t) => setHomeForm({ ...homeForm, statTrips: t })}
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>ELITE EXPLORERS</Text>
                    <TextInput
                      style={styles.input}
                      value={homeForm.statExplorers}
                      onChangeText={(t) => setHomeForm({ ...homeForm, statExplorers: t })}
                    />
                  </View>
                </View>

                <View style={styles.rowTwo}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.label}>GLOBAL DESTINATIONS</Text>
                    <TextInput
                      style={styles.input}
                      value={homeForm.statDestinations}
                      onChangeText={(t) => setHomeForm({ ...homeForm, statDestinations: t })}
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>EXPERT GUIDES</Text>
                    <TextInput
                      style={styles.input}
                      value={homeForm.statGuides}
                      onChangeText={(t) => setHomeForm({ ...homeForm, statGuides: t })}
                    />
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.subSectionTitle}>"Who We Are" Section Copy</Text>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>ABOUT PARAGRAPH 1</Text>
                  <TextInput
                    style={[styles.input, { height: 75 }]}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={homeForm.aboutP1}
                    onChangeText={(t) => setHomeForm({ ...homeForm, aboutP1: t })}
                  />
                </View>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>ABOUT PARAGRAPH 2</Text>
                  <TextInput
                    style={[styles.input, { height: 75 }]}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={homeForm.aboutP2}
                    onChangeText={(t) => setHomeForm({ ...homeForm, aboutP2: t })}
                  />
                </View>

                <TouchableOpacity style={styles.saveSubmitBtn} onPress={handleSaveHome}>
                  <Text style={styles.saveSubmitBtnText}>Publish Home Page Updates</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* TAB 2: ABOUT PAGE CMS */}
          {activeTab === 'about' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>About Page Mission & Values Editor</Text>

              <View style={styles.fieldGrid}>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>HERO BADGE</Text>
                  <TextInput
                    style={styles.input}
                    value={aboutForm.heroBadge}
                    onChangeText={(t) => setAboutForm({ ...aboutForm, heroBadge: t })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>HERO DESCRIPTION</Text>
                  <TextInput
                    style={[styles.input, { height: 75 }]}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={aboutForm.heroDescription}
                    onChangeText={(t) => setAboutForm({ ...aboutForm, heroDescription: t })}
                  />
                </View>

                <View style={styles.divider} />

                <Text style={styles.subSectionTitle}>Our Mission Statement</Text>
                <View style={styles.formGroup}>
                  <Text style={styles.label}>MISSION PARAGRAPH 1</Text>
                  <TextInput
                    style={[styles.input, { height: 75 }]}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={aboutForm.missionP1}
                    onChangeText={(t) => setAboutForm({ ...aboutForm, missionP1: t })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>MISSION PARAGRAPH 2</Text>
                  <TextInput
                    style={[styles.input, { height: 75 }]}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    value={aboutForm.missionP2}
                    onChangeText={(t) => setAboutForm({ ...aboutForm, missionP2: t })}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.label}>FEATURED BRAND QUOTE</Text>
                  <TextInput
                    style={styles.input}
                    value={aboutForm.quote}
                    onChangeText={(t) => setAboutForm({ ...aboutForm, quote: t })}
                  />
                </View>

                <TouchableOpacity style={styles.saveSubmitBtn} onPress={handleSaveAbout}>
                  <Text style={styles.saveSubmitBtnText}>Publish About Page Updates</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* TOUR GUIDES & LEADERS SECTION (Visible in both 'about' and 'guides' tab) */}
          {(activeTab === 'about' || activeTab === 'guides') && (
            <View style={styles.sectionCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
                <View style={{ flex: 1, minWidth: 260 }}>
                  <Text style={styles.sectionHeaderTitle}>Meet Our Guides & Team Leaders (About Us Page)</Text>
                  <Text style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
                    Manage the mountain guides displayed in the "MEET OUR GUIDES" section on the About Us page. Change names, roles, and photos.
                  </Text>
                </View>

                <TouchableOpacity style={styles.addGuidePrimaryBtn} onPress={openAddGuideModal}>
                  <Text style={styles.addGuidePrimaryBtnText}>➕ Add New Guide</Text>
                </TouchableOpacity>
              </View>

              {/* Guide Section Header Texts */}
              <View style={styles.guideHeaderBox}>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A', marginBottom: 12 }}>
                  📝 Section Title & Subheading on About Page
                </Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 14 }}>
                  <View style={{ flex: 1, minWidth: 200 }}>
                    <Text style={styles.label}>SECTION TITLE</Text>
                    <TextInput
                      style={styles.input}
                      value={aboutForm.guidesTitle || 'MEET OUR GUIDES'}
                      onChangeText={(t) => setAboutForm({ ...aboutForm, guidesTitle: t })}
                      placeholder="e.g. MEET OUR GUIDES"
                    />
                  </View>
                  <View style={{ flex: 2, minWidth: 280 }}>
                    <Text style={styles.label}>SECTION SUBHEADING / DESCRIPTION</Text>
                    <TextInput
                      style={styles.input}
                      value={aboutForm.guidesDescription || 'Each guide is a master of the mountains, highly skilled in rescue, navigation, and passion for sharing the wild.'}
                      onChangeText={(t) => setAboutForm({ ...aboutForm, guidesDescription: t })}
                      placeholder="Subheading..."
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.saveSubmitBtn, { alignSelf: 'flex-start', marginTop: 12, paddingHorizontal: 18, paddingVertical: 8 }]}
                  onPress={() => {
                    updateAboutContent({
                      guidesTitle: aboutForm.guidesTitle || 'MEET OUR GUIDES',
                      guidesDescription: aboutForm.guidesDescription || 'Each guide is a master of the mountains, highly skilled in rescue, navigation, and passion for sharing the wild.',
                    });
                    showSavedNotification('Guide section headings updated live!');
                  }}
                >
                  <Text style={[styles.saveSubmitBtnText, { fontSize: 12 }]}>Save Headings</Text>
                </TouchableOpacity>
              </View>

              {/* Guides Cards List */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                <Text style={{ fontSize: 14, fontWeight: '800', color: '#0F172A' }}>
                  Current Team Guides ({(aboutContent?.guides || []).length})
                </Text>
                <Text style={{ fontSize: 12, color: '#64748B' }}>
                  Click Edit to update name, role, or picture
                </Text>
              </View>

              {!(aboutContent?.guides?.length) ? (
                <View style={{ padding: 40, alignItems: 'center', backgroundColor: '#F8FAFC', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' }}>
                  <Text style={{ fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 4 }}>No Guides Configured</Text>
                  <Text style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>Click "Add New Guide" to add leaders to your About page.</Text>
                  <TouchableOpacity style={styles.addGuidePrimaryBtn} onPress={openAddGuideModal}>
                    <Text style={styles.addGuidePrimaryBtnText}>➕ Add First Guide</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.guideCardsGrid}>
                  {(aboutContent.guides || []).map((guide: any) => (
                    <View style={styles.guideAdminCard} key={guide.id}>
                      <Image
                        source={resolveAsset(guide.imageKey || guide.image, 'guide1.jpg')}
                        style={styles.guideAdminThumb}
                        resizeMode="cover"
                      />

                      <View style={{ flex: 1, marginLeft: 14 }}>
                        <Text style={styles.guideAdminName}>{guide.name}</Text>
                        <View style={styles.guideAdminBadge}>
                          <Text style={styles.guideAdminBadgeText}>{guide.category || 'MOUNTAIN GUIDE'}</Text>
                        </View>
                        <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                          ID: {guide.id}
                        </Text>
                      </View>

                      <View style={styles.guideAdminActions}>
                        <TouchableOpacity
                          style={styles.guideEditBtn}
                          onPress={() => openEditGuideModal(guide)}
                        >
                          <Text style={styles.guideEditBtnText}>✏️ Edit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.guideDeleteBtn}
                          onPress={() => handleDeleteGuide(guide.id, guide.name)}
                        >
                          <Text style={styles.guideDeleteBtnText}>🗑️ Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* TAB 3: CONTACT INFO */}
          {activeTab === 'contact' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>Official Contact Channels</Text>

              <View style={styles.fieldGrid}>
                <View style={styles.rowTwo}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.label}>PRIMARY PHONE</Text>
                    <TextInput
                      style={styles.input}
                      value={contactForm.phone}
                      onChangeText={(t) => setContactForm({ ...contactForm, phone: t })}
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>PHONE AVAILABILITY HOURS</Text>
                    <TextInput
                      style={styles.input}
                      value={contactForm.phoneHours}
                      onChangeText={(t) => setContactForm({ ...contactForm, phoneHours: t })}
                    />
                  </View>
                </View>

                <View style={styles.rowTwo}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <Text style={styles.label}>INQUIRY EMAIL ADDRESS</Text>
                    <TextInput
                      style={styles.input}
                      value={contactForm.email}
                      onChangeText={(t) => setContactForm({ ...contactForm, email: t })}
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.label}>OFFICE LOCATION</Text>
                    <TextInput
                      style={styles.input}
                      value={contactForm.location}
                      onChangeText={(t) => setContactForm({ ...contactForm, location: t })}
                    />
                  </View>
                </View>

                <View style={styles.divider} />

                <Text style={styles.subSectionTitle}>Official Social Media Channels (Footer Icons)</Text>
                <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>
                  Links assigned here control where users are directed when clicking social icons in the footer across all website pages.
                </Text>

                <View style={styles.rowTwo}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.label}>📸 INSTAGRAM HANDLE / URL</Text>
                      <TouchableOpacity onPress={() => testExternalUrl(socialForm.instagram)}>
                        <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '700' }}>🔗 Test</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.input}
                      value={socialForm.instagram}
                      onChangeText={(t) => setSocialForm({ ...socialForm, instagram: t })}
                      placeholder="https://www.instagram.com/aces_adventure_club/"
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.label}>▶️ YOUTUBE CHANNEL / URL</Text>
                      <TouchableOpacity onPress={() => testExternalUrl(socialForm.youtube)}>
                        <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '700' }}>🔗 Test</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.input}
                      value={socialForm.youtube}
                      onChangeText={(t) => setSocialForm({ ...socialForm, youtube: t })}
                      placeholder="https://www.youtube.com/@AcesAdventureClub-007"
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.rowTwo}>
                  <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.label}>📘 FACEBOOK PAGE / URL</Text>
                      <TouchableOpacity onPress={() => testExternalUrl(socialForm.facebook)}>
                        <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '700' }}>🔗 Test</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.input}
                      value={socialForm.facebook}
                      onChangeText={(t) => setSocialForm({ ...socialForm, facebook: t })}
                      placeholder="https://www.facebook.com/acesadventureclub"
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="none"
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.label}>💬 WHATSAPP NUMBER OR URL</Text>
                      <TouchableOpacity onPress={() => testExternalUrl(socialForm.whatsapp)}>
                        <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '700' }}>🔗 Test</Text>
                      </TouchableOpacity>
                    </View>
                    <TextInput
                      style={styles.input}
                      value={socialForm.whatsapp}
                      onChangeText={(t) => setSocialForm({ ...socialForm, whatsapp: t })}
                      placeholder="+92 312 1578099 or https://wa.me/923121578099"
                      placeholderTextColor="#94A3B8"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <TouchableOpacity style={styles.saveSubmitBtn} onPress={handleSaveContact}>
                  <Text style={styles.saveSubmitBtnText}>Save & Publish Contact & Social Details</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* TAB: SOCIAL MEDIA HANDLES CMS */}
          {activeTab === 'social' && (
            <View style={styles.sectionCard}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <View>
                  <Text style={styles.sectionHeaderTitle}>🌐 Social Media Handles & Footer Links Manager</Text>
                  <Text style={{ fontSize: 13, color: '#64748B', maxWidth: 640 }}>
                    Configure official social media links. These links are dynamically wired to the Instagram, YouTube, Facebook, and WhatsApp icons placed throughout the website footer and contact modules.
                  </Text>
                </View>

                {/* Live Preview Pill */}
                <View style={{ backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' }}>
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#64748B', marginBottom: 6 }}>FOOTER ICONS PREVIEW</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(socialForm.facebook)}
                      style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#0B5CAD', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Ionicons name="logo-facebook" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(socialForm.instagram)}
                      style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#E1306C', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Ionicons name="logo-instagram" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(socialForm.youtube)}
                      style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#FF0000', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Ionicons name="logo-youtube" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(socialForm.whatsapp)}
                      style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#25D366', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Ionicons name="logo-whatsapp" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={styles.fieldGrid}>
                {/* Instagram Field */}
                <View style={styles.formGroup}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={styles.label}>📸 INSTAGRAM PROFILE URL / HANDLE</Text>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(socialForm.instagram)}
                      style={{ backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}
                    >
                      <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '700' }}>🔗 Test Link</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={socialForm.instagram}
                    onChangeText={(t) => setSocialForm({ ...socialForm, instagram: t })}
                    placeholder="https://www.instagram.com/aces_adventure_club/"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                  <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Default: https://www.instagram.com/aces_adventure_club/</Text>
                </View>

                {/* YouTube Field */}
                <View style={styles.formGroup}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={styles.label}>▶️ YOUTUBE CHANNEL URL / HANDLE</Text>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(socialForm.youtube)}
                      style={{ backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}
                    >
                      <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '700' }}>🔗 Test Link</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={socialForm.youtube}
                    onChangeText={(t) => setSocialForm({ ...socialForm, youtube: t })}
                    placeholder="https://www.youtube.com/@AcesAdventureClub-007"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                  <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Default: https://www.youtube.com/@AcesAdventureClub-007</Text>
                </View>

                {/* Facebook Field */}
                <View style={styles.formGroup}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={styles.label}>📘 FACEBOOK PAGE URL</Text>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(socialForm.facebook)}
                      style={{ backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}
                    >
                      <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '700' }}>🔗 Test Link</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={socialForm.facebook}
                    onChangeText={(t) => setSocialForm({ ...socialForm, facebook: t })}
                    placeholder="https://www.facebook.com/acesadventureclub"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                  <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Default: https://www.facebook.com/acesadventureclub</Text>
                </View>

                {/* WhatsApp Field */}
                <View style={styles.formGroup}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <Text style={styles.label}>💬 WHATSAPP BUSINESS NUMBER OR CHAT URL</Text>
                    <TouchableOpacity
                      onPress={() => testExternalUrl(socialForm.whatsapp)}
                      style={{ backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 }}
                    >
                      <Text style={{ fontSize: 11, color: '#0B5CAD', fontWeight: '700' }}>🔗 Test Link</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.input}
                    value={socialForm.whatsapp}
                    onChangeText={(t) => setSocialForm({ ...socialForm, whatsapp: t })}
                    placeholder="+92 312 1578099 or https://wa.me/923121578099"
                    placeholderTextColor="#94A3B8"
                    autoCapitalize="none"
                  />
                  <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>Default: +92 312 1578099 (opens WhatsApp chat)</Text>
                </View>

                <TouchableOpacity style={styles.saveSubmitBtn} onPress={handleSaveSocial}>
                  <Text style={styles.saveSubmitBtnText}>Save & Publish Social Media Links</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* TAB: TRIP CATEGORIES & BADGES CMS */}
          {activeTab === 'tripPresets' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>Expedition Categories & Badge Tags Manager</Text>
              <Text style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
                Control which preset options appear in the Create/Edit Expedition dropdowns. Options added here are automatically available when publishing new trips.
              </Text>

              <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap' }}>
                {/* Categories Management Box */}
                <View style={{ flex: 1, minWidth: 320, backgroundColor: '#F8FAFC', borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 4 }}>
                    📂 Categories ({(tripCategories || []).length})
                  </Text>
                  <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 14 }}>
                    Dropdown categories used to group expeditions and enable website filtering.
                  </Text>

                  {/* Add Input */}
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                    <TextInput
                      style={[styles.input, { flex: 1, backgroundColor: '#FFFFFF' }]}
                      placeholder="e.g. Mountaineering, Road Trip..."
                      placeholderTextColor="#94A3B8"
                      value={adminCatInput}
                      onChangeText={setAdminCatInput}
                      onSubmitEditing={() => {
                        if (adminCatInput.trim()) {
                          addTripCategory(adminCatInput.trim());
                          showSavedNotification(`Category "${adminCatInput.trim()}" added successfully!`);
                          setAdminCatInput('');
                        }
                      }}
                    />
                    <TouchableOpacity
                      style={{ backgroundColor: '#0B5CAD', paddingHorizontal: 16, borderRadius: 8, justifyContent: 'center' }}
                      onPress={() => {
                        if (adminCatInput.trim()) {
                          addTripCategory(adminCatInput.trim());
                          showSavedNotification(`Category "${adminCatInput.trim()}" added successfully!`);
                          setAdminCatInput('');
                        }
                      }}
                    >
                      <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 13 }}>+ Add</Text>
                    </TouchableOpacity>
                  </View>

                  {/* List */}
                  <View style={{ gap: 8 }}>
                    {(tripCategories || []).map((cat: string) => {
                      const count = (trips || []).filter((t: any) => t.category?.toLowerCase() === cat.toLowerCase()).length;
                      return (
                        <View
                          key={cat}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#FFFFFF',
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#E2E8F0',
                          }}
                        >
                          <View>
                            <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>{cat}</Text>
                            <Text style={{ fontSize: 11, color: '#94A3B8' }}>{count} live expedition{count !== 1 ? 's' : ''}</Text>
                          </View>
                          <TouchableOpacity
                            style={{ backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}
                            onPress={() => {
                              deleteTripCategory(cat);
                              showSavedNotification(`Category "${cat}" removed from options!`);
                            }}
                          >
                            <Text style={{ fontSize: 11, color: '#DC2626', fontWeight: '700' }}>✕ Delete</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </View>

                {/* Badges Management Box */}
                <View style={{ flex: 1, minWidth: 320, backgroundColor: '#F8FAFC', borderRadius: 14, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#0F172A', marginBottom: 4 }}>
                    🏷️ Badge Tags ({(tripBadges || []).length})
                  </Text>
                  <Text style={{ fontSize: 12, color: '#64748B', marginBottom: 14 }}>
                    Highlight cards with eye-catching labels (e.g. Featured, Popular, Elite).
                  </Text>

                  {/* Add Input */}
                  <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
                    <TextInput
                      style={[styles.input, { flex: 1, backgroundColor: '#FFFFFF' }]}
                      placeholder="e.g. Special Offer, Trending..."
                      placeholderTextColor="#94A3B8"
                      value={adminBadgeInput}
                      onChangeText={setAdminBadgeInput}
                      onSubmitEditing={() => {
                        if (adminBadgeInput.trim()) {
                          addTripBadge(adminBadgeInput.trim());
                          showSavedNotification(`Badge "${adminBadgeInput.trim()}" added successfully!`);
                          setAdminBadgeInput('');
                        }
                      }}
                    />
                    <TouchableOpacity
                      style={{ backgroundColor: '#0B5CAD', paddingHorizontal: 16, borderRadius: 8, justifyContent: 'center' }}
                      onPress={() => {
                        if (adminBadgeInput.trim()) {
                          addTripBadge(adminBadgeInput.trim());
                          showSavedNotification(`Badge "${adminBadgeInput.trim()}" added successfully!`);
                          setAdminBadgeInput('');
                        }
                      }}
                    >
                      <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 13 }}>+ Add</Text>
                    </TouchableOpacity>
                  </View>

                  {/* List */}
                  <View style={{ gap: 8 }}>
                    {(tripBadges || []).map((bg: string) => {
                      const count = (trips || []).filter((t: any) => t.badge?.toLowerCase() === bg.toLowerCase()).length;
                      return (
                        <View
                          key={bg}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            backgroundColor: '#FFFFFF',
                            padding: 10,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: '#E2E8F0',
                          }}
                        >
                          <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                              <View style={{ backgroundColor: '#0B5CAD', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 }}>
                                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>{bg}</Text>
                              </View>
                            </View>
                            <Text style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{count} live expedition{count !== 1 ? 's' : ''}</Text>
                          </View>
                          <TouchableOpacity
                            style={{ backgroundColor: '#FEE2E2', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 }}
                            onPress={() => {
                              deleteTripBadge(bg);
                              showSavedNotification(`Badge "${bg}" removed from options!`);
                            }}
                          >
                            <Text style={{ fontSize: 11, color: '#DC2626', fontWeight: '700' }}>✕ Delete</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* TAB 4: INQUIRIES INBOX */}
          {activeTab === 'inquiries' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>Incoming Adventure & Booking Inquiries</Text>

              {inquiries.length === 0 ? (
                <View style={{ padding: 40, alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: '#64748B' }}>No customer inquiries received yet.</Text>
                </View>
              ) : (
                <View style={{ gap: 16 }}>
                  {inquiries.map((inq: any) => (
                    <View style={styles.inquiryCard} key={inq.id}>
                      <View style={styles.inquiryHeader}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.inquiryName}>{inq.name}</Text>
                          <Text style={styles.inquiryMeta}>
                            📧 {inq.email} | 📞 {inq.phone} {inq.city ? `| 🏙️ City: ${inq.city}` : ''} | 📅 Travel Date: {inq.travelDate}
                          </Text>
                          <Text style={styles.inquiryMeta}>
                            📍 Destination: <Text style={{ fontWeight: '800', color: '#0F172A' }}>{inq.destination}</Text> ({inq.adventureType} • {inq.travelers})
                          </Text>
                        </View>

                        <View style={{ alignItems: 'flex-end', gap: 6 }}>
                          <View style={[
                            styles.inqStatusBadge,
                            inq.status === 'NEW'
                              ? styles.inqStatusNew
                              : inq.status === 'CONTACTED'
                              ? styles.inqStatusContacted
                              : styles.inqStatusResolved,
                          ]}>
                            <Text style={styles.inqStatusText}>{inq.status}</Text>
                          </View>
                          <Text style={styles.inqDateText}>{inq.dateSubmitted}</Text>
                        </View>
                      </View>

                      <View style={styles.inquiryMessage}>
                        <Text style={styles.inquiryMessageText}>"{inq.message}"</Text>
                      </View>

                      <View style={styles.inquiryActions}>
                        <View style={{ flexDirection: 'row', gap: 8 }}>
                          {['NEW', 'CONTACTED', 'RESOLVED'].map((st) => (
                            <TouchableOpacity
                              key={st}
                              style={[styles.statusChangeBtn, inq.status === st && styles.activeStatusChangeBtn]}
                              onPress={() => updateInquiryStatus(inq.id, st)}
                            >
                              <Text style={[styles.statusChangeBtnText, inq.status === st && styles.activeStatusChangeBtnText]}>
                                Mark {st}
                              </Text>
                            </TouchableOpacity>
                          ))}
                        </View>

                        <TouchableOpacity
                          style={styles.deleteInqBtn}
                          onPress={() => {
                            if (confirm('Delete this inquiry?')) {
                              deleteInquiry(inq.id);
                            }
                          }}
                        >
                          <Text style={styles.deleteInqBtnText}>🗑️ Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* TAB 5: ONBOARDING SLIDES */}
          {activeTab === 'onboarding' && (
            <View style={{ gap: 24 }}>
              {(['slide1', 'slide2', 'slide3'] as const).map((key, index) => (
                <View style={styles.sectionCard} key={key}>
                  <Text style={styles.sectionHeaderTitle}>Onboarding Slide {index + 1}</Text>

                  <View style={styles.fieldGrid}>
                    <View style={styles.rowTwo}>
                      <View style={[styles.formGroup, { flex: 1, marginRight: 14 }]}>
                        <Text style={styles.label}>HEADING LINE 1</Text>
                        <TextInput
                          style={styles.input}
                          value={onboardingForm[key].headingWhite}
                          onChangeText={(t) =>
                            setOnboardingForm({
                              ...onboardingForm,
                              [key]: { ...onboardingForm[key], headingWhite: t },
                            })
                          }
                        />
                      </View>
                      <View style={[styles.formGroup, { flex: 1 }]}>
                        <Text style={styles.label}>HEADING LINE 2 (BLUE ACCENT)</Text>
                        <TextInput
                          style={styles.input}
                          value={onboardingForm[key].headingBlue}
                          onChangeText={(t) =>
                            setOnboardingForm({
                              ...onboardingForm,
                              [key]: { ...onboardingForm[key], headingBlue: t },
                            })
                          }
                        />
                      </View>
                    </View>

                    <View style={styles.formGroup}>
                      <Text style={styles.label}>DESCRIPTION PARAGRAPH</Text>
                      <TextInput
                        style={[styles.input, { height: 75 }]}
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                        value={onboardingForm[key].paragraph}
                        onChangeText={(t) =>
                          setOnboardingForm({
                            ...onboardingForm,
                            [key]: { ...onboardingForm[key], paragraph: t },
                          })
                        }
                      />
                    </View>

                    <TouchableOpacity
                      style={styles.saveSubmitBtn}
                      onPress={() => handleSaveOnboarding(key)}
                    >
                      <Text style={styles.saveSubmitBtnText}>Save Slide {index + 1}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* TAB 6: SYSTEM & RESET */}
          {activeTab === 'system' && (
            <View style={styles.sectionCard}>
              <Text style={styles.sectionHeaderTitle}>System Preferences & Data Controls</Text>

              <View style={styles.fieldGrid}>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Application Version</Text>
                  <Text style={styles.infoValue}>Aces Adventure Web 2.0 (React 19 / Expo 57)</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Data Synchronization</Text>
                  <Text style={styles.infoValue}>Real-Time LocalStorage + DataContext Provider</Text>
                </View>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Authentication Service</Text>
                  <Text style={styles.infoValue}>Firebase Auth 12.18.0 Connected</Text>
                </View>

                <View style={styles.divider} />

                <View style={{ marginTop: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: '#DC2626', marginBottom: 4 }}>
                    Danger Zone: Reset Demo Content
                  </Text>
                  <Text style={{ fontSize: 13, color: '#64748B', marginBottom: 16, lineHeight: 18 }}>
                    Restores all trips, sponsors, gallery photos, CMS text headlines, and registered users back to original demo values.
                  </Text>

                  <TouchableOpacity style={styles.resetBtn} onPress={handleReset}>
                    <Text style={styles.resetBtnText}>↺ Reset All Store Data to Initial Defaults</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* ADD / EDIT GUIDE MODAL */}
      <Modal
        visible={isGuideModalOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsGuideModalOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {editingGuideId ? '✏️ Edit Mountain Guide' : '➕ Add New Mountain Guide'}
                </Text>
                <Text style={styles.modalSubtitle}>
                  This guide will appear in the "MEET OUR GUIDES" section on the About Us page.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setIsGuideModalOpen(false)}
              >
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 520 }} showsVerticalScrollIndicator={false}>
              <View style={styles.modalFormContent}>
                {/* Full Name */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>GUIDE FULL NAME *</Text>
                  <TextInput
                    style={styles.input}
                    value={guideForm.name}
                    onChangeText={(t) => setGuideForm({ ...guideForm, name: t })}
                    placeholder="e.g. MARCUS THORNE"
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                {/* Role / Category */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>CATEGORY / DESIGNATION / ROLE *</Text>
                  <TextInput
                    style={styles.input}
                    value={guideForm.category}
                    onChangeText={(t) => setGuideForm({ ...guideForm, category: t })}
                    placeholder="e.g. CHIEF EXPEDITION LEAD, ALPINE GUIDE, SURVIVAL EXPERT"
                    placeholderTextColor="#94A3B8"
                  />
                </View>

                {/* Guide Photo Selector */}
                <View style={styles.formGroup}>
                  <Text style={styles.label}>GUIDE PHOTO</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <TouchableOpacity
                      style={styles.fileUploadBtn}
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
                                  setGuideForm((prev) => ({ ...prev, imageKey: dataUrl }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          };
                          input.click();
                        }
                      }}
                    >
                      <Text style={styles.fileUploadBtnText}>📁 Upload Photo from Computer</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Preset Buttons */}
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#64748B', marginBottom: 6 }}>
                    OR CHOOSE FROM PRESETS:
                  </Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                    {PRESET_GUIDE_IMAGES.map((preset) => {
                      const isSelected = guideForm.imageKey === preset.key;
                      return (
                        <TouchableOpacity
                          key={preset.key}
                          style={[styles.presetGuideBtn, isSelected && styles.presetGuideBtnActive]}
                          onPress={() => setGuideForm({ ...guideForm, imageKey: preset.key })}
                        >
                          <Image source={resolveAsset(preset.key, 'guide1.jpg')} style={styles.presetGuideThumb} />
                          <Text style={[styles.presetGuideBtnText, isSelected && styles.presetGuideBtnTextActive]}>
                            {preset.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  {/* Custom URL Input */}
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#64748B', marginBottom: 4 }}>
                    OR PASTE IMAGE URL:
                  </Text>
                  <TextInput
                    style={styles.input}
                    value={guideForm.imageKey.startsWith('data:') ? '[Uploaded Image Attached]' : guideForm.imageKey}
                    onChangeText={(t) => {
                      if (!t.startsWith('[Uploaded Image')) {
                        setGuideForm({ ...guideForm, imageKey: t });
                      }
                    }}
                    placeholder="https://example.com/guide.jpg or guide1.jpg"
                    placeholderTextColor="#94A3B8"
                  />

                  {/* Live Preview Card */}
                  <Text style={{ fontSize: 11, fontWeight: '700', color: '#64748B', marginTop: 14, marginBottom: 6 }}>
                    LIVE PREVIEW (CARD ON ABOUT PAGE):
                  </Text>
                  <View style={styles.modalPreviewCard}>
                    <Image
                      source={resolveAsset(guideForm.imageKey, 'guide1.jpg')}
                      style={styles.modalPreviewImg}
                      resizeMode="cover"
                    />
                    <View style={styles.modalPreviewOverlay}>
                      <Text style={styles.modalPreviewCategory}>
                        {guideForm.category || 'CATEGORY / ROLE'}
                      </Text>
                      <Text style={styles.modalPreviewName}>
                        {guideForm.name || 'GUIDE FULL NAME'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setIsGuideModalOpen(false)}
              >
                <Text style={styles.modalCancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleSaveGuide}
              >
                <Text style={styles.modalSaveBtnText}>
                  {editingGuideId ? '✓ Save Changes' : '✓ Add Guide'}
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

  successToast: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  successToastText: {
    color: '#16A34A',
    fontSize: 13,
    fontWeight: '700',
  },

  tabsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
    flexWrap: 'wrap',
  },

  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  activeTabButton: {
    backgroundColor: '#0B5CAD',
    borderColor: '#0B5CAD',
  },

  tabButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },

  activeTabButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },

  sectionHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 20,
  },

  subSectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    marginTop: 10,
    marginBottom: 10,
  },

  fieldGrid: {
    gap: 16,
  },

  rowTwo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  formGroup: {
    gap: 6,
  },

  label: {
    fontSize: 12,
    fontWeight: '800',
    color: '#334155',
    letterSpacing: 0.5,
  },

  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 14,
    color: '#0F172A',
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 10,
  },

  saveSubmitBtn: {
    backgroundColor: '#0B5CAD',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },

  saveSubmitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  // Inquiries Card
  inquiryCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
  },

  inquiryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },

  inquiryName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },

  inquiryMeta: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    lineHeight: 18,
  },

  inqStatusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },

  inqStatusNew: {
    backgroundColor: '#FEE2E2',
  },

  inqStatusContacted: {
    backgroundColor: '#FEF3C7',
  },

  inqStatusResolved: {
    backgroundColor: '#DCFCE7',
  },

  inqStatusText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E293B',
  },

  inqDateText: {
    fontSize: 11,
    color: '#94A3B8',
  },

  inquiryMessage: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    marginVertical: 10,
  },

  inquiryMessageText: {
    fontSize: 13,
    color: '#334155',
    fontStyle: 'italic',
    lineHeight: 18,
  },

  inquiryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  statusChangeBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  activeStatusChangeBtn: {
    backgroundColor: '#0B5CAD',
    borderColor: '#0B5CAD',
  },

  statusChangeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },

  activeStatusChangeBtnText: {
    color: '#FFFFFF',
  },

  deleteInqBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FEE2E2',
  },

  deleteInqBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  infoLabel: {
    fontSize: 13,
    color: '#64748B',
  },

  infoValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },

  resetBtn: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },

  resetBtnText: {
    color: '#DC2626',
    fontSize: 13,
    fontWeight: '800',
  },

  /* TOUR GUIDES CMS STYLES */
  addGuidePrimaryBtn: {
    backgroundColor: '#0B5CAD',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  addGuidePrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  guideHeaderBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  guideCardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },

  guideAdminCard: {
    width: '48.5%',
    minWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center',
  },

  guideAdminThumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },

  guideAdminName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
  },

  guideAdminBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
  },

  guideAdminBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
    letterSpacing: 0.5,
  },

  guideAdminActions: {
    gap: 6,
  },

  guideEditBtn: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
  },

  guideEditBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1D4ED8',
  },

  guideDeleteBtn: {
    backgroundColor: '#FEF2F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
    alignItems: 'center',
  },

  guideDeleteBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },

  /* GUIDE MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },

  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    width: '100%',
    maxWidth: 580,
    overflow: 'hidden',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },

  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCloseText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748B',
  },

  modalFormContent: {
    padding: 24,
  },

  fileUploadBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },

  fileUploadBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  presetGuideBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
  },

  presetGuideBtnActive: {
    borderColor: '#0B5CAD',
    backgroundColor: '#EFF6FF',
  },

  presetGuideThumb: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },

  presetGuideBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },

  presetGuideBtnTextActive: {
    color: '#0B5CAD',
    fontWeight: '700',
  },

  modalPreviewCard: {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#0F172A',
    position: 'relative',
  },

  modalPreviewImg: {
    width: '100%',
    height: '100%',
  },

  modalPreviewOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
  },

  modalPreviewCategory: {
    color: '#38BDF8',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 2,
  },

  modalPreviewName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#F8FAFC',
  },

  modalCancelBtn: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    backgroundColor: '#FFFFFF',
  },

  modalCancelBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },

  modalSaveBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#0B5CAD',
  },

  modalSaveBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});