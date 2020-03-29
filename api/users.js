const { API_URL, API_TOKEN } = process.env

const subscribed = () => {
  return fetch(`${API_URL}/users?subscribed`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Hope-Key': API_TOKEN,
    },
  }).then((res) => res.json())
}

module.exports = {
  subscribed,
}
