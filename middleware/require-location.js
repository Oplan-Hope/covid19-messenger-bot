const STATUS_CODES = require('http-status-codes')
const userLocationApi = require('api/user-location')
const sendApi = require('api/send')

module.exports = async (req, res, next) => {
  const userId = req.header('X-FB-PSID')

  if (!userId) {
    return res.status(STATUS_CODES.UNAUTHORIZED).send('PSID is required')
  }

  const lastLocation = await userLocationApi.latest(userId)

  if (!lastLocation) {
    sendApi.sendLocationRequiredMessage(userId)
    return res.status(STATUS_CODES.UNAUTHORIZED)
  }

  res.userId = userId
  res.lastLocation = lastLocation
  next()
}
