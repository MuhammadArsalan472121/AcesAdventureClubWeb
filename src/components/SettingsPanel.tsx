import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';

export default function SettingsPanel() {
  return (
    <View style={styles.container}>
      {/* General Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>General Settings</Text>

        <View style={styles.settingRow}>
          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Admin Notifications</Text>
            <Text style={styles.description}>
              Receive notifications about important admin activities.
            </Text>
          </View>

          <Switch value={true} />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Email Notifications</Text>
            <Text style={styles.description}>
              Receive system updates and reports by email.
            </Text>
          </View>

          <Switch value={true} />
        </View>
      </View>

      {/* Security */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>

        <View style={styles.settingRow}>
          <View style={styles.textContainer}>
            <Text style={styles.settingTitle}>Two-Factor Authentication</Text>
            <Text style={styles.description}>
              Add an extra layer of security to your admin account.
            </Text>
          </View>

          <Switch value={false} />
        </View>

        <View style={styles.divider} />

        <Pressable style={styles.passwordButton}>
          <Text style={styles.passwordButtonText}>
            CHANGE ADMIN PASSWORD
          </Text>
        </Pressable>
      </View>

      {/* System Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Information</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Application Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Environment</Text>
          <Text style={styles.infoValue}>Production</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Last Backup</Text>
          <Text style={styles.infoValue}>Today, 08:30 AM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },

  section: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E2DB',
    borderRadius: 12,
    padding: 20,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#17253A',
    marginBottom: 18,
  },

  settingRow: {
    minHeight: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  textContainer: {
    flex: 1,
    paddingRight: 20,
  },

  settingTitle: {
    fontSize: 9,
    fontWeight: '600',
    color: '#17253A',
  },

  description: {
    fontSize: 7,
    color: '#777777',
    marginTop: 5,
    lineHeight: 11,
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8,
  },

  passwordButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#1D304F',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },

  passwordButtonText: {
    color: '#FFFFFF',
    fontSize: 7,
    fontWeight: '700',
    letterSpacing: 0.4,
  },

  infoRow: {
    minHeight: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  infoLabel: {
    fontSize: 8,
    color: '#666666',
  },

  infoValue: {
    fontSize: 8,
    fontWeight: '600',
    color: '#17253A',
  },
});