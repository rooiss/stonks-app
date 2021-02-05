const { _reset } = require('fs')
const { getStonksByUsername, saveStonk } = require('../stonks')
jest.mock('fs')

describe('the stonks module', () => {
  beforeEach(() => {
    _reset('[]')
  })
  it('gets all stonks by susername', async () => {
    const notRando = 'rooiss'
    const randoname = 'randotron'
    await saveStonk({ username: notRando, ticker: 'GME' })
    await saveStonk({ username: notRando, ticker: 'AMC' })
    await saveStonk({ username: notRando, ticker: 'BB' })
    await saveStonk({ username: randoname, ticker: 'BB' })
    const res = await getStonksByUsername({ username: notRando })

    expect(res).toEqual([
      { username: notRando, ticker: 'GME' },
      { username: notRando, ticker: 'AMC' },
      { username: notRando, ticker: 'BB' },
    ])
  })
})
