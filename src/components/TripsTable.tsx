import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const trips = [
  {
    name: 'Hunza Valley Expedition',
    location: 'Hunza, Gilgit-Baltistan',
    date: 'Oct 20, 2024',
    members: '24',
    status: 'UPCOMING',
  },
  {
    name: 'Skardu Adventure',
    location: 'Skardu, Gilgit-Baltistan',
    date: 'Nov 04, 2024',
    members: '18',
    status: 'UPCOMING',
  },
  {
    name: 'Fairy Meadows Trek',
    location: 'Nanga Parbat Region',
    date: 'Sep 15, 2024',
    members: '16',
    status: 'COMPLETED',
  },
  {
    name: 'Swat Valley Escape',
    location: 'Swat, Khyber Pakhtunkhwa',
    date: 'Dec 02, 2024',
    members: '20',
    status: 'DRAFT',
  },
];

export default function TripsTable() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TRIP NAME</Text>
        <Text style={styles.headerText}>LOCATION</Text>
        <Text style={styles.headerText}>DATE</Text>
        <Text style={styles.headerText}>MEMBERS</Text>
        <Text style={styles.headerText}>STATUS</Text>
        <Text style={styles.headerText}>ACTION</Text>
      </View>

      {trips.map((trip, index) => (
        <View style={styles.row} key={index}>
          <Text style={styles.tripName}>{trip.name}</Text>

          <Text style={styles.cell}>{trip.location}</Text>

          <Text style={styles.cell}>{trip.date}</Text>

          <Text style={styles.cell}>{trip.members}</Text>

          <View style={styles.statusCell}>
            <Text
              style={[
                styles.status,
                trip.status === 'UPCOMING'
                  ? styles.upcoming
                  : trip.status === 'COMPLETED'
                    ? styles.completed
                    : styles.draft,
              ]}
            >
              {trip.status}
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

  tripName: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 8,
    fontWeight: '600',
    color: '#17253A',
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

  upcoming: {
    color: '#527D9B',
    backgroundColor: '#EAF1F5',
  },

  completed: {
    color: '#2E8B57',
    backgroundColor: '#E7F6EC',
  },

  draft: {
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