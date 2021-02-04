let mockFileJson = '{}'

module.exports = {
  writeFile: jest.fn((filePath, data, encoding, cb) => {
    console.log('writeFile is called')
    mockFileJson = data
    cb(null)
  }),
  readFile: jest.fn((filePath, encoding, cb) => cb(mockFileJson)),
  reset: () => {
    mockFileJson = '{}'
  },
}
