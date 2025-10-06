import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: Request) {
	const form = await req.formData();
	const file = form.get('file');
	if (!file || !(file instanceof File)) {
		return NextResponse.json({ error: 'file is required' }, { status: 400 });
	}
	const bytes = await file.arrayBuffer();
	const buffer = Buffer.from(bytes);
	const uploadsDir = path.join(process.cwd(), 'public', 'media', 'uploads');
	await fs.mkdir(uploadsDir, { recursive: true });
	const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
	const target = path.join(uploadsDir, safeName);
	await fs.writeFile(target, buffer);
	return NextResponse.json({ url: `/media/uploads/${safeName}` });
}


