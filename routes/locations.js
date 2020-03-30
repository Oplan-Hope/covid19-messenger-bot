const router = require('express').Router()
const messagesApi = require('api/messages')
const sendApi = require('api/send')
const testingCentersApi = require('api/testing-centers')
const { getNearByLocation, objectNearByParse } = require('api/nearby-search')
const requireLocation = require('middleware/require-location')

router.get('/:type', requireLocation, async (req, res) => {
  const { userId, lastLocation } = res

  var nearbyMessage
  switch (req.params.type) {
    case 'TESTING_CENTERS':
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

      const arrayOfNearestTestCenter = []
      const pushObjectToArray = () => {
        return testingCenters.map((testingCenter, i) => {
          return arrayOfNearestTestCenter.push({
            title: `${testingCenter.name}`,
            subtitle: `${distanceIcon(i)} ${testingCenter.distance} Kilometers away  ${
              testingCenter.verified ? '✅ Verified by WHO ' : ''
            }`,
            buttons: [
              {
                type: 'web_url',
                url: `https://www.google.com/maps/?q=${testingCenter.latitude},${testingCenter.longitude}`,
                title: 'View Location',
              },
            ],
          })
        })
      }
      await pushObjectToArray()
      sendApi.sendMessage(userId, messagesApi.nearestTestingCentersMessage(arrayOfNearestTestCenter))
      break
    case 'BANKS':
      const nearbyBanks = await getNearByLocation('banks', lastLocation, 3000)
      nearbyMessage = await objectNearByParse(nearbyBanks.results)
      if (nearbyMessage.length != 0) {
        sendApi.sendMessage(userId, messagesApi.nearBySearchText('banks'))
        sendApi.sendMessage(userId, messagesApi.nearBySearchMessage(nearbyMessage))
      } else {
        sendApi.sendMessage(userId, messagesApi.nearBySearchFail('banks'))
      }
      break
    case 'PHARMACIES':
      const nearbyPharmacies = await getNearByLocation('pharmacies', lastLocation, 1000)
      nearbyMessage = await objectNearByParse(nearbyPharmacies.results)
      if (nearbyMessage.length != 0) {
        sendApi.sendMessage(userId, messagesApi.nearBySearchText('pharmacies'))
        sendApi.sendMessage(userId, messagesApi.nearBySearchMessage(nearbyMessage))
      } else {
        sendApi.sendMessage(userId, messagesApi.nearBySearchFail('pharmacies'))
      }
      break
    case 'GROCERY_STORES':
      const nearbyMarkets = await getNearByLocation('supermarket/groccery', lastLocation, 3000)
      nearbyMessage = await objectNearByParse(nearbyMarkets.results)
      if (nearbyMessage.length != 0) {
        sendApi.sendMessage(userId, messagesApi.nearBySearchText('grocery stores and supermarkets'))
        sendApi.sendMessage(userId, messagesApi.nearBySearchMessage(nearbyMessage))
      } else {
        sendApi.sendMessage(userId, messagesApi.nearBySearchFail('grocery stores and supermarkets'))
      }
      break
    case 'HOSPITALS':
      const nearbyHospitals = await getNearByLocation('hospitals', lastLocation, 5000)
      nearbyMessage = await objectNearByParse(nearbyHospitals.results)
      if (nearbyMessage.length != 0) {
        sendApi.sendMessage(userId, messagesApi.nearBySearchText('hospitals'))
        sendApi.sendMessage(userId, messagesApi.nearBySearchMessage(nearbyMessage))
      } else {
        sendApi.sendMessage(userId, messagesApi.nearBySearchFail('hospitals'))
      }
      break
    case 'POLICE_STATIONS':
      const nearbyPoliceStations = await getNearByLocation('police stations', lastLocation, 2000)
      nearbyMessage = await objectNearByParse(nearbyPoliceStations.results)
      if (nearbyMessage.length != 0) {
        sendApi.sendMessage(userId, messagesApi.nearBySearchText('police stations'))
        sendApi.sendMessage(userId, messagesApi.nearBySearchMessage(nearbyMessage))
      } else {
        sendApi.sendMessage(userId, messagesApi.nearBySearchFail('police stations'))
      }
      break

    default:
      sendApi.sendMessage(userId, messagesApi.underDevelopmentMessage())
      break
  }
})

module.exports = router
