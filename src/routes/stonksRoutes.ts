import { Router } from 'express'
import { asyncHandler } from '../utils/asyncHandler'
import { protectedRoute } from '../middleware/protectedRoute'
import { getStonkPrices } from '../stores/externalStonkData'
import { getStonksByUsername, upsertStonk } from '../stores/internalStonkData'

const router = Router()

router.get(
  '/',
  protectedRoute,
  asyncHandler(async (req, res) => {
    const username = req.user.username

    const stonks = await getStonksByUsername({ username })
    // dont get the prices if the length of stonks is empty
    // use ternary
    const prices = await getStonkPrices({ tickers: stonks })
    // TODO: handle errors
    res.json({
      stonks: prices,
      success: true,
    })
  }),
)
router.post(
  '/',
  protectedRoute,
  asyncHandler(async (req, res) => {
    // console.log('req.body', req.body)
    const ticker = req.body.ticker
    const username = req.user.username
    const dd = ''
    const errors = []
    // console.log(ticker, 'ticker')
    if (!ticker || ticker === '') {
      errors.push('cant leave ticker blank')
      console.log('errors', errors)
    }
    if (errors.length) {
      return res.json({ errors })
      // have to have a return statement for the render if there is another render
      // conditional statements need return if you want control flow to end
    }
    await upsertStonk({ username, ticker, dd })
    const stonks = await getStonksByUsername({ username })
    const prices = await getStonkPrices({ tickers: stonks })
    res.json({ stonks: prices })
  }),
)
// app.get(
//   '/stonks/:ticker',
//   asyncHandler(async (req, res) => {
//     const ticker = req.params.ticker
//     const username = req.user.username
//     const stonkData = await getStonkData({ ticker })
//     const stonk = await getStonk({ ticker, username })
//     const converter = new showdown.Converter()
//     const dd = converter.makeHtml(stonk.dd)
//     res.render('stonk', { req, stonkData, stonk, dd })
//   }),
// )
// app.get(
//   '/stonks/:ticker/upsert',
//   asyncHandler(async (req, res) => {
//     const ticker = req.params.ticker
//     const username = req.user.username
//     const stonk = await getStonk({ ticker, username })
//     res.render('stonkDDedit', { stonk })
//   }),
// )

export default router
