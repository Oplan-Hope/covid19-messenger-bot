class MessageSender {
  /**
   * Create a new message sender instance.
   * 
   * @param {number} recepientId The user's page scoped ID
   * @returns {void}
   */
  constructor(recepientId) {
    this.recepientId = recepientId
  }

  /**
   * Set the current action.
   * 
   * @param {string} action It can be: mark_seen, typing_on, typing_off
   * @returns {MessageSender}
   */
  setAction(action) {
    this.action = action
    return this
  }

  /**
   * Set the current message.
   * 
   * @param {object} message
   * @returns {MessageSender}
   */
  setMessage(message) {
    this.message = message
    return this
  }

  /**
   * Sends the message to the recipient.
   * 
   * @returns {Promise<void>}
   */
  async send() {
    try {
      const qs = 'access_token=' + encodeURIComponent(process.env.FB_PAGE_TOKEN || '')

      await fetch(`https://graph.facebook.com/me/messages?${qs}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: { id: this.recepientId },
          message: this.message,
          sender_action: this.action
        })
      })

      this.action = undefined
      this.message = undefined
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = MessageSender
