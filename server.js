const express = require('express')
const bodyParser = require('body-parser')

require('dotenv').config()
require('isomorphic-unfetch')

const app = express().use(bodyParser.json())
const port = process.env.PORT || 8000
const { handlePostback } = require('./utils/webhook')
const retrieveProfile = require('./utils/retrieve-profile')
const MessageSender = require('./utils/message-sender')

app.get('/', (req, res) => {
  if (req.query['hub.mode'] !== 'subscribe' || req.query['hub.verify_token'] !== process.env.FB_VERIFY_TOKEN) {
    return res.sendStatus(400)
  }

  return res.send(req.query['hub.challenge'])
})

app.post('/', (req, res) => {
  const data = req.body

  if (data.object !== 'page') {
    // We don't care about non page interactions at this point.
    return res.sendStatus(400)
  }

  for (const entry of data.entry) {
    ;(async function() {
      for (const event of entry.messaging) {
        // The facebook user's Page-scoped ID (PSID).
        const id = event.sender.id
        
        // Notifies user that the we are preparing something...
        new MessageSender(id).setAction('typing_on').send()

        // We will retrieve the user's information using the PSID.
        const profile = await retrieveProfile(id, ['first_name', 'gender'])

        // Notifies user that the we are done...
        await new MessageSender(id).setAction('typing_off').send()

        if (event.postback) {
          handlePostback(event.postback, profile, new MessageSender(id))
        } else if (event.message) {
          // console.log(event.message)
        }
      }
    })()
  }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
