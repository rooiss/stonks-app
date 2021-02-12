jest.mock('request')
const { getStonkPrices } = require('../externalStonkData')
const request = require('request')

describe('the stonkdata module', () => {
  describe('getStonkPrices', () => {
    it.only('returns an array of objects with a ticker and a price', async () => {
      const mockValue = JSON.stringify([{ close: '213' }])
      request.mockImplementation((options, cb) => {
        cb(null, null, mockValue)
      })
      const stonks = [{ ticker: 'GME' }, { ticker: 'BB' }]
      const dollas = await getStonkPrices({ tickers: stonks })
      expect(dollas).toEqual([
        { ticker: 'GME', price: '213' },
        { ticker: 'BB', price: '213' },
      ])
    })
  })
})
