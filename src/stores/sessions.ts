// redis implementation
import * as redis from 'redis'
const client = redis.createClient({ host: 'redis' })
client.on('connect', function () {
  console.log('connected to redis!!!!!!!!!!!!!!')
})
import { promisify } from 'util'
const getAsync = promisify(client.get).bind(client)
const setAsync = promisify(client.set).bind(client)

export const createSession = async ({ username }) => {
  const sessionId = 'session-' + Math.random()
  await setAsync(sessionId, JSON.stringify({ username }))
  return sessionId
}

export const getSession = async (sessionId) => {
  const session = await getAsync(sessionId)
  if (session) {
    return JSON.parse(session)
  }
  return null
}
