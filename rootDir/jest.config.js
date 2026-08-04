/** @type {import("jest").Config} **/
export default {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  testPathIgnorePatterns: [`<rootDir>/dist/`],
};
