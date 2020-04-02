const sendApi = require('api/send')
const usersApi = require('api/users')

module.exports = (profile) => {
  usersApi.find(profile.id).catch(() => {
    usersApi
      .store({
        userId: profile.id,
        name: `${profile.first_name} ${profile.last_name}`,
        recieveNotificationsAt: true,
      })
      .then(() => {
        sendApi.sendRealtimeUpdatesMessage(profile.id)
      })
      .catch(console.log)
  })
}
