const casesByRegionApi = async searchTerm => {
  try {
    const res = await fetch(process.env.RAPIDAPI_URL + '/cases_by_country.php', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
      }
    })

    const stats = await res.json()
    return stats.countries_stat.find(
      s => s.country_name.match(new RegExp(searchTerm, 'i'))
    )
  } catch (error) {
    console.error('There is an error: ', error)
  }
}

const worldTotalApi = async () => {
  try {
    const res = await fetch(process.env.RAPIDAPI_URL + '/worldstat.php', {
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY
      }
    })

    const stats = await res.json()
    return stats
  } catch (error) {
    console.error('There is an error: ', error)
  }
}

module.exports = {
  casesByRegionApi,
  worldTotalApi
}