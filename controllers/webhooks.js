const statsApi = require('api/stats')
const userLocationApi = require('api/user-location')
const testingCentersApi = require('api/testing-centers')

const SETUP_LOCATION_GUIDE = 'https://www.facebook.com/help/messenger-app/583011145134913'
const UNDER_DEVELOPMENT =
  "Hey, we're still trying to fix this one for you to have a better user experience. Stay tuned!"

const handlePostback = async (postback, profile, messageSender) => {
  switch (postback.payload) {
    case 'GET_STARTED':
      messageSender
        .setMessage({
          text: `Hi there! We're trying to keep you guys stay updated with what's the latest news/data about COVID-19. Just choose an action on the menu option.`,
          quick_replies: [
            {
              content_type: 'text',
              title: 'PH COVID Cases',
              payload: 'PHYES',
              image_url:
                'https://banner2.cleanpng.com/20180330/edq/kisspng-flag-of-the-philippines-flag-of-the-philippines-co-philippines-5abddb87b8f402.0425604815223919437576.jpg',
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
              image_url:
                'https://img.favpng.com/14/3/15/google-maps-computer-icons-png-favpng-X2iMmWPs5Ckf4dkigJW7pFfGn.jpg',
            },
            {
              content_type: 'text',
              title: 'COVID19 Tweets',
              payload: 'R-CT',
              image_url: 'https://i.pinimg.com/originals/84/3d/d8/843dd8ca717a56cfc9a615df10d39944.png',
            },
          ],
        })
        .send()
      break

    case 'QUICK_UPDATE':
      const lastLocation = await userLocationApi.latest(profile.id)

      if (lastLocation) {
        messageSender
          .setMessage({
            text: 'Hello, you can check the nearest testing centers, checkpoints & much more!',
            quick_replies: [
              {
                content_type: 'text',
                title: 'Nearest testing centers',
                payload: 'HNM',
                image_url:
                  'https://cdn3.iconfinder.com/data/icons/small-color-v11/512/blood_drop_hospital_infusion_medical_transfusion-512.png',
              },
              {
                content_type: 'text',
                title: 'Nearest checkpoints',
                payload: 'CNM',
                image_url:
                  'https://image.shutterstock.com/image-vector/road-closed-street-barrier-on-260nw-1212098479.jpg',
              },
            ],
          })
          .send()
      } else {
        messageSender
          .setMessage({
            text: 'Hello! These features needs your current location: ' + SETUP_LOCATION_GUIDE,
          })
          .send()
      }
      break

    case 'SEARCH':
      messageSender
        .setMessage({
          text: `Hey, I can see that you are curious about the total number of confirmed COVID-19 cases we have right now. Which do you want to check?`,
          quick_replies: [
            {
              content_type: 'text',
              title: 'COVID world cases',
              payload: 'CATW',
              image_url: 'https://i.pinimg.com/originals/dd/d5/0c/ddd50c7fd01a3a3927b932d8a5d4857c.png',
            },
            {
              content_type: 'text',
              title: 'COVID cases per location',
              payload: 'SCS',
              image_url: 'https://png.pngtree.com/element_our/png_detail/20181206/find-vector-icon-png_260845.jpg',
            },
          ],
        })
        .send()
      break

    case 'RESOURCES':
      messageSender
        .setMessage({
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
              image_url:
                'https://img.favpng.com/14/3/15/google-maps-computer-icons-png-favpng-X2iMmWPs5Ckf4dkigJW7pFfGn.jpg',
            },
            {
              content_type: 'text',
              title: 'COVID19 Tweets',
              payload: 'R-CT',
              image_url: 'https://i.pinimg.com/originals/84/3d/d8/843dd8ca717a56cfc9a615df10d39944.png',
            },
          ],
        })
        .send()
      break
  }
}

const handleMessage = async (message, profile, messageSender) => {
  if (message.quick_reply) {
    const lastLocation = await userLocationApi.latest(profile.id)
    const { payload } = message.quick_reply

    switch (payload) {
      case 'R-WIC':
        messageSender
          .setMessage({
            text:
              `A pneumonia of unknown cause detected in Wuhan, China was first reported to the WHO Country Office in China on 31 December 2019 \n` +
              `WHO is working 24/7 to analyse data, provide advice, coordinate with partners, help countries prepare, increase supplies and manage expert networks.\n` +
              `The outbreak was declared a Public Health Emergency of International Concern on 30 January 2020..\n` +
              `The international community has asked for US$675 million to help protect states with weaker health systems as part of its Strategic Preparedness and Response Plan...\n` +
              `The international community has asked for US$675 million to help protect states with weaker health systems as part of its Strategic Preparedness and Response Plan...\n` +
              `On 11 February 2020, WHO announced a name for the new coronavirus disease: COVID-19.`,
            quick_replies: [
              {
                content_type: 'text',
                title: 'Thank you!',
                payload: 'TY',
              },
            ],
          })
          .send()
        break
      case 'R-WSD':
        messageSender
          .setMessage({
            text:
              `Hey ${profile.first_name ? profile.first_name : ''}, soon things will be brighter. Stay strong!\n ` +
              `- For the mean time, here's what you should do to help yourself stay awared.\n` +
              `- Wash your hands frequently\n ` +
              `- Maintain social distancing\n ` +
              `- Avoid touching eyes, nose and mouth\n` +
              `- Practice respiratory hygiene\n ` +
              `- If you have fever, cough and difficulty breathing, seek medical care early\n` +
              `- Stay informed and follow advice given by your healthcare provider\n` +
              `- Source: https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public\n`,
            quick_replies: [
              {
                content_type: 'text',
                title: 'Thanks for caring!',
                payload: 'TY',
              },
            ],
          })
          .send()
        break

      case 'R-CM':
        messageSender
          .setMessage({
            text: `If you want to take a look at the detailed mapping of COVID-19 cases, please check out this link for an interactive map: https://the2019ncov.com/`,
            quick_replies: [
              {
                content_type: 'text',
                title: 'Thanks for caring!',
                payload: 'TY',
              },
            ],
          })
          .send()
        break

      case 'R-CT':
        messageSender
          .setMessage({
            text: `If you want to be stay updated with the latest news and tweets about COVID-19, please check out this link for more info: https://bit.ly/2U3D9GV`,
            quick_replies: [
              {
                content_type: 'text',
                title: 'Thanks for caring!',
                payload: 'TY',
              },
            ],
          })
          .send()
        break
      case 'CATW':
        const statsWorld = await statsApi.worldTotal()
        messageSender
          .setMessage({
            text:
              'The world currently has: \n' +
              ` - ${statsWorld.total_cases} reported cases \n` +
              ` - ${statsWorld.total_deaths} deaths \n` +
              ` - ${statsWorld.total_recovered} recovered`,
            quick_replies: [
              {
                content_type: 'text',
                title: 'Thank you!',
                payload: 'TY',
              },
            ],
          })
          .send()
        break
      case 'SCS':
        messageSender
          .setMessage({
            text: `Uhm.. Are you looking for the number of cases right now here in the Philippines?`,
            quick_replies: [
              {
                content_type: 'text',
                title: 'Yes',
                payload: 'PHYES',
                image_url:
                  'https://banner2.cleanpng.com/20180330/edq/kisspng-flag-of-the-philippines-flag-of-the-philippines-co-philippines-5abddb87b8f402.0425604815223919437576.jpg',
              },
              {
                content_type: 'text',
                title: 'Other location',
                payload: 'OTLC',
                image_url: 'https://cdn3.iconfinder.com/data/icons/marketing-add-on-colored/48/JD-11-512.png',
              },
            ],
          })
          .send()
        break

      case 'PHYES':
        const phname = 'Philippines'
        const statsPH = await statsApi.casesByRegion(phname)
        messageSender
          .setMessage({
            text: statsPH
              ? ` ${phname} currently has: \n` +
                ` - ${statsPH.cases} reported cases \n` +
                ` - ${statsPH.deaths} total deaths \n` +
                ` - ${statsPH.total_recovered} total recovered \n` +
                ` - ${statsPH.new_cases} new cases \n` +
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
        break
      case 'TY':
        messageSender
          .setMessage({
            text: 'No worries! Please be safe and stay at home!',
          })
          .send()
        break
      case 'OTLC':
        messageSender
          .setMessage({
            text: 'In what country/region are you located? Just put a "/" first \n e.g. /China',
          })
          .send()
        break

      case 'HNM':
        if (lastLocation) {
          messageSender
            .setMessage({
              text: `Are you currently located at: ${lastLocation.name}?`,
              quick_replies: [
                {
                  content_type: 'text',
                  title: 'Yes',
                  payload: 'HNM_LOCATION_CONFIRMED',
                },
                {
                  content_type: 'text',
                  title: 'No',
                  payload: 'HNM_LOCATION_CANCELLED',
                },
              ],
            })
            .send()
        }
        break

      case 'CNM':
        messageSender.setMessage({ text: UNDER_DEVELOPMENT }).send()
        break

      case 'HNM_LOCATION_CONFIRMED':
        if (lastLocation) {
          const testingCenters = testingCentersApi.nearest({
            latitude: lastLocation.latitude,
            longitude: lastLocation.longitude,
          })

          const distanceIcon = (i) => {
            if (i === 0) return '🚕'
            if (i === 1) return '🚌'
            if (i === 2) return '🚆'
            else return '🚀'
          }

          messageSender
            .setMessage({
              text:
                'Nearest Testing Centers: \n\n' +
                `${testingCenters
                  .map(
                    (testingCenter, i) =>
                      `${i + 1}. ${testingCenter.name}\n` +
                      `${distanceIcon(i)} ${testingCenter.distance} Kilometers away \n` +
                      `${testingCenter.verified ? '✅ Verified by WHO \n\n' : ''}`
                  )
                  .join('')}`,
              quick_replies: [
                {
                  content_type: 'text',
                  title: 'Thank you!',
                  payload: 'TY',
                },
              ],
            })
            .send()
        } else {
          messageSender
            .setMessage({
              text: 'Whooops? You need to tell us your location: ' + SETUP_LOCATION_GUIDE,
            })
            .send()
        }
        break

      case 'HNM_LOCATION_CANCELLED':
        messageSender
          .setMessage({
            text: 'Then tell us your current location and come back again: ' + SETUP_LOCATION_GUIDE,
          })
          .send()
        break

      default:
        messageSender
          .setMessage({
            text: `Sorry I don't understand you stay safe  ${
              profile.first_name ? profile.first_name : ''
            }. To know more about kindly COVID see this link https://www.youtube.com/watch?v=95eNDcugOYU`,
          })
          .send()
        break
    }
  } else if (message.attachments) {
    for (attachment of message.attachments) {
      if (attachment.type === 'location') {
        for (attachment of message.attachments) {
          if (attachment.type === 'location') {
            const { payload = {} } = attachment

            // We will try to get the name of the location from the attachment,
            // but if it gives a generic location name, we will fetch the legit
            // location name using the coordinates.
            const name = attachment.title.match(/location/i)
              ? 'generic' // TODO: We must identify the name of the location.
              : attachment.title

            userLocationApi.store({
              userId: profile.id,
              name,
              latitude: payload.coordinates.lat,
              longitude: payload.coordinates.long,
            })
          }
        }
      }
    }
  } else if (message.text) {
    var messageLower = message.text.toLowerCase()
    var arrThanks = ['salamat', 'thank you', 'thanks', 'thanks', 'good job', 'i love you', 'mahal kita']

    if (message.text.startsWith('/')) {
      const searchTerm = message.text.split('/').join('')
      const stats = await statsApi.casesByRegion(searchTerm)
      messageSender
        .setMessage({
          text: stats
            ? stats.country_name +
              ' currently have: \n' +
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
    } else if (arrThanks.indexOf(messageLower) > -1) {
      messageSender
        .setMessage({
          text: 'No worries! Please be safe and stay at home!',
        })
        .send()
    } else if (message.text === 'QA') {
      // TODO: This must be placed somewhere else.
      messageSender
        .setMessage({
          attachment: {
            type: 'template',
            payload: {
              template_type: 'button',
              text: 'You are viewing a hidden feature, good luck!',
              buttons: [
                {
                  type: 'web_url',
                  title: 'Quick Access',
                  url: process.env.APP_URL,
                  webview_height_ratio: 'tall',
                  messenger_extensions: true,
                },
              ],
            },
          },
        })
        .send()
    } else {
      messageSender
        .setMessage({
          text: `Hey, I can't quite seem to understand what you're trying to say. Please try to use another keyword or select from menu options so I can give you more information. 😀 https://bit.ly/2woalA5`,
        })
        .send()
    }
  }
}

module.exports = {
  handlePostback,
  handleMessage,
}
