import React, { useState, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useData } from '../context/DataContext';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  timestamp: number;
  icon: string;
  category: 'all' | 'members' | 'inquiries' | 'trips' | 'sponsors';
  badgeText: string;
  badgeType: 'success' | 'warning' | 'alert' | 'info';
}

function parseItemDate(item: any): Date | null {
  if (!item) return null;
  const raw = item.createdAt || item.joined || item.dateSubmitted;
  if (!raw) return null;
  if (typeof raw?.toDate === 'function') {
    return raw.toDate();
  }
  if (typeof raw === 'number') {
    const d = new Date(raw);
    return isNaN(d.getTime()) ? null : d;
  }
  if (typeof raw === 'string') {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d;
    const parsed = Date.parse(raw);
    if (!isNaN(parsed)) return new Date(parsed);
  }
  return null;
}

function formatRelativeTime(date: Date | null): string {
  if (!date) return 'TODAY';
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  if (diffMs < 0) return 'JUST NOW';
  const diffMins = Math.floor(diffMs / (1000 * 60));
  if (diffMins < 2) return 'JUST NOW';
  if (diffMins < 60) return `${diffMins} MINS AGO`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} ${diffHours === 1 ? 'HOUR' : 'HOURS'} AGO`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'YESTERDAY';
  if (diffDays < 7) return `${diffDays} DAYS AGO`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();
}

export default function RecentActivities() {
  const { users = [], inquiries = [], trips = [], sponsors = [] } = useData();
  const [filter, setFilter] = useState<'all' | 'members' | 'inquiries' | 'trips'>('all');

  // Dynamically build real live operational events from all collections
  const liveActivities: ActivityItem[] = useMemo(() => {
    const list: ActivityItem[] = [];

    // 1. Real member events from users
    users.forEach((u: any, idx: number) => {
      const d = parseItemDate(u) || new Date(Date.now() - (idx + 1) * 3600000 * 4);
      const isElite = u.role === 'Elite Voyager';
      const isAdmin = u.role === 'Admin' || u.role === 'Super Admin';
      const isInactive = u.status === 'INACTIVE';

      list.push({
        id: `user_${u.id || idx}`,
        title: isElite
          ? 'Elite Voyager Enrolled'
          : isAdmin
          ? 'Admin Profile Synced'
          : 'New Member Registered',
        description: `${u.name} joined as ${u.role || 'Member'} (${u.location || 'Pakistan'}).`,
        time: formatRelativeTime(d),
        timestamp: d.getTime(),
        icon: isElite ? '⭐' : isAdmin ? '🛡️' : '👤',
        category: 'members',
        badgeText: isInactive ? 'INACTIVE' : isElite ? 'VIP TIER' : 'ACTIVE',
        badgeType: isInactive ? 'warning' : isElite ? 'info' : 'success',
      });
    });

    // 2. Real booking inquiries
    inquiries.forEach((inq: any, idx: number) => {
      const d = parseItemDate(inq) || new Date(Date.now() - (idx + 1) * 3600000 * 2);
      const isNew = inq.status === 'NEW';

      list.push({
        id: `inq_${inq.id || idx}`,
        title: `Inquiry: ${inq.adventureType || 'Expedition'}`,
        description: `${inq.name} requested booking for ${inq.destination} (${inq.travelers || '1-2 Person'}).`,
        time: formatRelativeTime(d),
        timestamp: d.getTime(),
        icon: '📩',
        category: 'inquiries',
        badgeText: isNew ? 'NEW ALERT' : inq.status,
        badgeType: isNew ? 'alert' : 'info',
      });
    });

    // 3. Real live trips / expeditions
    trips.forEach((trip: any, idx: number) => {
      const d = parseItemDate(trip) || new Date(Date.now() - (idx + 1) * 3600000 * 8);
      const isLive = trip.status === 'ACTIVE';

      list.push({
        id: `trip_${trip.id || idx}`,
        title: `Expedition: ${trip.title}`,
        description: `${trip.location} • ${trip.status} with ${trip.members || '0'} explorers enrolled.`,
        time: isLive ? 'LIVE EXPEDITION' : 'UPCOMING',
        timestamp: d.getTime() - idx * 1000,
        icon: '🏔️',
        category: 'trips',
        badgeText: isLive ? 'LIVE' : 'UPCOMING',
        badgeType: isLive ? 'success' : 'warning',
      });
    });

    // 4. Real sponsors
    sponsors.forEach((sp: any, idx: number) => {
      const d = parseItemDate(sp) || new Date(Date.now() - (idx + 1) * 3600000 * 18);
      const isActive = sp.status === 'ACTIVE';

      list.push({
        id: `sponsor_${sp.id || idx}`,
        title: `Partner: ${sp.companyName || sp.sponsorName || sp.name}`,
        description: `Sponsor active across ${sp.trips || '1'} club trips.`,
        time: isActive ? 'VERIFIED' : 'PENDING',
        timestamp: d.getTime() - idx * 2000,
        icon: '🤝',
        category: 'sponsors',
        badgeText: isActive ? 'PARTNER' : 'PENDING',
        badgeType: isActive ? 'info' : 'warning',
      });
    });

    // Sort descending by recency
    list.sort((a, b) => b.timestamp - a.timestamp);
    return list;
  }, [users, inquiries, trips, sponsors]);

  const filteredActivities = useMemo(() => {
    if (filter === 'all') return liveActivities.slice(0, 5);
    return liveActivities.filter((a) => a.category === filter).slice(0, 5);
  }, [liveActivities, filter]);

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Live Club Operations</Text>
            <View style={styles.livePulse}>
              <View style={styles.pulseDot} />
              <Text style={styles.pulseText}>LIVE FEED</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>Recent operational events & alerts</Text>
        </View>

        {/* Small filter pills */}
        <View style={styles.filterRow}>
          <Pressable
            style={[styles.filterBtn, filter === 'all' && styles.filterBtnActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All
            </Text>
          </Pressable>

          <Pressable
            style={[styles.filterBtn, filter === 'members' && styles.filterBtnActive]}
            onPress={() => setFilter('members')}
          >
            <Text style={[styles.filterText, filter === 'members' && styles.filterTextActive]}>
              Users
            </Text>
          </Pressable>

          <Pressable
            style={[styles.filterBtn, filter === 'inquiries' && styles.filterBtnActive]}
            onPress={() => setFilter('inquiries')}
          >
            <Text style={[styles.filterText, filter === 'inquiries' && styles.filterTextActive]}>
              Inquiries
            </Text>
          </Pressable>

          <Pressable
            style={[styles.filterBtn, filter === 'trips' && styles.filterBtnActive]}
            onPress={() => setFilter('trips')}
          >
            <Text style={[styles.filterText, filter === 'trips' && styles.filterTextActive]}>
              Trips
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Activities List */}
      <ScrollView
        style={styles.listScrollView}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {filteredActivities.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No live events found for this filter.</Text>
          </View>
        ) : (
          filteredActivities.map((activity) => (
            <View style={styles.activity} key={activity.id}>
              {/* Icon Container */}
              <View style={styles.activityIcon}>
                <Text style={styles.iconText}>{activity.icon}</Text>
              </View>

              {/* Main Content */}
              <View style={styles.activityContent}>
                <View style={styles.topRow}>
                  <View style={styles.titleWithBadge}>
                    <Text style={styles.activityTitle} numberOfLines={1}>
                      {activity.title}
                    </Text>

                    <View
                      style={[
                        styles.badge,
                        activity.badgeType === 'success' && styles.badgeSuccess,
                        activity.badgeType === 'alert' && styles.badgeAlert,
                        activity.badgeType === 'warning' && styles.badgeWarning,
                        activity.badgeType === 'info' && styles.badgeInfo,
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          activity.badgeType === 'success' && styles.badgeTextSuccess,
                          activity.badgeType === 'alert' && styles.badgeTextAlert,
                          activity.badgeType === 'warning' && styles.badgeTextWarning,
                          activity.badgeType === 'info' && styles.badgeTextInfo,
                        ]}
                      >
                        {activity.badgeText}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.time}>{activity.time}</Text>
                </View>

                <Text style={styles.description} numberOfLines={2}>
                  {activity.description}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 360,
    minHeight: 350,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    padding: 22,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowRadius: 10,
    justifyContent: 'space-between',
  },

  header: {
    marginBottom: 12,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },

  livePulse: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 12,
  },

  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },

  pulseText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#065F46',
    letterSpacing: 0.4,
  },

  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 10,
  },

  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 2,
    gap: 2,
  },

  filterBtn: {
    flex: 1,
    paddingVertical: 4,
    alignItems: 'center',
    borderRadius: 6,
  },

  filterBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },

  filterText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748B',
  },

  filterTextActive: {
    color: '#0B5CAD',
    fontWeight: '700',
  },

  listScrollView: {
    flex: 1,
  },

  list: {
    gap: 10,
    paddingVertical: 2,
  },

  activity: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },

  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
    gap: 6,
  },

  titleWithBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
  },

  activityTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F172A',
  },

  badge: {
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },

  badgeSuccess: {
    backgroundColor: '#DCFCE7',
  },

  badgeAlert: {
    backgroundColor: '#FEE2E2',
  },

  badgeWarning: {
    backgroundColor: '#FEF3C7',
  },

  badgeInfo: {
    backgroundColor: '#E0F2FE',
  },

  badgeText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.3,
  },

  badgeTextSuccess: {
    color: '#15803D',
  },

  badgeTextAlert: {
    color: '#B91C1C',
  },

  badgeTextWarning: {
    color: '#B45309',
  },

  badgeTextInfo: {
    color: '#0369A1',
  },

  time: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.3,
  },

  description: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    lineHeight: 15,
  },

  emptyContainer: {
    paddingVertical: 30,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});