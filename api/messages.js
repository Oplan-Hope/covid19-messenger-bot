const messageGenerator = require('utils/message-generator')

/**
 * Quick reply for sending thanks :)
 *
 * @returns {undefined}
 */
const createThankfulQuickReply = () => ({
  content_type: 'text',
  title: messageGenerator.gratefulMessage(),
  payload: 'TY',
})

/**
 * Button for opening a web view.
 *
 * @param {String} webviewUrl - The url of the webview.
 * @param {String} buttonTitle - Button title.
 * @returns {Object} - Message to create a button pointing to the web view.
 */
const createButton = (webviewUrl, buttonTitle = 'Open') => ({
  type: 'web_url',
  url: webviewUrl,
  title: buttonTitle,
  webview_height_ratio: 'tall',
  messenger_extensions: true,
})

/**
 * Message that tells the requested feature is under development.
 *
 * @returns {Object}
 */
const underDevelopmentMessage = () => ({
  text: "Hey, we're still trying to fix this one for you to have a better user experience. Stay tuned!",
})

/**
 * Message containing nearest testing centers
 *
 * @param {Object[]} testingCenters List of testing centers
 * @returns {Object}
 */
const nearestTestingCentersMessage = (testingCenters) => {
  const distanceIcon = (i) => {
    if (i === 0) return '🚕'
    if (i === 1) return '🚌'
    if (i === 2) return '🚆'
    else return '🚀'
  }

  // `${testingCenters
  //   .map(
  //     (testingCenter, i) =>
  //       `${i + 1}. ${testingCenter.name}\n` +
  //       `${distanceIcon(i)} ${testingCenter.distance} Kilometers away \n` +
  //       `${testingCenter.verified ? '✅ Verified by WHO \n\n' : ''}`
  //   )
  //   .join('')}`

  // const parseToObject = () => {
  //   return testingCenters.map((testingCenter, i) => {
  //     return {
  //       title: `${testingCenter.name}`,
  //       subtitle: `${distanceIcon(i)} ${testingCenter.distance} Kilometers away \n ${
  //         testingCenter.verified ? '✅ Verified by WHO \n\n' : ''
  //       }`,
  //       image_url: 'https://peterssendreceiveapp.ngrok.io/img/collection.png',
  //       buttons: [
  //         {
  //           title: 'View',
  //           type: 'web_url',
  //           url: 'https://peterssendreceiveapp.ngrok.io/collection',
  //           messenger_extensions: true,
  //           webview_height_ratio: 'tall',
  //           fallback_url: 'https://peterssendreceiveapp.ngrok.io/',
  //         },
  //       ],
  //     }
  //   })
  // }

  return {
    text: `${testingCenters
      .map(
        (testingCenter, i) =>
          `${i + 1}. ${testingCenter.name}\n` +
          `${distanceIcon(i)} ${testingCenter.distance} Kilometers away \n` +
          `${testingCenter.verified ? '✅ Verified by WHO \n\n' : ''}`
      )
      .join('')}`,
    quick_replies: [createThankfulQuickReply()],
  }
}

/**
 * Message with informative text
 *
 * @param {Object} stats Statistics coming from an External API.
 * @param {Boolean} worldwide Whether it is worldwide or not.
 * @param {Object} profile User Profile from Facebook's Profile API.
 * @returns {Object}
 */
const statisticsMessage = (stats, worldwide, profile) => ({
  text: stats
    ? ` ${worldwide ? 'The world' : stats.country_name} currently have: \n` +
      ` - ${worldwide ? stats.total_cases : stats.cases} reported cases \n` +
      ` - ${worldwide ? stats.total_deaths : stats.deaths} total deaths \n` +
      ` - ${stats.total_recovered} total recovered \n` +
      ` - ${stats.new_cases} new cases \n` +
      `Stay safe ${profile.first_name || ''}!`
    : `Sorry, we can't find your region.`,
  quick_replies: [createThankfulQuickReply()],
})

const thankYouMessage = () => ({
  text: 'No worries! Please be safe and stay at home!',
})

const covid19TweetsResourceMessage = () => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title:
            'If you want to be stay updated with the latest news and tweets about COVID-19, please check out this link for more info: ',
          image_url:
            'https://images.newscientist.com/wp-content/uploads/2020/02/11165812/c0481846-wuhan_novel_coronavirus_illustration-spl.jpg',
          subtitle: 'See latest threads about COVID panademic',
          default_action: {
            type: 'web_url',
            url: 'https://bit.ly/2U3D9GV',
            webview_height_ratio: 'tall',
          },
          buttons: [
            {
              type: 'web_url',
              url: 'https://bit.ly/2U3D9GV',
              title: 'View tweets',
            },
            {
              type: 'postback',
              title: 'Resources',
              payload: 'RESOURCES',
            },
          ],
        },
      ],
    },
  },
  quick_replies: [createThankfulQuickReply()],
})

const covid19MapResourceMessage = () => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title:
            'If you want to take a look at the detailed mapping of COVID-19 cases, please check out this link for an interactive',
          image_url: 'https://www.wishtv.com/wp-content/uploads/2020/03/Johns-Hopkins-map.jpg',
          subtitle: '',
          default_action: {
            type: 'web_url',
            url: 'https://the2019ncov.com/',
            webview_height_ratio: 'tall',
          },
          buttons: [
            {
              type: 'web_url',
              url: 'https://the2019ncov.com/',
              title: 'View map',
            },
            {
              type: 'postback',
              title: 'Resources',
              payload: 'RESOURCES',
            },
          ],
        },
      ],
    },
  },
  quick_replies: [createThankfulQuickReply()],
})

const whatShouldIDoResourceMessage = () => ({
  text:
    `Hey buddy, soon things will be brighter. Stay strong!\n ` +
    `- For the mean time, here's what you should do to help yourself stay awared.\n` +
    `- Wash your hands frequently\n ` +
    `- Maintain social distancing\n ` +
    `- Avoid touching eyes, nose and mouth\n` +
    `- Practice respiratory hygiene\n ` +
    `- If you have fever, cough and difficulty breathing, seek medical care early\n` +
    `- Stay informed and follow advice given by your healthcare provider\n` +
    `- Source: https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public\n`,
  quick_replies: [createThankfulQuickReply()],
})

const whatIsCovid19ResourceMessage = () => ({
  text:
    `A pneumonia of unknown cause detected in Wuhan, China was first reported to the WHO Country Office in China on 31 December 2019 \n` +
    `WHO is working 24/7 to analyse data, provide advice, coordinate with partners, help countries prepare, increase supplies and manage expert networks.\n` +
    `The outbreak was declared a Public Health Emergency of International Concern on 30 January 2020..\n` +
    `The international community has asked for US$675 million to help protect states with weaker health systems as part of its Strategic Preparedness and Response Plan...\n` +
    `The international community has asked for US$675 million to help protect states with weaker health systems as part of its Strategic Preparedness and Response Plan...\n` +
    `On 11 February 2020, WHO announced a name for the new coronavirus disease: COVID-19.`,
  quick_replies: [createThankfulQuickReply()],
})

/**
 * Message with encouraging text.
 *
 * @returns {Object}
 */
const supportiveMessage = () => ({
  text: 'No worries! Please be safe and stay at home!',
})

/**
 * Message with apologetic text.
 *
 * @returns {Object}
 */
const sorryMessage = () => ({
  text: `Hey, I can't quite seem to understand what you're trying to say. Please try to use another keyword or select from menu options so I can give you more information. 😀 https://bit.ly/2woalA5`,
})

/**
 * Message that tells the user we cannot save their location.
 *
 * @returns {Object}
 */
const locationNotSharedMessage = () => ({
  text: `Hey, I can't save your location! you can try again later :(`,
})

/**
 * Message with thanks and a button to open Quick Access webview.
 *
 * @param {String} appUrl - The application hostname.
 * @returns {Object}
 */
const locationSharedMessage = (appUrl) => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'Thanks for sharing your location! You can find establishments near you :)',
      buttons: [createButton(appUrl, 'Quick Access')],
    },
  },
})

/**
 * Message with a button to open Search webview.
 *
 * @param {String} appUrl - The application hostname.
 * @returns {Object}
 */
const searchWildcardMessage = (appUrl) => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: `Hello! are you trying to search for COVID19 statistics?`,
      buttons: [createButton(appUrl + '/#/search', 'Search')],
    },
  },
})

/**
 * Message with a warning that they need to give their location.
 *
 * @returns {Object}
 */
const locationRequiredMessage = () => ({
  text: 'Whooops?! You need to tell us your location: https://www.facebook.com/help/messenger-app/583011145134913',
})

/**
 * Message with informative text.
 *
 * @returns {Object}
 */
const resourceMessage = () => ({
  text: `Hey, don't worry. Earth is just healing itself from us. For the meantime, here's the list of things we can do for you.`,
  quick_replies: [
    {
      content_type: 'text',
      title: 'What is COVID19',
      payload: 'R-WIC',
      image_url:
        'https://thumbs.dreamstime.com/b/covid-ncov-novel-coronavirus-china-d-vector-illustration-virus-unit-172494968.jpg',
    },
    {
      content_type: 'text',
      title: 'What should I do',
      payload: 'R-WSD',
      image_url: 'https://www.aftermath.com/wp-content/uploads/handwashing1.png',
    },
    {
      content_type: 'text',
      title: 'COVID19 MAP',
      payload: 'R-CM',
      image_url: 'https://img.favpng.com/14/3/15/google-maps-computer-icons-png-favpng-X2iMmWPs5Ckf4dkigJW7pFfGn.jpg',
    },
    {
      content_type: 'text',
      title: 'COVID19 Tweets',
      payload: 'R-CT',
      image_url: 'https://i.pinimg.com/originals/84/3d/d8/843dd8ca717a56cfc9a615df10d39944.png',
    },
  ],
})

/**
 * Message containing nearest testing centers
 *
 * @param {Object[]} resultNearBy List of result by search query eg. hospitals
 * @param {String} searchTitle  Serve as the message title
 * @returns {Object}
 */
const nearBySearchMessage = (resultNearBy, searchTitle) => {
  return {
    text: `${searchTitle}: \n\n ${JSON.parse(resultNearBy)}`,
    quick_replies: [createThankfulQuickReply()],
  }
}

/**
 * Message that welcomes the user to the bot
 *
 * @param {String} appUrl - The application hostname.
 * @returns {Object} - Message with welcome text and a button to open Quick Access webview.
 */
const welcomeMessage = (appUrl) => ({
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: `Hi there! We're trying to keep you guys stay updated with what's the latest news/data about COVID-19.`,
      buttons: [createButton(appUrl, 'Quick Access')],
    },
  },
})

module.exports = {
  // Others
  underDevelopmentMessage,
  nearestTestingCentersMessage,
  statisticsMessage,
  locationRequiredMessage,
  nearBySearchMessage,

  // Quick Replies
  thankYouMessage,
  covid19TweetsResourceMessage,
  covid19MapResourceMessage,
  whatShouldIDoResourceMessage,
  whatIsCovid19ResourceMessage,

  // Messages.
  supportiveMessage,
  sorryMessage,
  locationNotSharedMessage,
  locationSharedMessage,
  searchWildcardMessage,

  // Postbacks.
  resourceMessage,
  welcomeMessage,
}
