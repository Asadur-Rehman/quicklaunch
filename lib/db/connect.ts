import mongoose from 'mongoose';

declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: typeof mongoose | undefined;
}

let cached = global._mongooseConn;

export async function connectDB() {
  if (cached) return cached;

  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI environment variable is not set');

  const conn = await mongoose.connect(uri, {
    bufferCommands: false,
  });

  cached = conn;
  global._mongooseConn = conn;
  return conn;
}
