const getNearByLocation = async (keyword, location, distance = 1000) => {
  const { latitude, longitude } = location

  try {
    const res = await fetch(
      process.env.GOOGLE_API_URL +
        `/nearbysearch/json?location=${latitude},${longitude}&radius=${distance}&keyword=${keyword}&sensor=true&key=${process.env.GOOGLE_API_KEY}`
    )
     
    const location = await res
    return  location
  } catch (error) {
    console.error('There is an error: ', error)
  }
}


module.exports.getNearByLocation = getNearByLocation