const getNearByLocation = async (keyword, location, distance = 1000) => {
  const { latitude, longitude } = location

  try {
    const res = await fetc(
      process.env.GOOGLE_API_URL +
        `/nearbysearch/json?location=${latitude},${longitude}&radius=${distance}&keyword=${keyword}&sensor=true&key=${procces.env.GOOGLE_API_KEY}`
    )
    return await res
  } catch (err) {
    throw err
  }
}
