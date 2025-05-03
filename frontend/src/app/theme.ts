// カラーテーマの設定ファイル
// デザイン仕様書のカラースキームに基づく

export const colorTheme = {
  // メインカラー
  white: '#FFFFFF',
  lightGrey: '#F5F7FA',
  darkBlue: '#2C3E50',
  
  // アクセントカラー
  skyBlue: '#3498DB',
  mintGreen: '#2ECC71',
  softCoral: '#E74C3C',
  amber: '#F39C12',
  
  // 投稿タイプカラー
  problem: '#9B59B6',
  solution: '#27AE60',
  verification: '#2980B9',
  ethics: '#D35400',
  problemSplit: '#16A085',
  supplement: '#8E44AD',
  summary: '#34495E',
  translation: '#1ABC9C',
  estimation: '#F1C40F',
  logicalText: '#2C3E50',
  
  // ダークモードカラー
  darkBackground: '#222831',
  darkElement: '#393E46',
  darkText: '#EEEEEE',
  darkAccent: '#5DADE2',
};

// セマンティックカラー定義（用途別の色）
export const semanticColors = {
  // 基本色
  background: {
    light: colorTheme.white,
    dark: colorTheme.darkBackground,
  },
  foreground: {
    light: colorTheme.darkBlue,
    dark: colorTheme.darkText,
  },
  
  // UI要素
  primary: colorTheme.skyBlue,
  secondary: colorTheme.darkBlue,
  success: colorTheme.mintGreen,
  danger: colorTheme.softCoral,
  warning: colorTheme.amber,
  info: colorTheme.skyBlue,
  
  // 投稿タイプマッピング
  postTypes: {
    problem: colorTheme.problem,
    solution: colorTheme.solution,
    supplement: colorTheme.supplement,
    verification: colorTheme.verification,
    ethics: colorTheme.ethics,
    problemSplit: colorTheme.problemSplit,
    summary: colorTheme.summary,
    translation: colorTheme.translation,
    estimation: colorTheme.estimation,
    logicalText: colorTheme.logicalText,
  },
};

// アニメーション定義
export const animations = {
  durations: {
    fast: '200ms',
    normal: '300ms',
    slow: '500ms',
  },
  easings: {
    standard: 'ease-out',
    emphasized: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    listItem: 'ease-in-out',
  },
};

// 影の定義
export const shadows = {
  light: '0 1px 4px rgba(0, 0, 0, 0.05)',
  medium: '0 2px 8px rgba(0, 0, 0, 0.1)',
  heavy: '0 4px 12px rgba(0, 0, 0, 0.15)',
};

// 角丸の定義
export const radius = {
  sm: '4px',
  md: '8px',
  lg: '16px',
};

// スペーシングの定義
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

// レスポンシブブレイクポイント
export const breakpoints = {
  mobile: '375px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};

// デフォルトテーマオブジェクト
export const theme = {
  colors: semanticColors,
  radius,
  shadows,
  spacing,
  animations,
  breakpoints,
};

export default theme;