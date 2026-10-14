import { createClient, type Client } from '@libsql/client'

let clientInstance: Client | null = null

export function getDb(): Client {
  if (clientInstance) {
    return clientInstance
  }

  const url = process.env.DATABASE_URL || 'file:paywall.db'
  const authToken = process.env.DATABASE_AUTH_TOKEN

  clientInstance = createClient({
    url,
    authToken,
  })

  // Ensure table exists on initialization
  initDb(clientInstance).catch((err) => {
    console.error('Failed to initialize database tables:', err)
  })

  return clientInstance
}

async function initDb(client: Client) {
  await client.execute(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      offer_id TEXT NOT NULL,
      device_id TEXT NOT NULL,
      price REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'RUB',
      status TEXT NOT NULL DEFAULT 'completed',
      created_at TEXT NOT NULL
    );
  `)
}
