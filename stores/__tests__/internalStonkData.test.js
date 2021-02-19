const { _reset } = require('fs')
const {
  getStonksByUsername,
  saveStonk,
  getStonk,
  upsertDD,
  addNotification,
} = require('../internalStonkData')
jest.mock('fs')

describe('the internal stonks module', () => {
  beforeEach(() => {
    _reset('[]')
  })
  it('gets all stonks by username', async () => {
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
  it('gets a single stonk by username and ticker', async () => {
    await saveStonk({ username: 'notRando', ticker: 'GME' })
    await saveStonk({ username: 'notRando', ticker: 'AMC' })
    const stonk = await getStonk({ username: 'notRando', ticker: 'GME' })
    expect(stonk).toEqual({ username: 'notRando', ticker: 'GME' })
  })
  it('updates the dd for the stonk', async () => {
    await saveStonk({
      username: 'notRando',
      ticker: 'AMC',
      dd: '',
    })
    await upsertDD({
      username: 'notRando',
      ticker: 'AMC',
      dd: 'boom roasted',
    })
    const smoothbrain = await getStonk({ username: 'notRando', ticker: 'AMC' })
    expect(smoothbrain).toEqual({
      username: 'notRando',
      ticker: 'AMC',
      dd: 'boom roasted',
    })
  })
  it.only('adds a notification array to the stonk', async () => {
    await saveStonk({ username: 'notRando', ticker: 'AMC' })
    await addNotification({
      username: 'notRando',
      ticker: 'AMC',
      notification: {},
    })
    const autist = await getStonk({ username: 'notRando', ticker: 'AMC' })
    console.log(`autist`, autist)
    expect(autist).toEqual({
      username: 'notRando',
      ticker: 'AMC',
      notification: {
        conditionType: 'gte',
        price: 213,
        notificationType: 'txt',
      },
    })
  })
})
