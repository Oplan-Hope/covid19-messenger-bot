const castArray = require('lodash/castArray')
const messages = require('api/messages')
const sender = require('utils/sender')

/**
 * Globals
 */
const { APP_URL } = process.env

/**
 * Turns typing indicator on.
 *
 * @param {Number} recipientId The user's page scoped ID
 * @returns {Object}
 */
const typingOn = (recipientId) => ({
  recipient: {
    id: recipientId,
  },
  sender_action: 'typing_on',
})

/**
 * Send a read receipt to indicate the message has been read.
 *
 * @param {Number} recipientId The user's page scoped ID
 * @returns {undefined}
 */
const sendRecieved = (recipientId) => {
  sender.callMessagesAPI({
    recipient: {
      id: recipientId,
    },
    sender_action: 'mark_seen',
  })
}

/**
 * Wraps a message JSON object with recipient information.
 *
 * @param {Number} recipientId The user's page scoped ID
 * @param {Object} message
 * @returns {Object}
 */
const transformMessage = (recipientId, message) => ({
  recipient: {
    id: recipientId,
  },
  message,
})

/**
 * Send one or more messages using the Send API.
 *
 * @param {Number} recipientId The user's page scoped ID
 * @param {Object|Object[]} messages
 * @returns {undefined}
 */
const sendMessage = (recipientId, messages) => {
  sender.callMessagesAPI([
    typingOn(recipientId),
    ...castArray(messages).map((message) => transformMessage(recipientId, message)),
  ])
}

/**
 * Sends a message that tells the user we cannot save their location.
 *
 * @param {Number} recipientId
 * @returns {undefined}
 */
const sendLocationNotSharedMessage = (recipientId) => {
  sendMessage(recipientId, messages.locationNotSharedMessage())
}

/**
 * Sends a message with thanks and a button to open Quick Access webview.
 *
 * @param {Number} recipientId
 * @returns {undefined}
 */
const sendLocationSharedMessage = (recipientId) => {
  sendMessage(recipientId, messages.locationSharedMessage(APP_URL))
}

/**
 * Sends a message with a link to open the Search webview.
 *
 * @param {Number} recipientId
 * @returns {undefined}
 */
const sendSearchWildcardMessage = (recipientId) => {
  sendMessage(recipientId, messages.searchWildcardMessage(APP_URL))
}

/**
 * Sends a message that gives an up to date briefing to the user.
 *
 * @param {Number} recipientId The user's page scoped ID
 * @param {...} other
 * @returns {undefined}
 */
const sendLatestNewsMessage = (recipientId, ...other) => {
  sendMessage(recipientId, messages.latestNewsMessage(...other))
}

/**
 * Sends a message with a warning that they need to give their location.
 *
 * @param {Number} recipientId The user's page scoped ID
 * @returns {undefined}
 */
const sendLocationRequiredMessage = (recipientId) => {
  sendMessage(recipientId, messages.locationRequiredMessage())
}

/**
 * Sends an informative message.
 *
 * @param {Number} recipientId The user's page scoped ID
 * @returns {undefined}
 */
const sendResourceMessage = (recipientId) => {
  sendMessage(recipientId, messages.resourceMessage())
}

/**
 * Sends the welcome message, typically after "Get Started".
 *
 * @param {Number} recipientId The user's page scoped ID
 * @returns {undefined}
 */
const sendWelcomeMessage = (recipientId) => {
  sendMessage(recipientId, messages.welcomeMessage(APP_URL))
}

module.exports = {
  sendMessage,
  sendRecieved,

  // Others.
  sendLatestNewsMessage,
  sendLocationRequiredMessage,

  // Messages.
  sendLocationNotSharedMessage,
  sendLocationSharedMessage,
  sendSearchWildcardMessage,

  // Postbacks.
  sendResourceMessage,
  sendWelcomeMessage,
}
