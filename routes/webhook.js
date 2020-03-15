const api = require('../utils/api')

const handlePostback = async (postback, profile, messageSender) => {
  switch (postback.payload) {
    case 'GET_STARTED':
        messageSender
          .setMessage({
            text: `Hello ${profile.first_name || 'my friend'}! How can I help?`
          })
          .send()
      break

    case 'QUICK_UPDATE':
        const stats = await api.worldTotalApi()
        
        messageSender
          .setMessage({
            text:
              'The world currently have: \n' +
              ` - ${stats.total_cases} reported cases \n` +
              ` - ${stats.total_deaths} deaths \n` +
              ` - ${stats.total_recovered} recovered`
          })
          .send()
      break

    case 'SEARCH':
      messageSender
        .setMessage({
          text: 'What country or region you are located? Just put a "/" first \n e.g. /Philippines',
        })
        .send()
  }
}

const handleMessage = async (message, profile, messageSender) => {
  if (message.quick_reply) {
    console.log(message.quick_reply)
  } else if (message.text) {
    if (message.text.startsWith('/')) {
      const searchTerm = message.text.split('/').join('')
      const stats = await api.casesByRegionApi(searchTerm)

      messageSender.setMessage({
        text: stats 
          ? stats.country_name + ' currently have: \n' +
            ` - ${stats.cases} reported cases \n` +
            ` - ${stats.deaths} deaths \n` +
            ` - ${stats.total_recovered} recovered \n` +
            `Stay safe ${profile.first_name || 'my friend'}!`
          : `Sorry, we can't find your region.`
        })
        .send()
    } else {
      messageSender
        .setMessage({
          text: `I don't understand :(\nTry searching for your country: /Philippines`
        })
        .send()
    }
  }
}

module.exports = {
  handlePostback,
  handleMessage
}