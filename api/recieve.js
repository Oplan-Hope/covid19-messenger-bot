const messagesApi = require('api/messages')
const sendApi = require('api/send')
const userLocationApi = require('api/user-location')

/**
 * Postback event handler triggered by a postback action you, the developer,
 * specify on a button in a template.
 *
 * @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback
 *
 * @param {Object} event format can vary depending on the kind of message that was received.
 * @returns {undefined}
 */
const handleReceivePostback = async (event) => {
  /**
   * The 'payload' param is a developer-defined field which is
   * set in a postbackbutton for Structured Messages.
   *
   * In this case we've defined our payload in our postback
   * actions to be a string that represents a JSON object
   * containing `type` and `data` properties. EG:
   */
  const type = event.postback.payload
  const senderId = event.sender.id

  switch (type) {
    case 'RESOURCES':
      sendApi.sendResourceMessage(senderId)
      break

    case 'GET_STARTED':
      sendApi.sendWelcomeMessage(senderId)
      break
  }
}

/**
 * Message Event called when a message is sent to your page.
 *
 * @see https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * @param {Object} event format can vary depending on the kind of message that was received.
 * @returns {undefined}
 */
const handleReceiveMessage = (event) => {
  const message = event.message
  const senderId = event.sender.id

  // It's good practice to send the user a read receipt so they know
  // the bot has seen the message. This can prevent a user
  // spamming the bot if the requests take some time to return.
  sendApi.sendRecieved(senderId)

  if (message.quick_reply) {
    const { payload } = message.quick_reply

    switch (payload) {
      case 'TY':
        sendApi.sendMessage(senderId, messagesApi.thankYouMessage())
        break

      case 'R-CT':
        sendApi.sendMessage(senderId, messagesApi.covid19TweetsResourceMessage())
        break

      case 'R-CM':
        sendApi.sendMessage(senderId, messagesApi.covid19MapResourceMessage())
        break

      case 'R-WSD':
        sendApi.sendMessage(senderId, messagesApi.whatShouldIDoResourceMessage())
        break

      case 'R-WIC':
        sendApi.sendMessage(senderId, messagesApi.whatIsCovid19ResourceMessage())
        break
    }
  } else if (message.attachments) {
    for (attachment of message.attachments) {
      if (attachment.type === 'location') {
        for (attachment of message.attachments) {
          if (attachment.type === 'location') {
            const { payload = {} } = attachment

            // We will try to get the name of the location from the attachment,
            // but if it gives a generic location name, we will fetch the legit
            // location name using the coordinates.
            const name = attachment.title.match(/location/i)
              ? 'generic' // TODO: We must identify the name of the location.
              : attachment.title

            userLocationApi
              .store({
                userId: senderId,
                name,
                latitude: payload.coordinates.lat,
                longitude: payload.coordinates.long,
              })
              .then(() => {
                sendApi.sendLocationSharedMessage(senderId)
              })
              .catch(() => {
                sendApi.sendLocationNotSharedMessage(senderId)
              })
          }
        }
      }
    }
  } else if (message.text) {
    const arrThanks = ['salamat', 'thank you', 'thanks', 'thanks', 'good job', 'i love you', 'mahal kita']
    if (arrThanks.indexOf(message.text.toLowerCase()) > -1) {
      // Simple search matching to send a grateful message :)
      sendApi.sendMessage(senderId, messagesApi.supportiveMessage())
    } else if (message.text.startsWith('/')) {
      // When they send a text prefixed with "/", give them an option with a link
      // to open the Search webview.
      sendApi.sendSearchWildcardMessage(senderId)
    } else {
      // Unfortunately, we can't give them an awesome response...
      sendApi.sendMessage(senderId, messagesApi.sorryMessage())
    }
  }
}

module.exports = {
  handleReceivePostback,
  handleReceiveMessage,
}
