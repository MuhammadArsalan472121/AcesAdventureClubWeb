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


const heroImage = require('../../assets/guide1.jpg');

export default function SignupScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isWide = width >= 768;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleCreateAccount = () => {
    if (!agreed) {
      console.log('Please agree to Terms and Conditions');
      return;
    }
    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }
    // TODO: hook up to your auth/signup logic
    console.log('Create account', { fullName, email, password });
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
              <Text style={styles.heroQuote}>
                "The peaks are calling, and they recognize only those who dare to ascend."
              </Text>
              <View style={styles.heroDivider} />
              <Text style={styles.heroCaption}>EXPEDITION ALPHA • 2024</Text>
            </View>
          )}
        </View>

        {/* RIGHT / BOTTOM - Form panel */}
        <View style={[styles.formOuter, isWide ? styles.formOuterWide : styles.formOuterNarrow]}>
          <View style={styles.card}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>JOIN THE COMMUNITY 🏔</Text>
            </View>

            <Text style={styles.title}>Create Your Explorer Account</Text>
            <Text style={styles.subtitle}>
              Create your account and begin discovering breathtaking destinations and unforgettable adventures.
            </Text>

            <View style={isWide ? styles.fieldRow : null}>
              <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                <Text style={styles.fieldLabel}>FULL NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Johnathan Doe"
                  placeholderTextColor="#7f93a6"
                  value={fullName}
                  onChangeText={setFullName}
                />
              </View>
              <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                <Text style={styles.fieldLabel}>EMAIL ADDRESS</Text>
                <TextInput
                  style={styles.input}
                  placeholder="explorer@club.com"
                  placeholderTextColor="#7f93a6"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <View style={isWide ? styles.fieldRow : null}>
              <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                <Text style={styles.fieldLabel}>PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  placeholder="********"
                  placeholderTextColor="#7f93a6"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>
              <View style={isWide ? styles.fieldHalf : styles.fieldFull}>
                <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  placeholder="********"
                  placeholderTextColor="#7f93a6"
                  secureTextEntry
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAgreed(!agreed)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
                {agreed && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                I agree to the <Text style={styles.link}>Terms and Conditions</Text> and the{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.primaryButton} onPress={handleCreateAccount}>
              <Text style={styles.primaryButtonText}>Create Account</Text>
            </TouchableOpacity>

            <View style={styles.bottomRow}>
              <Text style={styles.bottomText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
                <Text style={styles.link}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>

          {isWide && (
            <View style={styles.footerLinks}>
              <Text style={styles.footerText}>PRIVACY POLICY</Text>
              <Text style={styles.footerText}>EXPEDITION SUPPORT</Text>
              <Text style={styles.footerText}>LEGAL</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const CARD_BG = '#2b4a66';
const INPUT_BG = '#132436';
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
    backgroundColor: 'rgba(6,16,26,0.35)',
  },
  heroTextWrap: {
    padding: 40,
  },
  heroQuote: {
    fontSize: 16,
    fontStyle: 'italic',
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
    color: '#fff',
    maxWidth: 420,
    marginBottom: 14,
  },
  heroDivider: {
    width: 40,
    height: 1,
    backgroundColor: '#fff',
    marginBottom: 14,
  },
  heroCaption: {
    color: GOLD,
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '700',
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
    maxWidth: 480,
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
    fontSize: 24,
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif', default: 'serif' }),
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 13,
    color: '#c7d5e0',
    textAlign: 'center',
    marginBottom: 26,
    lineHeight: 19,
  },
  fieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldHalf: {
    width: '48%',
    marginBottom: 16,
  },
  fieldFull: {
    width: '100%',
    marginBottom: 16,
  },
  fieldLabel: {
    color: '#9fb3c8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: INPUT_BG,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: '#fff',
    fontSize: 14,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    marginBottom: 22,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#c7d5e0',
    marginRight: 10,
    marginTop: 2,
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
  termsText: {
    flex: 1,
    color: '#c7d5e0',
    fontSize: 12.5,
    lineHeight: 18,
  },
  link: {
    color: GOLD,
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
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    gap: 24,
  },
  footerText: {
    color: '#9fb3c8',
    fontSize: 11,
    letterSpacing: 0.5,
  },
});