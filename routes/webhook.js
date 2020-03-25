const router = require('express').Router()
const webhooksController = require('controllers/webhooks')
const retrieveProfile = require('utils/retrieve-profile')
const MessageSender = require('utils/message-sender')

router.get('/', (req, res) => {
  if (req.query['hub.mode'] !== 'subscribe' || req.query['hub.verify_token'] !== process.env.FB_VERIFY_TOKEN) {
    return res.sendStatus(400)
  }

  return res.send(req.query['hub.challenge'])
})

router.post('/', (req, res) => {
  /*
    You must send back a status of 200(success) within 20 seconds
    to let us know you've successfully received the callback.
    Otherwise, the request will time out.
    When a request times out from Facebook the service attempts
    to resend the message.
    This is why it is good to send a response immediately so you
    don't get duplicate messages in the event that a request takes
    awhile to process.
  */
  res.sendStatus(200)

  const data = req.body

  // We don't care about non page interactions at this point.
  if (data.object !== 'page') {
    return res.sendStatus(400)
  }

  // Iterate over each entry
  // There may be multiple if batched
  for (const entry of data.entry) {
    for (const event of entry.messaging) {
      // The facebook user's Page-scoped ID (PSID).
      const id = event.sender.id

      // Notifies user that the we are preparing something...
      new MessageSender(id).setAction('typing_on').send()
      ;(async function () {
        // We will retrieve the user's information using the PSID.
        const profile = await retrieveProfile(id, ['id', 'first_name', 'last_name'])

        console.log(profile)

        // Notifies user that the we are done...
        await new MessageSender(id).setAction('typing_off').send()

        if (event.postback) {
          webhooksController.handlePostback(event.postback, profile, new MessageSender(id))
        } else if (event.message) {
          webhooksController.handleMessage(event.message, profile, new MessageSender(id))
        } else {
          console.log('Webhook received unknown messagingEvent: ', event)
        }
      })()
    }
  }
})

module.exports = router
