const router = require('express').Router()
const messagesApi = require('api/messages')
const sendApi = require('api/send')
const statsApi = require('api/stats')
const withProfile = require('middleware/with-profile')

router.get('/:region', withProfile, async (req, res) => {
  const { profile } = res
  const { region } = req.params
  const worldwide = region === 'WORLD'
  const stats = worldwide ? await statsApi.worldTotal() : await statsApi.casesByRegion(region)

  sendApi.sendMessage(profile.id, messagesApi.statisticsMessage(stats, worldwide, profile))
})

module.exports = router
