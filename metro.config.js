// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);

// add .tflite to asset extensions
config.resolver.assetExts.push('tflite');

module.exports = config;
