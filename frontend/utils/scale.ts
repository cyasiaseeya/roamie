import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 피그마 기준
export const DESIGN_WIDTH = 360;
export const DESIGN_HEIGHT = 800;

/**
 * 큰 화면에서 "과확대" 되지 않도록
 * 기준 폭/높이를 cap(최대 360x800)으로 고정
 */
const CAPPED_WIDTH = Math.min(SCREEN_WIDTH, DESIGN_WIDTH);
const CAPPED_HEIGHT = Math.min(SCREEN_HEIGHT, DESIGN_HEIGHT);

export function scaleW(size: number) {
  return (CAPPED_WIDTH / DESIGN_WIDTH) * size;
}

export function scaleH(size: number) {
  return (CAPPED_HEIGHT / DESIGN_HEIGHT) * size;
}

/**
 * 폰트는 너무 커지면 어색하니 적당히 완화
 * (기본은 가로 기준, 0.5~0.7 사이 취향대로)
 */


export function font(size: number, factor = 0.6) {
  const scaled = size + (scaleW(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
}

/*
export function scaleFont(size: number, factor = 0.6) {
  const scaled = size + (scaleW(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(scaled));
}*/