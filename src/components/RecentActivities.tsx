import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const activities = [
  {
    title: 'New User Registered',
    description: 'Marcus Thorne joined the club.',
    time: '2 MINUTES AGO',
  },
  {
    title: 'Sponsor Added',
    description: 'Mountain Gear Pakistan onboarded.',
    time: '1 HOUR AGO',
  },
  {
    title: 'Trip Updated',
    description: 'Hunza Valley expedition details refined.',
    time: '5 HOURS AGO',
  },
  {
    title: 'System Backup',
    description: 'Cloud synchronization successful.',
    time: 'YESTERDAY',
  },
];

export default function RecentActivities() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Recent Activities</Text>

      {activities.map((activity, index) => (
        <View style={styles.activity} key={index}>
          <View style={styles.activityIcon}>
            <Text style={styles.dot}>•</Text>
          </View>

          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>

            <Text style={styles.description}>
              {activity.description}
            </Text>

            <Text style={styles.time}>{activity.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#17253A',
    marginBottom: 8,
  },

  activity: {
    flexDirection: 'row',
    marginTop: 15,
  },

  activityIcon: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: '#E8EDF1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  dot: {
    color: '#78A8C8',
    fontSize: 16,
    lineHeight: 17,
  },

  activityContent: {
    flex: 1,
  },

  activityTitle: {
    fontSize: 8,
    fontWeight: '700',
    color: '#17253A',
  },

  description: {
    fontSize: 7,
    color: '#555555',
    marginTop: 2,
    lineHeight: 10,
  },

  time: {
    fontSize: 6,
    color: '#888888',
    marginTop: 4,
  },
});