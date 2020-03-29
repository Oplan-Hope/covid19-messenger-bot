const throng = require('throng')
const Queue = require('bull')

require('dotenv').config()
require('isomorphic-unfetch')

const usersApi = require('api/users')
const sendApi = require('api/send')
const statsApi = require('api/stats')

// Connect to a local redis intance locally, and the Heroku-provided URL in production
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379'

// Spin up multiple processes to handle jobs to take advantage of more CPU cores
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
const workers = process.env.WEB_CONCURRENCY || 2

// The maximum number of jobs each worker should process at once. This will need
// to be tuned for your application. If each job is mostly waiting on network
// responses it can be much higher. If each job is CPU-intensive, it might need
// to be much lower.
const maxJobsPerWorker = 50

async function start() {
  // Connect to the queue
  const newsQueue = new Queue('news', REDIS_URL, { prefix: 'hope' })

  newsQueue.process(maxJobsPerWorker, async job => {
    try {
      // Fetch subscribed users
      const users = await usersApi.subscribed().catch(console.log) || []

      // Fetch statistics
      const stats = await statsApi.casesByRegion('ph')

      if (!stats) {
        throw new Error('No stats to send')
      }

      let count = 0

      for (let user of users) {
        sendApi.sendLatestNewsMessage(user.userId, stats, user.name)
        count += 1
        job.progress(count / users.length * 100)
      }

      // A job can return values that will be stored in Redis as JSON
      return {}
    } catch (error) {
      console.error(error)
    }
  })
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start })
