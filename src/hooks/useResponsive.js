import { useWindowDimensions } from "react-native";

export default function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;
  const isDesktop = width >= 1024;
  const isLargeDesktop = width >= 1440;

  // Responsive max container width
  const contentMaxWidth = isLargeDesktop ? 1400 : isDesktop ? 1280 : 1000;
  const paddingHorizontal = isLargeDesktop ? 60 : isDesktop ? 40 : isTablet ? 28 : 16;

  // Typography scale helpers
  const heroTitleSize = isLargeDesktop ? 60 : isDesktop ? 52 : isTablet ? 42 : 34;
  const sectionTitleSize = isLargeDesktop ? 42 : isDesktop ? 36 : isTablet ? 30 : 26;
  const bodyFontSize = isDesktop ? 17 : 15;
  const bodyLineHeight = isDesktop ? 28 : 24;

  // Grid & Card layout helpers
  const cardImageHeight = isLargeDesktop ? 260 : isDesktop ? 230 : isTablet ? 200 : 180;
  const gridCardWidth = isLargeDesktop ? "31%" : isDesktop ? "31%" : isTablet ? "48%" : "100%";
  const gridColumns = isDesktop ? 3 : isTablet ? 2 : 1;

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    contentMaxWidth,
    paddingHorizontal,
    heroTitleSize,
    sectionTitleSize,
    bodyFontSize,
    bodyLineHeight,
    cardImageHeight,
    gridCardWidth,
    gridColumns,
  };
}
