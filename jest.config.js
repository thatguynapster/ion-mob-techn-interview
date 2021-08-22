module.exports = {
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/__tests__/**', '!**/.next/**', '!**/build/**', '!**/node_modules/**', '!**/out/**', '!**/coverage/**', '!**/components/**', '!**/configs/**', '!**/types/**', '!**/lib/**', '!**/providers/**', '!**/reducers/**'],
  setupFiles: ['<rootDir>/setup.ts', 'dotenv/config'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testPathIgnorePatterns: ['/.next/', '/build/', '/node_modules/', '/coverage/', '/out/',],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
    //'^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy', '\\.(css|less)$': '<rootDir>/__tests__/styleMock.js'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules', 'src']
}
