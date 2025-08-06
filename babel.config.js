module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      '@babel/plugin-transform-private-methods',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    [
      '@babel/plugin-proposal-private-property-in-object',
      {
        loose: true,
      },
    ],
  ],
};

