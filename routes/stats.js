const router = require('express').Router()
const statsApi = require('api/stats')
const withProfile = require('middleware/with-profile')
const MessageSender = require('utils/message-sender')

router.get('/:region', withProfile, async (req, res) => {
  const { profile } = res
  const { region } = req.params
  const worldwide = region === 'WORLD'

  // TODO: This is a little bit repetitive, also in the webhooks section.
  new MessageSender(profile.id).setAction('typing_on').send()

  const stats = worldwide ? await statsApi.worldTotal() : await statsApi.casesByRegion(region)

  // TODO: This is a little bit repetitive, also in the webhooks section.
  new MessageSender(profile.id).setAction('typing_off').send()

  new MessageSender(profile.id)
    .setMessage({
      text: stats
        ? ` ${worldwide ? 'The world' : stats.country_name} currently have: \n` +
          ` - ${worldwide ? stats.total_cases : stats.cases} reported cases \n` +
          ` - ${worldwide ? stats.total_deaths : stats.deaths} total deaths \n` +
          ` - ${stats.total_recovered} total recovered \n` +
          ` - ${stats.new_cases} new cases \n` +
          `Stay safe ${profile.first_name || ''}!`
        : `Sorry, we can't find your region.`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Thank you!',
          payload: 'TY',
        },
      ],
    })
    .send()
})

module.exports = router
