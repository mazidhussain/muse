import { Connection } from 'jsforce'

let cachedConnection: Connection | null = null

const username = process.env.SALESFORCE_USERNAME as string
const password =
  (process.env.SALESFORCE_PASSWORD as string) +
  (process.env.SALESFORCE_SECURITY_TOKEN as string)

export async function connectToSalesforce() {
  // If a cached connection exists, return it
  if (cachedConnection) {
    console.log('Using cached Salesforce connection')
    return cachedConnection
  }

  try {
    // Establish a new connection to Salesforce with security token
    const conn = new Connection({
      loginUrl: process.env.SALESFORCE_LOGIN_URL,
      version: '61.0',
    })

    await conn.login(username, password)

    // Cache the connection for future use
    cachedConnection = conn

    console.log('New Salesforce connection established')
    return cachedConnection
  } catch (error) {
    console.error('Error connecting to Salesforce:', error)
    throw error
  }
}
