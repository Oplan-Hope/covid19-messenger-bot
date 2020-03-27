const sender = require('utils/sender')

/**
 * Globals
 */
const { APP_URL } = process.env

/**
 * Adds the server url to the Messenger App's whitelist.
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/domain-whitelisting/
 *
 * This is required to use Messenger Extensions which
 * this demo uses to get UserId's from a Messenger WebView.
 *
 * @returns {undefined}
 */
const domainWhitelisting = () => {
  sender.callMessengerProfileAPI({
    whitelisted_domains: [APP_URL],
  })
}

/**
 * Sets the persistent menu for the application
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/persistent-menu/
 *
 * @returns {undefined}
 */
const persistentMenu = () => {
  sender.callMessengerProfileAPI({
    persistent_menu: [
      {
        locale: 'default',
        composer_input_disabled: false,
        call_to_actions: [
          {
            type: 'web_url',
            title: 'Quick update',
            url: APP_URL,
            webview_height_ratio: 'tall',
            messenger_extensions: true,
          },
          {
            type: 'web_url',
            title: 'Search',
            url: `${APP_URL}/#/search`,
            webview_height_ratio: 'tall',
            messenger_extensions: true,
          },
          {
            type: 'postback',
            title: 'Resources',
            payload: 'RESOURCES',
          },
        ],
      },
    ],
  })
}

/**
 * Sets the Get Started button for the application
 *
 * @see https://developers.facebook.com/docs/messenger-platform/reference/messenger-profile-api/get-started-button/
 *
 * @returns {undefined}
 */
const getStartedButton = () => {
  sender.callMessengerProfileAPI({
    get_started: {
      payload: 'GET_STARTED',
    },
  })
}

module.exports = {
  domainWhitelisting,
  persistentMenu,
  getStartedButton,
}
