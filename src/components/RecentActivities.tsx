import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const activities = [
  {
    title: 'New Member Registered',
    description: 'Sophia Miller joined Elite Voyager club.',
    time: '2 MINS AGO',
    icon: '👤',
  },
  {
    title: 'Sponsor Updated',
    description: 'Mountain Gear Pakistan verified as partner.',
    time: '1 HOUR AGO',
    icon: '🤝',
  },
  {
    title: 'Expedition Added',
    description: 'Hunza Explorer details updated.',
    time: '3 HOURS AGO',
    icon: '🏔️',
  },
  {
    title: 'Inquiry Received',
    description: 'Aiden Vance requested luxury camping info.',
    time: 'TODAY',
    icon: '📩',
  },
];

export default function RecentActivities() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Live Club Operations</Text>
      <Text style={styles.subtitle}>Recent operational events & alerts</Text>

      <View style={styles.list}>
        {activities.map((activity, index) => (
          <View style={styles.activity} key={index}>
            <View style={styles.activityIcon}>
              <Text style={styles.iconText}>{activity.icon}</Text>
            </View>

            <View style={styles.activityContent}>
              <View style={styles.topRow}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.time}>{activity.time}</Text>
              </View>

              <Text style={styles.description}>
                {activity.description}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 340,
    height: 330,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },

  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 14,
  },

  list: {
    gap: 12,
  },

  activity: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },

  iconText: {
    fontSize: 14,
  },

  activityContent: {
    flex: 1,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  activityTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },

  time: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.4,
  },

  description: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 16,
  },
});