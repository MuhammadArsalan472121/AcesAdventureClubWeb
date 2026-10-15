import React, { useState, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useData } from '../context/DataContext';

type ViewMode = '7days' | 'thisMonth' | 'months';

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

export default function MonthlyVisitors() {
  const { users = [], inquiries = [] } = useData();
  const [viewMode, setViewMode] = useState<ViewMode>('7days');
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);

  // Generate chart data based on real users & inquiries
  const chartData = useMemo(() => {
    const now = new Date();

    if (viewMode === '7days') {
      // 1. Last 7 Days (Daily breakdown showing Day name & date number)
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        d.setHours(0, 0, 0, 0);

        const dayName = d.toLocaleDateString('en-US', { weekday: 'short' }); // e.g. Mon, Tue, Wed
        const dayNum = d.getDate(); // 15
        const monthShort = d.toLocaleDateString('en-US', { month: 'short' });
        const isToday = i === 0;

        let userCount = 0;
        let inquiryCount = 0;
        const memberNames: string[] = [];

        users.forEach((u: any) => {
          const ud = parseItemDate(u);
          if (
            ud &&
            ud.getFullYear() === d.getFullYear() &&
            ud.getMonth() === d.getMonth() &&
            ud.getDate() === d.getDate()
          ) {
            userCount += 1;
            if (u.name) memberNames.push(u.name);
          }
        });

        inquiries.forEach((inq: any) => {
          const id = parseItemDate(inq);
          if (
            id &&
            id.getFullYear() === d.getFullYear() &&
            id.getMonth() === d.getMonth() &&
            id.getDate() === d.getDate()
          ) {
            inquiryCount += 1;
          }
        });

        days.push({
          key: `day_${d.getTime()}`,
          dayLabel: dayName,
          dateLabel: `${dayNum} ${monthShort}`,
          dayNum,
          isToday,
          users: userCount,
          inquiries: inquiryCount,
          total: userCount + inquiryCount,
          memberNames,
          fullDateText: d.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          }),
        });
      }
      return days;
    }

    if (viewMode === 'thisMonth') {
      // 2. This Month (Days of the current month progression)
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const todayDate = now.getDate();
      const monthName = now.toLocaleDateString('en-US', { month: 'short' });

      // Build intervals or days of the current month up to today / 30
      const checkpoints = [1, 5, 10, 15, 20, 25, Math.max(todayDate, 28)];
      const uniquePoints = Array.from(new Set(checkpoints)).sort((a, b) => a - b);

      return uniquePoints.map((dayNum) => {
        const d = new Date(currentYear, currentMonth, dayNum);
        d.setHours(0, 0, 0, 0);

        let userCount = 0;
        let inquiryCount = 0;
        const memberNames: string[] = [];

        users.forEach((u: any) => {
          const ud = parseItemDate(u);
          if (
            ud &&
            ud.getFullYear() === currentYear &&
            ud.getMonth() === currentMonth &&
            Math.abs(ud.getDate() - dayNum) <= 2
          ) {
            userCount += 1;
            if (u.name && !memberNames.includes(u.name)) memberNames.push(u.name);
          }
        });

        inquiries.forEach((inq: any) => {
          const id = parseItemDate(inq);
          if (
            id &&
            id.getFullYear() === currentYear &&
            id.getMonth() === currentMonth &&
            Math.abs(id.getDate() - dayNum) <= 2
          ) {
            inquiryCount += 1;
          }
        });

        return {
          key: `mday_${dayNum}`,
          dayLabel: `Day ${dayNum}`,
          dateLabel: `${monthName} ${dayNum}`,
          dayNum,
          isToday: dayNum === todayDate,
          users: userCount,
          inquiries: inquiryCount,
          total: userCount + inquiryCount,
          memberNames,
          fullDateText: `${monthName} ${dayNum}, ${currentYear}`,
        };
      });
    }

    // 3. Last 6 Months view
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = d.toLocaleDateString('en-US', { month: 'short' });
      const year = d.getFullYear();

      let userCount = 0;
      let inquiryCount = 0;
      const memberNames: string[] = [];

      users.forEach((u: any) => {
        const ud = parseItemDate(u);
        if (
          ud &&
          ud.getFullYear() === year &&
          ud.getMonth() === d.getMonth()
        ) {
          userCount += 1;
          if (u.name) memberNames.push(u.name);
        }
      });

      inquiries.forEach((inq: any) => {
        const id = parseItemDate(inq);
        if (
          id &&
          id.getFullYear() === year &&
          id.getMonth() === d.getMonth()
        ) {
          inquiryCount += 1;
        }
      });

      months.push({
        key: `month_${monthLabel}_${year}`,
        dayLabel: monthLabel,
        dateLabel: `${year}`,
        dayNum: d.getMonth() + 1,
        isToday: i === 0,
        users: userCount,
        inquiries: inquiryCount,
        total: userCount + inquiryCount,
        memberNames,
        fullDateText: `${monthLabel} ${year}`,
      });
    }
    return months;
  }, [viewMode, users, inquiries]);

  // Calculate highest value for proportional bar scaling
  const maxVal = useMemo(() => {
    const highest = Math.max(...chartData.map((d) => d.total), 1);
    return highest;
  }, [chartData]);

  // Aggregate stats
  const totalVisitorsInRange = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.total, 0);
  }, [chartData]);

  const totalMembersInRange = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.users, 0);
  }, [chartData]);

  const activeDay = selectedBarIndex !== null && chartData[selectedBarIndex]
    ? chartData[selectedBarIndex]
    : chartData.find((d) => d.isToday) || chartData[chartData.length - 1];

  return (
    <View style={styles.card}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>Monthly Visitors & Explorers</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>Real Users Data</Text>
            </View>
          </View>

          <Text style={styles.subtitle}>
            Showing live registered club members ({users.length} total) & explorer website inquiries
          </Text>
        </View>

        {/* View Mode Pills */}
        <View style={styles.toggleRow}>
          <Pressable
            style={[
              styles.toggleBtn,
              viewMode === '7days' && styles.toggleBtnActive,
            ]}
            onPress={() => {
              setViewMode('7days');
              setSelectedBarIndex(null);
            }}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === '7days' && styles.toggleTextActive,
              ]}
            >
              📅 Last 7 Days
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.toggleBtn,
              viewMode === 'thisMonth' && styles.toggleBtnActive,
            ]}
            onPress={() => {
              setViewMode('thisMonth');
              setSelectedBarIndex(null);
            }}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === 'thisMonth' && styles.toggleTextActive,
              ]}
            >
              This Month (Days)
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.toggleBtn,
              viewMode === 'months' && styles.toggleBtnActive,
            ]}
            onPress={() => {
              setViewMode('months');
              setSelectedBarIndex(null);
            }}
          >
            <Text
              style={[
                styles.toggleText,
                viewMode === 'months' && styles.toggleTextActive,
              ]}
            >
              6 Months
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Summary KPI Strip */}
      <View style={styles.summaryBar}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>TOTAL ACTIVITY</Text>
          <Text style={styles.summaryVal}>
            {totalVisitorsInRange}{' '}
            <Text style={styles.summarySub}>({totalMembersInRange} Members + {totalVisitorsInRange - totalMembersInRange} Inquiries)</Text>
          </Text>
        </View>

        {activeDay && (
          <View style={styles.highlightPill}>
            <Text style={styles.highlightText}>
              <Text style={{ fontWeight: '800' }}>{activeDay.fullDateText}: </Text>
              {activeDay.total} Total ({activeDay.users} Members, {activeDay.inquiries} Inquiries)
              {activeDay.memberNames.length > 0
                ? ` • ${activeDay.memberNames.slice(0, 2).join(', ')}${activeDay.memberNames.length > 2 ? '...' : ''}`
                : ''}
            </Text>
          </View>
        )}
      </View>

      {/* Chart Canvas */}
      <View style={styles.chart}>
        {chartData.map((item, index) => {
          const isSelected = selectedBarIndex === index;
          const isCurrent = item.isToday;

          // Proportional bar height calculation (min 8px so day column is always interactive and anchored)
          const barHeight = Math.max(
            Math.round((item.total / maxVal) * 140),
            item.total > 0 ? 18 : 6
          );

          let barBgColor = '#93C5FD'; // Brand soft blue
          if (isSelected) {
            barBgColor = '#0369A1'; // Deep active blue
          } else if (isCurrent) {
            barBgColor = '#0B5CAD'; // Brand primary blue
          } else if (item.total === 0) {
            barBgColor = '#E2E8F0'; // Subtle gray for empty days
          }

          return (
            <Pressable
              key={item.key}
              style={[styles.barColumn, isSelected && styles.barColumnSelected]}
              onPress={() => setSelectedBarIndex(index)}
            >
              {/* Count on top of bar */}
              <View
                style={[
                  styles.countBadge,
                  isCurrent && styles.countBadgeToday,
                  item.total > 0 && styles.countBadgeActive,
                ]}
              >
                <Text
                  style={[
                    styles.countText,
                    isCurrent && styles.countTextToday,
                  ]}
                >
                  {item.total}
                </Text>
              </View>

              {/* Bar container */}
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: barBgColor,
                    },
                    isCurrent && styles.barCurrent,
                  ]}
                />
              </View>

              {/* Day / Date labels */}
              <View style={styles.labelGroup}>
                <Text
                  style={[
                    styles.dayLabel,
                    isCurrent && styles.dayLabelToday,
                    isSelected && styles.dayLabelSelected,
                  ]}
                >
                  {item.dayLabel}
                </Text>

                <Text
                  style={[
                    styles.dateLabel,
                    isCurrent && styles.dateLabelToday,
                  ]}
                >
                  {item.dateLabel}
                </Text>

                {isCurrent && (
                  <View style={styles.todayPill}>
                    <Text style={styles.todayPillText}>TODAY</Text>
                  </View>
                )}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 480,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: 12,
  },

  titleContainer: {
    flex: 1,
    minWidth: 260,
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

  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
  },

  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#065F46',
    letterSpacing: 0.3,
  },

  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },

  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 3,
    gap: 2,
  },

  toggleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },

  toggleBtnActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },

  toggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },

  toggleTextActive: {
    color: '#0B5CAD',
    fontWeight: '700',
  },

  summaryBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    flexWrap: 'wrap',
    gap: 8,
  },

  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  summaryLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },

  summaryVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0B5CAD',
  },

  summarySub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },

  highlightPill: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },

  highlightText: {
    fontSize: 11,
    color: '#1E40AF',
  },

  chart: {
    height: 215,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingBottom: 2,
  },

  barColumn: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 4,
  },

  barColumnSelected: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },

  countBadge: {
    marginBottom: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
  },

  countBadgeActive: {
    backgroundColor: '#E0F2FE',
  },

  countBadgeToday: {
    backgroundColor: '#0B5CAD',
  },

  countText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
  },

  countTextToday: {
    color: '#FFFFFF',
  },

  barTrack: {
    height: 145,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },

  bar: {
    width: 38,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  barCurrent: {
    shadowColor: '#0B5CAD',
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },

  labelGroup: {
    alignItems: 'center',
    marginTop: 8,
    minHeight: 40,
  },

  dayLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },

  dayLabelToday: {
    color: '#0B5CAD',
    fontWeight: '800',
  },

  dayLabelSelected: {
    color: '#0369A1',
  },

  dateLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 1,
  },

  dateLabelToday: {
    color: '#0284C7',
    fontWeight: '700',
  },

  todayPill: {
    backgroundColor: '#0B5CAD',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 1,
    marginTop: 2,
  },

  todayPillText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.4,
  },
});