module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    // other plugins you may have …
    'react-native-worklets-core/plugin',   // register the Worklets runtime
    'react-native-reanimated/plugin'       // MUST be last
  ],
};
