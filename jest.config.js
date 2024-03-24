/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 960000,
  moduleFileExtensions: ['js', 'ts', 'json'],
  // setupFiles: ['<rootDir>/tests/setup-tests.ts'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
};
