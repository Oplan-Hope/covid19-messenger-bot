const fetchWorldTotal = async () => {
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

const handlePostback = async (postback, profile, messageSender) => {
  switch (postback.payload) {
    case 'GET_STARTED':
        messageSender
          .setMessage({
            text: `Hello ${profile.first_name || 'my friend'}! How can I help?`
          })
          .send()
      break

    case 'QUICK_UPDATE':
        const stats = await fetchWorldTotal()
        
        messageSender
          .setMessage({
            text:
              'The world currently have: \n' +
              ` - ${stats.total_cases} reported cases \n` +
              ` - ${stats.total_deaths} deaths \n` +
              ` - ${stats.total_recovered} recovered`
          })
          .send()
      break
  }
}

module.exports = {
  handlePostback
}