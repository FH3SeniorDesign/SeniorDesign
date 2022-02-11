module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // Reference: https://callstack.github.io/react-native-testing-library/docs/getting-started/#additional-jest-matchers
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],
  // Reference: https://github.com/facebook/jest/issues/2663#issuecomment-341384494
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'identity-obj-proxy',
  },
  // Reference: https://www.valentinog.com/blog/jest-coverage
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  // Reference: https://github.com/facebook/react-native/issues/31190
  transformIgnorePatterns: ['node_modules/(?!(@react-native|react-native.*)/)'],
};
