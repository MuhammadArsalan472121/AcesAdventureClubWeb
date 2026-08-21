import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const heroImage = require('../../assets/hero.jpg');

export default function LoginScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    // TODO: hook up to your auth logic
    console.log('Sign in with', email, password, rememberMe);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.page,
          isWide ? styles.pageRow : styles.pageColumn,
        ]}
      >
        {/* LEFT / TOP - Hero image panel */}
        <View
          style={[
            styles.heroPanel,
            isWide ? styles.heroPanelWide : styles.heroPanelNarrow,
          ]}
        >
          <Image source={heroImage} style={StyleSheet.absoluteFill} resizeMode="cover" />
          <View style={styles.heroOverlay} />
          {isWide && (
            <View style={styles.heroTextWrap}>
              <Text style={styles.heroTitle}>The peak of{'\n'}luxury is just{'\n'}ahead.</Text>
              <Text style={styles.heroSubtitle}>
                Join an exclusive circle of modern explorers discovering the world's most remote wonders in unparalleled comfort.
              </Text>
            </View>
          )}
        </View>

        {/* RIGHT / BOTTOM - Form panel */}
        <View style={[styles.formOuter, isWide ? styles.formOuterWide : styles.formOuterNarrow]}>
          <View style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>WELCOME BACK 👋</Text>
            </View>

            <Text style={styles.title}>Continue Your Adventure</Text>
            <Text style={styles.subtitle}>
              Sign in to explore destinations, manage your profile, and continue your adventure journey.
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#9fb3c8"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9fb3c8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <View style={styles.rowBetween}>
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Text style={styles.checkmark}>✓</Text>}
                </View>
                <Text style={styles.checkboxLabel}>Remember Me</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation?.navigate('ForgotPassword')}>
                <Text style={styles.link}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSignIn}>
              <Text style={styles.primaryButtonText}>Sign In</Text>
            </TouchableOpacity>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate('Signup')}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const CARD_BG = '#2b4a66';
const INPUT_BG = '#25405a';
const GOLD = '#d4af6a';

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  pageRow: {
    flexDirection: 'row',
    minHeight: '100%',
  },
  pageColumn: {
    flexDirection: 'column',
  },
  heroPanel: {
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroPanelWide: {
    width: '50%',
    minHeight: 700,
  },
  heroPanelNarrow: {
    width: '100%',
    height: 220,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10,30,20,0.25)',
  },
  heroTextWrap: {
    padding: 40,
  },
  heroTitle: {
    fontSize: 40,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
    color: '#fff',
    lineHeight: 46,
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#eef2f0',
    maxWidth: 420,
  },
  formOuter: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  formOuterWide: {
    width: '50%',
  },
  formOuterNarrow: {
    width: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: CARD_BG,
    borderRadius: 20,
    padding: 32,
  },
  badge: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  badgeText: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  title: {
    fontSize: 26,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#c7d5e0',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 19,
  },
  input: {
    backgroundColor: INPUT_BG,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 14,
    marginBottom: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#c7d5e0',
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: GOLD,
    borderColor: GOLD,
  },
  checkmark: {
    fontSize: 11,
    color: '#1f3347',
    fontWeight: '700',
  },
  checkboxLabel: {
    color: '#e6edf2',
    fontSize: 13,
  },
  link: {
    color: GOLD,
    fontSize: 13,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#1f3347',
    fontWeight: '700',
    fontSize: 15,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    color: '#c7d5e0',
    fontSize: 13,
  },
});