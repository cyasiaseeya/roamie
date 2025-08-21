// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  const { assetExts, sourceExts } = config.resolver;

  return withNativeWind(
    {
      ...config,
      transformer: {
        ...config.transformer,
        // SVG를 리액트 컴포넌트처럼 import
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
      },
      resolver: {
        ...config.resolver,
        assetExts: assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...sourceExts, "svg"],
      },
    },
    { input: "./app/globals.css" } // NativeWind
  );
})();
