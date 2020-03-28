const router = require('express').Router()
const messagesApi = require('api/messages')
const sendApi = require('api/send')
const testingCentersApi = require('api/testing-centers')

const requireLocation = require('middleware/require-location')

router.get('/:type', requireLocation, async (req, res) => {
  const { userId, lastLocation } = res

  switch (req.params.type) {
    case 'TESTING_CENTERS':
      const testingCenters = testingCentersApi.nearest({
        latitude: lastLocation.latitude,
        longitude: lastLocation.longitude,
      })

      sendApi.sendMessage(userId, messagesApi.nearestTestingCentersMessage(testingCenters))
      break

    default:
      sendApi.sendMessage(userId, messagesApi.underDevelopmentMessage())
      break
  }
})

module.exports = router
