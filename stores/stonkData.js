const request = require('request')

const getStonkPrices = async ({ tickers }) => {
  const tickerPromises = tickers.map(({ ticker }) => {
    const requestOptions = {
      url: `https://api.tiingo.com/tiingo/daily/${ticker}/prices`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token 14e269bd43688dbf9198e7d5f3f161ede1d02530',
      },
    }
    return new Promise((resolve, reject) => {
      request(requestOptions, function (error, response, body) {
        const data = JSON.parse(body)
        return resolve({ ticker, price: data[0].close })
      })
    })
  })
  return await Promise.all(tickerPromises)
}

exports.getStonkPrices = getStonkPrices
