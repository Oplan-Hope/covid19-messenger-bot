const { API_URL, API_TOKEN } = process.env
const headers = {
  'Content-Type': 'application/json',
  'X-Hope-Key': API_TOKEN,
}

/**
 * Show a listing of subscribed users in storage.
 */
const subscribed = () => {
  return fetch(`${API_URL}/users?subscribed`, { headers }).then((res) => res.json())
}

/**
 * Store a new user in storage.
 *
 * @param {Object} attributes The attributes to be updated.
 */
const store = (attributes) => {
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    headers,
    body: JSON.stringify(attributes),
  }).then((res) => res.json())
}

/**
 * Show a user in storage.
 *
 * @param {Number} userId The user's page-scoped ID (PSID)
 */
const find = (userId) => {
  return fetch(`${API_URL}/users/${userId}`, { headers }).then((res) => res.json())
}

/**
 * Update a given user in storage.
 *
 * @param {Number} userId The user's page-scoped ID (PSID)
 * @param {Object} attributes The attributes to be updated.
 */
const update = (userId, attributes) => {
  return fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(attributes),
  }).then((res) => res.json())
}

module.exports = {
  subscribed,
  store,
  find,
  update,
}
