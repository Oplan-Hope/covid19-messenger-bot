const userLocationApi = require('api/user-location')
const MessageSender = require('utils/message-sender')

const SETUP_LOCATION_GUIDE = 'https://www.facebook.com/help/messenger-app/583011145134913'

module.exports = async (req, res, next) => {
  const userId = req.header('X-FB-PSID')
  
  if (! userId) {
    return res.status(401).send('PSID is required')
  }

  const lastLocation = await userLocationApi.latest(userId)

  if (! lastLocation) {
    new MessageSender(userId)
      .setMessage({
        text: 'Whooops? You need to tell us your location: ' + SETUP_LOCATION_GUIDE,
      })
      .send()

    return res.status(401).send('We are unable to determine your last location.')
  }
  
  res.userId = userId
  res.lastLocation = lastLocation
  next()
}
