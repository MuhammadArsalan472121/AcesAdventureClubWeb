import React from 'react';
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';

/**
 * AdventureBearMascot
 *
 * Displays the Aces Adventure Club teddy bear mascot using:
 *   "Adventure Club Teddy Bear.png"
 *
 * The bear sits centered on the top edge of the login card with the
 * bottom portion (paws) overlapping the card slightly via a negative
 * marginBottom on the wrapper in LoginScreen.
 *
 * Props (kept for API compatibility with LoginScreen):
 *   isPasswordVisible {boolean} - drives the password-cover hint text
 *   isLookingDown     {boolean} - reserved for future animation
 */
export default function AdventureBearMascot({
  isPasswordVisible = false,
  isLookingDown = false,
}) {
  const { width } = useWindowDimensions();
  const isWide = width >= 860; // matches LoginScreen breakpoint

  // Desktop: 120–150 px range → 135 px; Mobile: 90–110 px range → 100 px
  const mascotHeight = isWide ? 135 : 100;

  return (
    <View style={styles.mascotContainer} pointerEvents="none">
      <Image
        source={require('../../assets/Adventure Club Teddy Bear.png')}
        style={[styles.mascotImage, { height: mascotHeight }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mascotContainer: {
    // Centre above the card; negative margin makes paws overlap card top edge
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    zIndex: 20,
  },
  mascotImage: {
    // Let height drive the size; width scales proportionally
    width: undefined,
    aspectRatio: 1,          // teddy bear PNG is roughly square
    // Cap so it never overflows on ultra-wide screens
    maxWidth: 160,
  },
});
