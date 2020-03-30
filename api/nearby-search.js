const STATUS_CODES = require('http-status-codes')
const geolib = require('geolib')

const getNearByLocation = async (keyword, location, distance = 1000) => {
  const { latitude, longitude } = location

  const resp = await fetch(
    `${process.env.GOOGLE_API_URL}/nearbysearch/json?location=${latitude},${longitude}&radius=${distance}&keyword=${keyword}&sensor=true&key=${process.env.GOOGLE_API_KEY}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  ).then(async (res) => {
    if (res.status !== STATUS_CODES.OK) {
      throw new Error('Error: Fetching nearby')
    }
    return await res.json()
  })

  return resp
}

const objectNearByParse = async (result) => {
  const ratingsIcon = (i) => {
    if (i === 0) return '⭐'
    if (i === 1) return '⭐'
    if (i === 2) return '⭐⭐'
    if (i === 3) return '⭐⭐⭐'
    if (i === 4) return '⭐⭐⭐⭐'
    if (i === 5) return '⭐⭐⭐⭐⭐'
    else return '⭐⭐⭐⭐⭐'
  }

  const arrayRes = []
  result.map(async (value, i) => {
    if (10 > i) {
      arrayRes.push({
        title: `${value.name}`,
        subtitle: `Address:${value.vicinity}\n${
          value.opening_hours && value.opening_hours.open_now ? 'Status: Open now' : 'Status: Closed'
        }\nUser Ratings: ${ratingsIcon(value.rating)}`,
        buttons: [
          {
            type: 'web_url',
            url: `https://www.google.com/maps/?q=${value.geometry.location.lat},${value.geometry.location.lng}`,
            title: 'View Location',
          },
        ],
      })
    }
  })

  return arrayRes
}

const getPhotoReference = async (photoRef) => {
  const stringUrl = await fetch(
    `${process.env.GOOGLE_API_URL}/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.GOOGLE_API_KEY}`
  )
    .then(async (res) => {
      if (res.status !== STATUS_CODES.OK) {
        throw new Error('Error: Fetching nearby')
      }
      return await response.blob()
    })
    .then((images) => {
      outside = URL.createObjectURL(images)
      return outside
    })

  return stringUrl
}

const getNearestBy = (object) => {
  return object.map((value) => ({
    ...value,
    distance: geolib.getDistance(position.coords, {
      latitude: 51.525,
      longitude: 7.4575,
    }),
  }))
}

module.exports = {
  //call api
  getNearByLocation,

  //parse object to message
  objectNearByParse,
}
