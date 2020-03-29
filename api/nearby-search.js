const geolib = require('geolib')

const getNearByLocation = async (keyword, location, distance = 1000) => {
  const { latitude, longitude } = location

  try {
    const res = await fetch(
    'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=14.826410,120.986000&radius=5000&keyword=bank&sensor=true&key=AIzaSyAyfV5lDaeRbh45v2FRbdNgdRE9hBcaVYE'
    ).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    })
    
    const location = await res.json()
    return location 
  } catch (error) {
    console.error('There is an error: ', error)
  }
}

module.exports.getNearByLocation = getNearByLocation
