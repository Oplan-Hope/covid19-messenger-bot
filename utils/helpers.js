const fs = require('fs')

/**
 * Get the path of an asset from the manifest file.
 *
 * @param {string} name The manifest name of an asset
 * @returns {string|null}
 */
const asset = (name) => {
  const file = fs.readFileSync('public/manifest.json')
  const manifest = JSON.parse(file)
  return manifest[name] ? manifest[name] : null
}

// TODO: find a lodash equivalent and delete this.
const ucfirst = (subject) => subject.charAt(0).toUpperCase() + subject.substring(1)

/**
 * Turn a Query parameter Object into a Query string.
 *
 * @param {Object} params Query parameters.
 * @returns {string}
 */
const queryString = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')

module.exports = {
  asset,
  ucfirst,
  queryString,
}
