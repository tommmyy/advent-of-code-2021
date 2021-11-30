const ignorePatterns = ['/.cache/', '/.history/', '/.yarn/', '/node_modules/'];

module.exports = {
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testPathIgnorePatterns: ignorePatterns,
  coveragePathIgnorePatterns: ignorePatterns,
  transformIgnorePatterns: ['/node_modules/(?!(ramda)).+\\.js$'],
};
