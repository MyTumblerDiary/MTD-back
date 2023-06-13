module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
  },
  coveragePathIgnorePatterns: ['/dist/', '/test/*/'],
  testPathIgnorePatterns: ['/dist/'],
};
