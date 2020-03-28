const STATUS_CODES = require('http-status-codes')
const retrieveProfile = require('utils/retrieve-profile')

module.exports = async (req, res, next) => {
  const userId = req.header('X-FB-PSID')

  if (!userId) {
    return res.status(STATUS_CODES.UNAUTHORIZED).send('PSID is required')
  }

  const profile = await retrieveProfile(userId, ['id', 'first_name', 'last_name'])
  res.profile = profile
  next()
}
