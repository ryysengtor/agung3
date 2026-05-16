import mongoose from 'mongoose';

/**
 * MongoDB Connection — Stable & Lag-Free
 *
 * Uses globalThis caching to prevent multiple connections in:
 * - Dev: hot reloads
 * - Serverless: function reuse across cold/warm invocations
 *
 * Key design:
 * - Single cached connection per process
 * - Clean error handling — no retry loops (next request retries naturally)
 * - No null return — throws on failure so API routes can catch cleanly
 * - Optimized pool size for serverless constraints
 * - Connection state logging for debugging
 *
 * IMPORTANT: mongodb+srv:// enables TLS automatically.
 * Do NOT set tlsMinVersion — not supported in Mongoose 9.x
 */

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env'
  );
}

// TypeScript declaration for globalThis.mongoose
declare global {
  var mongoose: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  } | undefined;
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<mongoose.Mongoose> {
  // If we already have a connection, verify it's still alive
  if (cached.conn) {
    if (cached.conn.connection.readyState === 1) {
      return cached.conn;
    }
    // Connection is stale, reset cache
    console.log('[MongoDB] ⚠️ Stale connection detected, reconnecting...');
    cached.conn = null;
    cached.promise = null;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      // Optimized timeouts — 10s to find server, 45s socket idle
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      // Stable pool for serverless
      maxPoolSize: 10,
      minPoolSize: 1,
      // Prevent auto-index creation in production (causes slowness)
      autoIndex: process.env.NODE_ENV !== 'production',
      // mongodb+srv:// already enables TLS by default
      // Do NOT set tlsMinVersion or tls options — not supported in Mongoose 9.x
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('[MongoDB] ✅ Connected successfully');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('[MongoDB] ❌ Connection failed:', error.message);
        // Clear the promise so next call retries naturally
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
