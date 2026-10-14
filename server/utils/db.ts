import { createClient, type Client } from '@libsql/client'

let clientInstance: Client | null = null

export function getDb(): Client {
  if (clientInstance) {
    return clientInstance
  }

  // If cloud DATABASE_URL is provided, use it (e.g. Turso libsql://...)
  // In serverless environments (Vercel/Netlify), fallback to writable /tmp directory
  const isServerless = Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME)
  const defaultLocalDb = isServerless ? 'file:/tmp/paywall.db' : 'file:paywall.db'
  const url = process.env.DATABASE_URL || defaultLocalDb
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
