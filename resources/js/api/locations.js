export const show = (type, userId) => {
  try {
    fetch(`${window.appUrl}/locations/${type}?userId=${userId}`)
  } catch (error) {
    console.error('There is an error: ', error)
  }
}
