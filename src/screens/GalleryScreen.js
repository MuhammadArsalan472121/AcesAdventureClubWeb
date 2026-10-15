import React, { useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useResponsive from "../hooks/useResponsive";
import { useData, resolveAsset } from "../context/DataContext";
import { pickImageFromDevice } from "../utils/imageUpload";

const { height, width } = Dimensions.get("window");

export default function GalleryScreen() {
  const navigation = useNavigation();
  const { gallery = [], trips = [], addGalleryItem } = useData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Device upload modal state
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadCategory, setUploadCategory] = useState("MOUNTAINS");
  const [deviceImage, setDeviceImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    isMobile,
    isDesktop,
    isTablet,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
  } = useResponsive();

  // Base preset categories with "All" first
  const baseCategories = ["All", "Mountains", "Lakes", "Camping", "Trekking", "Nature Trails"];
  const dynamicCategories = (gallery || [])
    .map((item) => (item.category ? item.category.trim() : ""))
    .filter((c) => c && !baseCategories.some((b) => b.toLowerCase() === c.toLowerCase()));
  const categories = [
    "All",
    ...baseCategories.slice(1),
    ...Array.from(new Set(dynamicCategories)),
  ];

  // Filtering: "All" returns all gallery items, each category returns ONLY items belonging to that category
  const isAllSelected = !selectedCategory || selectedCategory.trim().toLowerCase() === "all";
  const filteredGallery = isAllSelected
    ? (gallery || [])
    : (gallery || []).filter((item) => {
        if (!item || !item.category) return false;
        return item.category.trim().toLowerCase() === selectedCategory.trim().toLowerCase();
      });

  // Distribute items across 3 columns for desktop masonry
  const col1 = filteredGallery.filter((_, idx) => idx % 3 === 0);
  const col2 = filteredGallery.filter((_, idx) => idx % 3 === 1);
  const col3 = filteredGallery.filter((_, idx) => idx % 3 === 2);

  const signatureDestinations = trips.slice(0, 3);

  const handlePickImage = async () => {
    try {
      const result = await pickImageFromDevice();
      if (result) {
        setDeviceImage(result);
      }
    } catch (err) {
      console.warn("Image picker error:", err);
    }
  };

  const handlePublishPhoto = async () => {
    if (!uploadTitle.trim()) {
      alert("Please enter a photo caption / title");
      return;
    }
    if (!deviceImage?.dataUrl) {
      alert("Please select an image from your device");
      return;
    }

    setIsUploading(true);
    try {
      if (addGalleryItem) {
        await addGalleryItem({
          title: uploadTitle.trim(),
          category: uploadCategory.toUpperCase(),
          imageKey: deviceImage.dataUrl,
          height: 260,
        });
      }
      setUploadModalVisible(false);
      setUploadTitle("");
      setDeviceImage(null);
      setToastMessage("Photo uploaded to Gallery successfully!");
      setTimeout(() => setToastMessage(""), 4000);
    } catch (error) {
      console.error("Failed to upload photo:", error);
      alert("Failed to upload photo. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ================= HERO SECTION ================= */}
        <ImageBackground
          source={require("../../assets/galleryHero.jpg")}
          style={[styles.hero, { height: isDesktop ? 640 : height * 0.85 }]}
          resizeMode="cover"
        >
          <View style={[styles.overlay, { paddingHorizontal: paddingHorizontal }]}>
            <Header />

            <View style={[styles.heroContent, { maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", alignItems: "center" }]}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>✨ EXPLORE NATURE'S BEAUTY</Text>
              </View>

              <Text style={[styles.heroTitle, { fontSize: isDesktop ? 54 : 36, textAlign: "center" }]}>
                Discover Places
              </Text>
              <Text style={[styles.heroSubTitle, { fontSize: isDesktop ? 54 : 36, textAlign: "center" }]}>
                Worth Exploring
              </Text>

              <Text style={[styles.heroDescription, { fontSize: isDesktop ? 17 : 15, textAlign: "center", maxWidth: 750 }]}>
                Experience breathtaking mountains, hidden trails, peaceful lakes, and unforgettable landscapes through our curated adventure showcase.
              </Text>

              <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={styles.heroButton} onPress={() => navigation.navigate("BrowseTrips")}>
                  <Text style={styles.heroButtonText}>EXPLORE TRIPS ➔</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>

        {/* ================= DYNAMIC CATEGORY FILTERS & UPLOAD ACTION ================= */}
        <View style={[styles.filterSectionWrapper, { backgroundColor: "#F8FAFC", paddingVertical: 24 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            {toastMessage ? (
              <View style={styles.toastCard}>
                <Ionicons name="checkmark-circle" size={18} color="#16A34A" style={{ marginRight: 8 }} />
                <Text style={styles.toastText}>{toastMessage}</Text>
              </View>
            ) : null}

            <View style={[styles.filterBarRow, isDesktop ? { flexDirection: "row", justifyContent: "space-between", alignItems: "center" } : { flexDirection: "column", gap: 16 }]}>
              {/* Category Filters with All button and Clear Active State */}
              <View style={[styles.filterContainer, { flex: 1 }]}>
                {categories.map((cat) => {
                  const isCatActive = selectedCategory.trim().toLowerCase() === cat.trim().toLowerCase();
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[styles.filterChip, isCatActive && styles.activeFilterChip]}
                      onPress={() => setSelectedCategory(cat)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.filterChipText, isCatActive && styles.activeFilterText]}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Upload Image From Device Button */}
              <TouchableOpacity
                style={styles.uploadPhotoBtn}
                onPress={() => setUploadModalVisible(true)}
                activeOpacity={0.85}
              >
                <Ionicons name="cloud-upload-outline" size={17} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.uploadPhotoBtnText}>Upload Image → From Your Device</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= DYNAMIC MASONRY GALLERY GRID ================= */}
        <View style={[styles.galleryGridWrapper, { backgroundColor: "#FFFFFF" }]}>
          <View
            style={[
              styles.gallerySection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 60 : 30,
              },
            ]}
          >
            {filteredGallery.length === 0 ? (
              <View style={styles.emptyGalleryBox}>
                <Ionicons name="images-outline" size={44} color="#94A3B8" style={{ marginBottom: 12 }} />
                <Text style={styles.emptyGalleryTitle}>No photos found in "{selectedCategory}"</Text>
                <Text style={styles.emptyGallerySub}>
                  There are no photos currently tagged with this category.
                </Text>
                <TouchableOpacity
                  style={styles.emptyResetBtn}
                  onPress={() => setSelectedCategory("All")}
                >
                  <Text style={styles.emptyResetBtnText}>View All Photos ({gallery.length})</Text>
                </TouchableOpacity>
              </View>
            ) : isDesktop ? (
              <View style={[styles.masonryGrid, { flexDirection: "row", justifyContent: "space-between" }]}>
                {/* Column 1 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col1.map((item) => (
                    <View key={item.id} style={styles.imageCardContainer}>
                      <Image source={resolveAsset(item.imageKey, "gallery1.jpg")} style={[styles.galleryImage, { height: item.height || 260 }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.category}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Column 2 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col2.map((item) => (
                    <View key={item.id} style={styles.imageCardContainer}>
                      <Image source={resolveAsset(item.imageKey, "gallery2.jpg")} style={[styles.galleryImage, { height: item.height || 220 }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.category}</Text>
                      </View>
                    </View>
                  ))}
                </View>

                {/* Column 3 */}
                <View style={[styles.masonryColumn, { width: "32%" }]}>
                  {col3.map((item) => (
                    <View key={item.id} style={styles.imageCardContainer}>
                      <Image source={resolveAsset(item.imageKey, "gallery3.jpg")} style={[styles.galleryImage, { height: item.height || 280 }]} />
                      <View style={styles.imageTagOverlay}>
                        <Text style={styles.imageTagText}>{item.category}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ) : (
              <View style={styles.mobileGridContainer}>
                {filteredGallery.map((item) => (
                  <View key={item.id} style={styles.mobileImageCard}>
                    <Image source={resolveAsset(item.imageKey, "gallery1.jpg")} style={styles.mobileGalleryImage} />
                    <View style={styles.imageTagOverlay}>
                      <Text style={styles.imageTagText}>{item.category}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* ================= SIGNATURE DESTINATIONS ================= */}
        <View style={[styles.destinationSectionWrapper, { backgroundColor: "#F7FAFD" }]}>
          <View
            style={[
              styles.destinationSection,
              {
                maxWidth: contentMaxWidth,
                width: "100%",
                alignSelf: "center",
                paddingHorizontal: paddingHorizontal,
                paddingVertical: isDesktop ? 80 : 50,
              },
            ]}
          >
            <Text style={styles.destinationTag}>ELITE SELECTION</Text>

            <View style={[styles.destinationHeaderRow, isDesktop && { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 35 }]}>
              <Text style={styles.destinationTitle}>SIGNATURE DESTINATIONS</Text>
              <Text style={styles.destinationDescription}>
                Curated locations that represent the pinnacle of adventure and luxury in the wild.
              </Text>
            </View>

            {/* 3 Destination Cards Grid */}
            <View style={[styles.destinationCardsGrid, isDesktop && { flexDirection: "row", justifyContent: "space-between" }]}>
              {signatureDestinations.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.destinationCard, isDesktop && { width: "31.5%", marginBottom: 0 }]}
                  onPress={() => navigation.navigate("ViewTrip", { tripId: item.id })}
                >
                  <ImageBackground source={resolveAsset(item.imageKey, "hub1.jpg")} style={styles.destinationCardBg} imageStyle={{ borderRadius: 20 }}>
                    <View style={styles.destinationOverlay}>
                      {item.badge ? (
                        <View style={styles.destinationBadge}>
                          <Text style={styles.destinationBadgeText}>{item.badge}</Text>
                        </View>
                      ) : null}

                      <View style={styles.destinationCardBottom}>
                        <Text style={styles.destinationName}>{item.title}</Text>
                        <Text style={styles.destinationText} numberOfLines={2}>{item.description}</Text>

                        <View style={styles.destinationBottomRow}>
                          <View>
                            <Text style={styles.priceLabelText}>starting from</Text>
                            <Text style={styles.destinationPriceText}>{item.price}</Text>
                          </View>
                          <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.daysText}>{item.duration}</Text>
                            <Text style={styles.viewPackageText}>view package ➔</Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ================= NEWSLETTER CARD SECTION (Stay Tuned with adventure-bg.jpg) ================= */}
        <View style={[styles.newsletterSectionWrapper, { backgroundColor: "#FFFFFF", paddingVertical: isDesktop ? 60 : 30 }]}>
          <View style={{ maxWidth: contentMaxWidth, width: "100%", alignSelf: "center", paddingHorizontal: paddingHorizontal }}>
            <ImageBackground
              source={require("../../assets/adventure-bg.jpg")}
              style={styles.newsletterBg}
              resizeMode="cover"
              imageStyle={{ borderRadius: 28, resizeMode: "cover" }}
            >
              <View style={styles.newsletterOverlay}>
                <View style={{ alignItems: "center", paddingVertical: isDesktop ? 60 : 40, paddingHorizontal: 24 }}>
                  <View style={styles.stayTunedBadge}>
                    <Text style={styles.stayTunedBadgeText}>STAY TUNED</Text>
                  </View>

                  <Text style={[styles.newsTitle, { fontSize: isDesktop ? 44 : 28, textAlign: "center" }]}>
                    YOUR NEXT ADVENTURE <Text style={styles.blueItalicLight}>AWAITS</Text>
                  </Text>

                  <Text style={[styles.newsDescription, { fontSize: isDesktop ? 16 : 14, textAlign: "center", maxWidth: 680 }]}>
                    Join our community of explorers and discover breathtaking destinations, unforgettable experiences and adventures that create memories for a lifetime.
                  </Text>

                  {/* Form Row */}
                  <View
                    style={[
                      styles.subscribeContainer,
                      { width: "100%", maxWidth: 540, marginTop: isDesktop ? 30 : 20 },
                      isMobile && styles.subscribeContainerMobile,
                    ]}
                  >
                    <TextInput
                      placeholder="Enter your email address"
                      placeholderTextColor="#94A3B8"
                      style={[styles.emailInput, isMobile && styles.emailInputMobile]}
                    />
                    <TouchableOpacity
                      style={[styles.subscribeButton, isMobile && styles.subscribeButtonMobile]}
                      onPress={() => navigation.navigate("Contact")}
                    >
                      <Text style={styles.subscribeButtonText}>Subscribe Free</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.smallText}>No spam ever • Unsubscribe in one click</Text>
                </View>
              </View>
            </ImageBackground>

            {/* Start Exploring Center Button */}
            <View style={{ alignItems: "center", marginTop: 30 }}>
              <TouchableOpacity style={styles.startExploringBtn} onPress={() => navigation.navigate("BrowseTrips")}>
                <Text style={styles.startExploringBtnText}>Start Exploring</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ================= FOOTER ================= */}
        <Footer />
      </ScrollView>

      {/* ================= UPLOAD FROM DEVICE MODAL ================= */}
      <Modal visible={uploadModalVisible} transparent animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Upload Photo to Gallery</Text>
                <Text style={styles.modalSubtitle}>
                  Select an image from your device to showcase in the community gallery.
                </Text>
              </View>
              <TouchableOpacity onPress={() => setUploadModalVisible(false)} style={styles.closeBtn}>
                <Ionicons name="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 460 }} showsVerticalScrollIndicator={false}>
              <View style={styles.modalForm}>
                {/* Title */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>PHOTO CAPTION / TITLE *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Hunza Sunset, Passu Cones Expedition"
                    placeholderTextColor="#94A3B8"
                    value={uploadTitle}
                    onChangeText={setUploadTitle}
                  />
                </View>

                {/* Category Selection */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>CATEGORY *</Text>
                  <View style={styles.pillRow}>
                    {["MOUNTAINS", "LAKES", "CAMPING", "TREKKING", "NATURE TRAILS"].map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.categoryPill,
                          uploadCategory.toUpperCase() === cat && styles.activeCategoryPill,
                        ]}
                        onPress={() => setUploadCategory(cat)}
                      >
                        <Text
                          style={[
                            styles.categoryPillText,
                            uploadCategory.toUpperCase() === cat && styles.activeCategoryPillText,
                          ]}
                        >
                          {cat}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                {/* Upload Image From Your Device Button / Preview */}
                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>IMAGE ATTACHMENT *</Text>

                  {deviceImage?.dataUrl ? (
                    <View style={styles.uploadedPreviewCard}>
                      <Image source={{ uri: deviceImage.dataUrl }} style={styles.previewThumbnail} />
                      <View style={{ flex: 1 }}>
                        <View style={styles.loadedSuccessBadge}>
                          <Text style={styles.loadedSuccessBadgeText}>✓ Ready to Upload</Text>
                        </View>
                        <Text style={styles.previewFileName} numberOfLines={1}>
                          {deviceImage.fileName || "Device Image"}
                        </Text>
                        <Text style={styles.previewFileSize}>{deviceImage.fileSize}</Text>
                        <TouchableOpacity style={styles.changeImageBtn} onPress={handlePickImage}>
                          <Text style={styles.changeImageBtnText}>Change Photo</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.deviceUploadCard}
                      onPress={handlePickImage}
                      activeOpacity={0.8}
                    >
                      <View style={styles.uploadIconCircle}>
                        <Ionicons name="cloud-upload" size={28} color="#0B5CAD" />
                      </View>
                      <Text style={styles.deviceUploadTitle}>Upload Image → From Your Device</Text>
                      <Text style={styles.deviceUploadSubtitle}>
                        Tap to browse JPG, PNG, or WebP files from your phone or PC
                      </Text>
                      <View style={styles.browsePill}>
                        <Text style={styles.browsePillText}>Browse Device Files</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setUploadModalVisible(false)}
                disabled={isUploading}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.publishBtn, isUploading && { opacity: 0.6 }]}
                onPress={handlePublishPhoto}
                disabled={isUploading}
              >
                {isUploading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                ) : (
                  <Ionicons name="checkmark-sharp" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                )}
                <Text style={styles.publishBtnText}>
                  {isUploading ? "Uploading..." : "Publish to Gallery"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  hero: {
    width: "100%",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.45)",
  },

  heroContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },

  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    marginBottom: 20,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  heroTitle: {
    color: "#FFFFFF",
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  heroSubTitle: {
    color: "#38BDF8",
    fontWeight: "800",
    fontStyle: "italic",
    marginTop: 4,
  },

  heroDescription: {
    color: "#F1F5F9",
    marginTop: 18,
    lineHeight: 26,
  },

  heroButton: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
    elevation: 4,
  },

  heroButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 1,
  },

  /* FILTER CHIPS & UPLOAD BAR */
  filterSectionWrapper: {},

  filterBarRow: {
    alignItems: "center",
  },

  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },

  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    cursor: "pointer",
  },

  activeFilterChip: {
    backgroundColor: "#0B5CAD",
    borderColor: "#0B5CAD",
    shadowColor: "#0B5CAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },

  filterChipText: {
    color: "#475569",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  activeFilterText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  uploadPhotoBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 22,
    shadowColor: "#0B5CAD",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
    cursor: "pointer",
  },

  uploadPhotoBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  toastCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    marginBottom: 16,
  },

  toastText: {
    color: "#15803D",
    fontSize: 13,
    fontWeight: "700",
  },

  emptyGalleryBox: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    marginVertical: 20,
  },

  emptyGalleryTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },

  emptyGallerySub: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 18,
  },

  emptyResetBtn: {
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },

  emptyResetBtnText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* MASONRY GALLERY GRID */
  galleryGridWrapper: {},

  gallerySection: {},

  masonryGrid: {
    gap: 16,
  },

  masonryColumn: {
    flexDirection: "column",
    gap: 16,
  },

  imageCardContainer: {
    position: "relative",
    marginBottom: 16,
    borderRadius: 20,
    overflow: "hidden",
  },

  galleryImage: {
    width: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },

  imageTagOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
  },

  imageTagText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  mobileGridContainer: {
    gap: 16,
  },

  mobileImageCard: {
    position: "relative",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 16,
  },

  mobileGalleryImage: {
    width: "100%",
    height: 240,
    borderRadius: 20,
  },

  /* SIGNATURE DESTINATIONS */
  destinationSectionWrapper: {},

  destinationSection: {},

  destinationTag: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0B5CAD",
    letterSpacing: 1.5,
    marginBottom: 6,
  },

  destinationHeaderRow: {},

  destinationTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "#0F172A",
  },

  destinationDescription: {
    fontSize: 15,
    color: "#64748B",
    lineHeight: 24,
    maxWidth: 400,
  },

  destinationCardsGrid: {
    marginTop: 20,
  },

  destinationCard: {
    width: "100%",
    height: 360,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
    cursor: "pointer",
  },

  destinationCardBg: {
    width: "100%",
    height: "100%",
  },

  destinationOverlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },

  destinationBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#0088FF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
  },

  destinationBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  destinationCardBottom: {},

  destinationName: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },

  destinationText: {
    color: "#CBD5E1",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 6,
  },

  destinationBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.2)",
  },

  priceLabelText: {
    color: "#94A3B8",
    fontSize: 10,
    fontWeight: "600",
  },

  destinationPriceText: {
    color: "#38BDF8",
    fontSize: 15,
    fontWeight: "800",
  },

  daysText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  viewPackageText: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 2,
  },

  /* NEWSLETTER CARD */
  newsletterBg: {
    width: "100%",
    overflow: "hidden",
    borderRadius: 28,
  },

  newsletterOverlay: {
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    borderRadius: 28,
  },

  stayTunedBadge: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    marginBottom: 16,
  },

  stayTunedBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  newsTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    lineHeight: 52,
  },

  blueItalicLight: {
    color: "#38BDF8",
    fontStyle: "italic",
  },

  newsDescription: {
    color: "#CBD5E1",
    marginTop: 14,
    lineHeight: 24,
  },

  subscribeContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 30,
    padding: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },

  subscribeContainerMobile: {
    flexDirection: "column",
    backgroundColor: "transparent",
    borderWidth: 0,
    padding: 0,
  },

  emailInput: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    color: "#FFFFFF",
    fontSize: 15,
  },

  emailInputMobile: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
    height: 52,
    marginBottom: 12,
  },

  subscribeButton: {
    backgroundColor: "#0088FF",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },

  subscribeButtonMobile: {
    width: "100%",
    height: 52,
  },

  subscribeButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  smallText: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 14,
  },

  startExploringBtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 28,
    cursor: "pointer",
    elevation: 4,
  },

  startExploringBtnText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },

  /* MODAL STYLES */
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    width: "100%",
    maxWidth: 560,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 25,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },

  modalTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
  },

  modalSubtitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 3,
  },

  closeBtn: {
    padding: 4,
  },

  modalForm: {
    gap: 16,
    paddingVertical: 8,
  },

  formGroup: {
    gap: 6,
  },

  formLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#334155",
    letterSpacing: 0.5,
  },

  formInput: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 14,
    color: "#0F172A",
  },

  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  categoryPill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  activeCategoryPill: {
    backgroundColor: "#0B5CAD",
    borderColor: "#0B5CAD",
  },

  categoryPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#475569",
  },

  activeCategoryPillText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  deviceUploadCard: {
    borderWidth: 2,
    borderColor: "#BFDBFE",
    borderStyle: "dashed",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    cursor: "pointer",
  },

  uploadIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  deviceUploadTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0B5CAD",
    marginBottom: 4,
  },

  deviceUploadSubtitle: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 12,
  },

  browsePill: {
    backgroundColor: "#0B5CAD",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
  },

  browsePillText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700",
  },

  uploadedPreviewCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 12,
    padding: 12,
  },

  previewThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: "#E2E8F0",
  },

  loadedSuccessBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#DCFCE7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 4,
  },

  loadedSuccessBadgeText: {
    color: "#16A34A",
    fontSize: 11,
    fontWeight: "700",
  },

  previewFileName: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F172A",
  },

  previewFileSize: {
    fontSize: 11,
    color: "#64748B",
    marginTop: 2,
  },

  changeImageBtn: {
    marginTop: 6,
    alignSelf: "flex-start",
  },

  changeImageBtnText: {
    fontSize: 11,
    color: "#0B5CAD",
    fontWeight: "700",
    textDecorationLine: "underline",
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#E2E8F0",
  },

  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
  },

  cancelBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },

  publishBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#0B5CAD",
  },

  publishBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },
});
