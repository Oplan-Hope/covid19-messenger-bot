const router = require('express').Router()
const recieveApi = require('api/recieve')

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
      if (event.postback) {
        recieveApi.handleReceivePostback(event)
      } else if (event.message) {
        recieveApi.handleReceiveMessage(event)
      } else {
        console.log('Webhook received unknown messagingEvent: ', event)
      }
    }
  }
})

module.exports = router
