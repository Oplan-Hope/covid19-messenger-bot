/**
 * A little helper utility to retrieve a user's profile
 *
 * @see https://developers.facebook.com/docs/messenger-platform/identity/user-profile/#optin
 *
 * @param {number} psid The user's Page-scope ID
 * @param {Array<string>} fields List of fields that will compose the profile
 */
const retrieveProfile = async (psid, fields) => {
    const pageToken = encodeURIComponent(process.env.FB_PAGE_TOKEN || '')
    const qs = `fields=${fields.join(',')}&access_token=${pageToken}`

    const res = await fetch(`https://graph.facebook.com/${psid}?${qs}`)
    const data = await res.json()
    return data
}

module.exports = retrieveProfile