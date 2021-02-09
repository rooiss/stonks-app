const { getStonkPrices } = require('../stonkData')

describe('the stonkdata module', () => {
  describe('getStonkPrices', () => {
    it('returns an array of objects with a ticker and a price', async () => {
      const stonks = [{ ticker: 'GME' }, { ticker: 'BB' }]
      await getStonkPrices({ tickers: stonks })
    })
  })
})
