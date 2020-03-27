const fetch = require('isomorphic-unfetch')
const castArray = require('lodash/castArray')
const isEmpty = require('lodash/isEmpty')
const { queryString } = require('utils/helpers')

/**
 * Globals
 */
const { FB_PAGE_TOKEN } = process.env

/**
 * Send messages in order to the Facebook graph API.
 *
 * @param {String} endpoint The endpoint to send data to.
 * @param {Object|Object[]} messages Payloads to send individually.
 * @param {Object} queryParams Query parameters.
 * @param {Object} retries - # of times to attempt to send a message.
 * @returns {undefined}
 */
const send = async (endpoint, messages, queryParams = {}, retries = 3) => {
  if (!FB_PAGE_TOKEN) {
    console.error('Sender requires you to specify a page access token.')
    return
  }

  if (retries < 0) {
    console.error('No more retries left.', { endpoint, messages, queryParams })
    return
  }

  // Ensure query parameters have a FB_PAGE_TOKEN value
  const qp = Object.assign({ access_token: FB_PAGE_TOKEN }, queryParams)
  const query = queryString(qp)

  // Ready the first message in the array for sending.
  const [message, ...queue] = castArray(messages)

  try {
    const res = await fetch(`https://graph.facebook.com/me/${endpoint}?${query}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    })

    if (res.status === 200) {
      // Message has been successfully received by Facebook
      const body = await res.text()
      console.log(`Successfully sent message to ${endpoint} endpoint: `, body)

      // Continue sending payloads until queue empty
      if (!isEmpty(queue)) {
        send(endpoint, queue, queryParams)
      }
    } else {
      // Retry sending the message...
      console.error(`Retrying to send request: ${retries} left`)
      send(endpoint, messages, queryParams, retries - 1)
    }
  } catch (error) {
    console.log(error)
  }
}

/**
 * Sends multiple messages to the Facebook messages API.
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/send-api/
 *
 * @param {Object|Object[]} messages Payloads to send individually.
 * @param {Object} queryParams Query parameters.
 * @returns {undefined}
 */
const callMessagesAPI = (messages, queryParams = {}) => {
  return send('messages', ...messages, queryParams)
}

const callMessengerProfileAPI = (messages, queryParams = {}) => {
  return send('messenger_profile', messages, queryParams)
}

module.exports = {
  callMessagesAPI,
  callMessengerProfileAPI,
}
