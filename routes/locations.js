const router = require('express').Router()
const testingCentersApi = require('api/testing-centers')
const requireLocation = require('middleware/require-location')
const MessageSender = require('utils/message-sender')

const UNDER_DEVELOPMENT =
  "Hey, we're still trying to fix this one for you to have a better user experience. Stay tuned!"

router.get('/:type', requireLocation, async (req, res) => {
  const { userId, lastLocation } = res

  switch (req.params.type) {
    case 'TESTING_CENTERS':
      // TODO: Extract this one as it is just a copy paste from the webhook routes.
      const testingCenters = testingCentersApi.nearest({
        latitude: lastLocation.latitude,
        longitude: lastLocation.longitude,
      })

      const distanceIcon = (i) => {
        if (i === 0) return '🚕'
        if (i === 1) return '🚌'
        if (i === 2) return '🚆'
        else return '🚀'
      }

      new MessageSender(userId)
        .setMessage({
          text:
            'Nearest Testing Centers: \n\n' +
            `${testingCenters
              .map(
                (testingCenter, i) =>
                  `${i + 1}. ${testingCenter.name}\n` +
                  `${distanceIcon(i)} ${testingCenter.distance} Kilometers away \n` +
                  `${testingCenter.verified ? '✅ Verified by WHO \n\n' : ''}`
              )
              .join('')}`,
          quick_replies: [
            {
              content_type: 'text',
              title: 'Thank you!',
              payload: 'TY',
            },
          ],
        })
        .send()
      break

    default:
      new MessageSender(userId).setMessage({ text: UNDER_DEVELOPMENT }).send()
      break
  }
})

module.exports = router
