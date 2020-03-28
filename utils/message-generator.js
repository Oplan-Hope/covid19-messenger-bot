const sample = require('lodash/sample')

const gratefulMessage = () => sample(['Thank you!', 'Thanks for caring!', 'You are awesome!'])

module.exports = {
  gratefulMessage,
}
