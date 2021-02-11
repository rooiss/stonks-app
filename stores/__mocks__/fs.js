let mockFileJson = '{}'

module.exports = {
  writeFile: jest.fn((filePath, data, encoding, cb) => {
    mockFileJson = data
    cb(null)
  }),
  readFile: jest.fn((filePath, encoding, cb) => cb(null, mockFileJson)),
  _reset: (content) => {
    mockFileJson = content
  },
  promises: {
    writeFile: jest.fn((filePath, data, encoding) => {
      mockFileJson = data
      return Promise.resolve(null)
    }),
    readFile: jest.fn((filePath, encoding) => Promise.resolve(mockFileJson)),
  },
}
