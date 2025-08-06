const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const config = mergeConfig(getDefaultConfig(__dirname), {
  // Optional custom config here
});

module.exports = config;
