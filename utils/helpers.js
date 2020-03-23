const fs = require('fs')

const asset = (name) => {
  const file = fs.readFileSync('public/manifest.json')
  const manifest = JSON.parse(file)
  return manifest[name] ? manifest[name] : null
}

const ucfirst = (subject) => subject.charAt(0).toUpperCase() + subject.substring(1)

module.exports = {
  asset,
  ucfirst,
}
