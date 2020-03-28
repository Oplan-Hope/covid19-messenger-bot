const userLocationApi = require('api/user-location')
const sendApi = require('api/send')

module.exports = async (req, res, next) => {
  const userId = req.header('X-FB-PSID')

  if (!userId) {
    return res.status(401).send('PSID is required')
  }

  const lastLocation = await userLocationApi.latest(userId)

  if (!lastLocation) {
    sendApi.sendLocationRequiredMessage(userId)
    return res.status(401)
  }

  res.userId = userId
  res.lastLocation = lastLocation
  next()
}
