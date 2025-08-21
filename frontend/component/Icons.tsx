// components/Icons.tsx
import React from "react";
import Svg, { Path } from "react-native-svg";

/** Google 'G' 아이콘 (컬러) */
export const GoogleIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48">
    {/* 아래 path 데이터는 일반적으로 쓰이는 Google 'G' 마크 벡터입니다 */}
    <Path
      fill="#EA4335"
      d="M24 9.5c3.59 0 6.26 1.56 7.7 2.86l5.21-5.2C33.6 3.02 29.15 1 24 1 14.96 1 7.1 6.2 3.65 13.9l6.97 5.42C12.24 13.91 17.6 9.5 24 9.5z"
    />
    <Path
      fill="#34A853"
      d="M46.5 24.5c0-1.56-.14-2.7-.44-3.88H24v7.37h12.7c-.26 1.73-1.7 4.35-4.9 6.1l7.55 5.83C43.99 36.05 46.5 30.82 46.5 24.5z"
    />
    <Path
      fill="#FBBC05"
      d="M10.62 28.76a14.3 14.3 0 0 1 0-9.02l-6.97-5.42C1.2 17.93 1.2 31.07 3.65 35.68l6.97-5.42z"
    />
    <Path
      fill="#4285F4"
      d="M24 47c6.12 0 11.27-2 15.03-5.41l-7.55-5.83c-2.12 1.28-4.85 2.05-7.48 2.05-6.41 0-11.76-4.32-13.33-10.03l-7.02 5.4C7.12 42.63 14.97 47 24 47z"
    />
  </Svg>
);

/** Kakao 말풍선 아이콘 (버튼 배경이 #FEE500이므로 말풍선만 다크브라운) */
export const KakaoIcon = ({ size = 24 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      fill="#3C1E1E"
      d="M12 3C6.48 3 2 6.63 2 11.06c0 2.78 1.8 5.23 4.58 6.64L6 22l5.28-3.1c.23.02.47.03.72.03 5.52 0 10-3.63 10-8.07S17.52 3 12 3z"
    />
  </Svg>
);