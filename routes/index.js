const router = require('express').Router()
const helpers = require('utils/helpers')

router.get('/', (_, res) => {
  res.render('./index', {
    asset: helpers.asset,
  })
})

module.exports = router
