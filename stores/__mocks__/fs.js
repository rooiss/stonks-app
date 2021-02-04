let mockFileJson = '{}'

module.exports = {
  writeFile: jest.fn((filePath, data, encoding, cb) => {
    mockFileJson = data
    cb(null)
  }),
  readFile: jest.fn((filePath, encoding, cb) => cb(null, mockFileJson)),
  reset: () => {
    mockFileJson = '{}'
  },
}
