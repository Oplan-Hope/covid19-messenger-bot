const router = require('express').Router()
const helpers = require('utils/helpers')

router.get('/', (_, res) => {
  res.render('./index', {
    fbAppId: process.env.FB_APP_ID,
    appUrl: process.env.APP_URL,
    asset: helpers.asset,
  })
})

module.exports = router
