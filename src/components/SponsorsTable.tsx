import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const sponsors = [
  {
    name: 'Mountain Gear Pakistan',
    contact: 'info@mountaingear.pk',
    package: 'Platinum',
    trips: '8',
    status: 'ACTIVE',
  },
  {
    name: 'Adventure World',
    contact: 'contact@adventureworld.com',
    package: 'Gold',
    trips: '5',
    status: 'ACTIVE',
  },
  {
    name: 'Peak Sports',
    contact: 'hello@peaksports.pk',
    package: 'Silver',
    trips: '3',
    status: 'ACTIVE',
  },
  {
    name: 'Travel Heights',
    contact: 'info@travelheights.com',
    package: 'Gold',
    trips: '4',
    status: 'INACTIVE',
  },
];

export default function SponsorsTable() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>SPONSOR</Text>
        <Text style={styles.headerText}>CONTACT</Text>
        <Text style={styles.headerText}>PACKAGE</Text>
        <Text style={styles.headerText}>TRIPS</Text>
        <Text style={styles.headerText}>STATUS</Text>
        <Text style={styles.headerText}>ACTION</Text>
      </View>

      {sponsors.map((sponsor, index) => (
        <View style={styles.row} key={index}>
          <View style={styles.sponsorCell}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>
                {sponsor.name.substring(0, 2).toUpperCase()}
              </Text>
            </View>

            <Text style={styles.name}>{sponsor.name}</Text>
          </View>

          <Text style={styles.cell}>{sponsor.contact}</Text>

          <Text style={styles.cell}>{sponsor.package}</Text>

          <Text style={styles.cell}>{sponsor.trips}</Text>

          <View style={styles.statusCell}>
            <Text
              style={[
                styles.status,
                sponsor.status === 'ACTIVE'
                  ? styles.active
                  : styles.inactive,
              ]}
            >
              {sponsor.status}
            </Text>
          </View>

          <Text style={styles.action}>⋮</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E7E2DB',
    borderRadius: 12,
    overflow: 'hidden',
  },

  header: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },

  headerText: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 7,
    fontWeight: '700',
    color: '#555555',
    letterSpacing: 0.5,
  },

  row: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  sponsorCell: {
    flex: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  logo: {
    width: 28,
    height: 28,
    borderRadius: 15,
    backgroundColor: '#EAF1F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoText: {
    color: '#527D9B',
    fontSize: 7,
    fontWeight: '700',
  },

  name: {
    fontSize: 8,
    color: '#17253A',
    fontWeight: '600',
  },

  cell: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 7,
    color: '#555555',
  },

  statusCell: {
    flex: 1,
    paddingHorizontal: 12,
  },

  status: {
    alignSelf: 'flex-start',
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 6,
    fontWeight: '700',
  },

  active: {
    color: '#2E8B57',
    backgroundColor: '#E7F6EC',
  },

  inactive: {
    color: '#777777',
    backgroundColor: '#EEEEEE',
  },

  action: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#555555',
  },
});