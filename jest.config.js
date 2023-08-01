module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  workerIdleMemoryLimit: '2GB',
  collectCoverage: true,
  coverageDirectory: '.coverage',
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
  ],
  coverageReporters: ['clover', 'json', 'lcov', 'text-summary'],
  reporters: [["jest-silent-reporter", { "useDots": true }], 'summary'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['./src/test-setup.ts'],
  moduleFileExtensions: ['ts', 'js', 'mjs', 'tsx', 'jsx', 'html'],
  testPathIgnorePatterns: ['<rootDir>/dist', '(.*)e2e', 'e2e', 'node_modules', 'coverage'],
  transform: {
    '^.+\\.(html?|css|svg|png|jpg)$': '<rootDir>/jest/transforms/fileTransform.js',
    '^.+\\.(tsx?|jsx?|mjs)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
  transformIgnorePatterns: [
    "node_modules.(?!@tvh.react-common|uuid|@hookform.resolvers|.*\\.css)"
  ],
  globalSetup: "<rootDir>/jest/global-setup.js",
};
