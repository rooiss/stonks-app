module.exports = {
  collectCoverageFrom: [
    'stores/**/*.{js,jsx}',
    'middleware/**/*.{js,jsx}',
    'utils/**/*.{js,jsx}',
    'server.js',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  coverageDirectory: 'coverage',
  collectCoverage: true,
}
