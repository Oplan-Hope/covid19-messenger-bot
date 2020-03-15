const api = require('../utils/api')
const helpers = require('../utils/helpers')

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
          text: 'What country / region you are located? e.g. Philippines',
        })
        .send()
  }
}

const handleMessage = async (message, profile, messageSender) => {
  if (message.quick_reply) {
    console.log(message.quick_reply)
  } else if (message.text) {
    const region = helpers.ucfirst(message.text.toLowerCase())
    const stats = await api.casesByRegionApi(region)

    messageSender.setMessage({
      text: stats 
        ? region + ' currently have: \n' +
          ` - ${stats.cases} reported cases \n` +
          ` - ${stats.deaths} deaths \n` +
          ` - ${stats.total_recovered} recovered \n` +
          `Stay safe ${profile.first_name || 'my friend'}!`
        : `Sorry, we can't find your region.`
      })
      .send()
  }
}

module.exports = {
  handlePostback,
  handleMessage
}