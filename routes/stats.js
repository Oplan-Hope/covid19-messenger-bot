const router = require('express').Router()
const messagesApi = require('api/messages')
const sendApi = require('api/send')
const statsApi = require('api/stats')
const withProfile = require('middleware/with-profile')
const subscribe = require('utils/subscribe')

router.get('/:region', withProfile, async (req, res) => {
  const { profile } = res
  const { region } = req.params
  const worldwide = region === 'WORLD'
  const stats = worldwide ? await statsApi.worldTotal() : await statsApi.casesByRegion(region)
  const userId = profile.id

  sendApi.sendMessage(userId, messagesApi.statisticsMessage(stats, worldwide, profile))

  // Subscribe the user to real-time notifications.
  subscribe(profile)
})

module.exports = router
