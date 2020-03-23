const router = require('express').Router()
const statsApi = require('api/stats')
const withProfile = require('middleware/with-profile')
const MessageSender = require('utils/message-sender')

router.get('/:region', withProfile, async (req, res) => {
  const { profile } = res
  const { region } = req.params
  const stats = await statsApi.casesByRegion(region)

  new MessageSender(profile.id)
    .setMessage({
      text: stats
        ? ` ${stats.country_name} currently has: \n` +
          ` - ${stats.cases} reported cases \n` +
          ` - ${stats.deaths} total deaths \n` +
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
