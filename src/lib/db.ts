import mongoose from 'mongoose';

declare global {
	var __mongooseConn: Promise<typeof mongoose> | null;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

export async function connectToDatabase(): Promise<typeof mongoose> {
	global.__mongooseConn ??=
		(mongoose.connect(MONGODB_URI as string, {
			bufferCommands: false,
		}) as unknown as Promise<typeof mongoose>);
	return global.__mongooseConn;
}


