const handlePostback = (postback, profile, messageSender) => {
  switch (postback.payload) {
    case 'GET_STARTED':
        messageSender.setMessage({
          text: `Hello ${profile.first_name || 'my friend'}!`
        })
      break
  }
}

module.exports = {
  handlePostback
}