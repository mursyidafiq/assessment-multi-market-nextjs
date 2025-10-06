export function getBaseUrl(): string {

	const explicit = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;
	if (explicit) return explicit.replace(/\/$/, '');


	return 'http://localhost:3000';
}


