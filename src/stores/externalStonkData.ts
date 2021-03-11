import * as request from 'request'

export const getStonkPrices = async ({ tickers }) => {
  const tickerPromises = tickers.map(({ ticker }) => {
    console.log(
      `=========== Tiingo token ? ${
        process.env.TIINGO_TOKEN ? 'yes' : 'no'
      } =============`,
    )
    const requestOptions = {
      url: `https://api.tiingo.com/tiingo/daily/${ticker}/prices`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${process.env.TIINGO_TOKEN}`,
      },
    }
    return new Promise((resolve, reject) => {
      request(requestOptions, function (error, response, body) {
        const data = JSON.parse(body)
        if (data.length && data[0].close) {
          return resolve({ ticker, price: data[0].close })
        }
        console.error(
          'externalStonkData: data from Tiingo was not in expected format',
          data,
          response.statusCode,
        )
        reject(
          new Error(
            'externalStonkData: data from Tiingo was not in expected format',
          ),
        )
      })
    })
  })
  return await Promise.all(tickerPromises)
}

export const getStonkData = async ({ ticker }) => {
  const requestOptions = {
    url: `https://api.tiingo.com/tiingo/daily/${ticker}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.TIINGO_TOKEN}`,
    },
  }
  return new Promise((resolve, reject) => {
    request(requestOptions, (error, response, body) => {
      const data = JSON.parse(body)
      return resolve({ data })
    })
  })
}
