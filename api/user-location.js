/**
 * Store a new user location.
 *
 * @param {object} attributes
 * @return {Promise<object|void>}
 */
const store = async (attributes) => {
  try {
    const res = await fetch(process.env.API_URL + '/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Hope-Key': process.env.API_TOKEN,
      },
      body: JSON.stringify(attributes),
    })

    if (res.status === 201) {
      return await res.json()
    }
  } catch (error) {
    console.error('There is an error: ', error)
  }
}

/**
 * Give the latest locations recorded from the user.
 *
 * @param {string} userId
 * @param {number} limit
 * @return {Promise<object|null|void>}
 */
const latest = async (userId, limit = null) => {
  try {
    const res = await fetch(`${process.env.API_URL}/location/${userId}?limit=${limit}`)
    if (res.status === 200) {
      const locations = await res.json()
      return locations.length > 0 ? locations[0] : null
    }
  } catch (error) {
    console.error('There is an error: ', error)
  }
}

module.exports = { store, latest }
