const router = require('express').Router()
const MessageSender = require('utils/message-sender')
const userLocationApi = require('api/user-location')
const testingCentersApi = require('api/testing-centers')

const SETUP_LOCATION_GUIDE = 'https://www.facebook.com/help/messenger-app/583011145134913'
const UNDER_DEVELOPMENT =
  "Hey, we're still trying to fix this one for you to have a better user experience. Stay tuned!"

router.get('/:type', async (req, res) => {
  const userId = req.query.userId
  const lastLocation = await userLocationApi.latest(userId)

  new MessageSender(userId).setAction('typing_on').send()

  if (!userId) {
    return res.status(401).send('PSID is required')
  }

  if (!lastLocation) {
    messageSender
      .setMessage({
        text: 'Whooops? You need to tell us your location: ' + SETUP_LOCATION_GUIDE,
      })
      .send()

    return res.status(400).send('Last location not found')
  }

  new MessageSender(userId).setAction('typing_off').send()

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
