const router = require('express').Router()
const messagesApi = require('api/messages')
const sendApi = require('api/send')
const statsApi = require('api/stats')
const usersApi = require('api/users')
const withProfile = require('middleware/with-profile')

router.get('/:region', withProfile, async (req, res) => {
  const { profile } = res
  const { region } = req.params
  const worldwide = region === 'WORLD'
  const stats = worldwide ? await statsApi.worldTotal() : await statsApi.casesByRegion(region)
  const userId = profile.id

  sendApi.sendMessage(userId, messagesApi.statisticsMessage(stats, worldwide, profile))

  // ! This is an expensive operation, we should have made it in Get Started section, but we didn't.
  // We will check if we already have the user's Profile information,
  // store it if none was found.
  usersApi.find(userId).catch(() => {
    usersApi
      .store({
        userId,
        name: `${profile.first_name} ${profile.last_name}`,
        recieveNotificationsAt: true,
      })
      .then(() => {
        sendApi.sendRealtimeUpdatesMessage(userId)
      })
      .catch(console.log)
  })
})

module.exports = router
