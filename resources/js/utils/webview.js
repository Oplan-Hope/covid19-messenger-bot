/**
 * Close the webview inside Messenger
 * For more information on webview controls in MessengerExntension,
 * refer to the webview docs:
 * https://developers.facebook.com/docs/messenger-platform/messenger-extension
 *
 *  @returns {undefined}
 */
export const close = () => {
  window.MessengerExtensions.requestCloseBrowser(
    function success() {
      return
    },
    function error(err) {
      console.error(err, 'Unable to close window.', 'You may be viewing outside of the Messenger app.')
    }
  )
}
