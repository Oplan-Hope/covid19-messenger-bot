const STATUS_CODES = require('http-status-codes')

/**
 * Globals
 */
const { API_URL, API_TOKEN } = process.env

/**
 * Store a new user location.
 *
 * @param {object} attributes
 * @return {Promise<object|void>}
 */
const store = (attributes) =>
  fetch(API_URL + '/location', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hope-Key': API_TOKEN,
    },
    body: JSON.stringify(attributes),
  }).then(async (res) => {
    if (res.status !== STATUS_CODES.CREATED) {
      throw new Error('Error: Saving User location')
    }

    return await res.json()
  })

/**
 * Give the latest locations recorded from the user.
 *
 * @param {string} userId
 * @param {number} limit
 * @return {Promise<object|null|void>}
 */
const latest = (userId, limit = null) =>
  fetch(`${process.env.API_URL}/location/${userId}?limit=${limit}`, {
    headers: {
      'X-Hope-Key': API_TOKEN,
    },
  }).then(async (res) => {
    if (res.status !== STATUS_CODES.OK) {
      throw new Error('Error: Fetching User location')
    }

    const locations = await res.json()
    return locations.length > 0 ? locations[0] : null
  })

module.exports = { store, latest }
