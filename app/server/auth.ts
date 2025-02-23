'use server';

import { VerifyLoginPayloadParams, createAuth } from 'thirdweb/auth';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { client } from './client';
import { cookies } from 'next/headers';

const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY || '';

if (!privateKey) {
	throw new Error('Missing THIRDWEB_ADMIN_PRIVATE_KEY in .env file.');
}

const thirdwebAuth = createAuth({
	domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || '',
	adminAccount: privateKeyToAccount({ client, privateKey }),
	client,
});

export const generatePayload = thirdwebAuth.generatePayload;

export async function login(payload: VerifyLoginPayloadParams) {
	const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
	if (verifiedPayload.valid) {
		const jwt = await thirdwebAuth.generateJWT({
			payload: verifiedPayload.payload,
		});
		const cookieStore = await cookies();
		cookieStore.set('jwt', jwt);
	}
}

export async function isLoggedIn() {
	const cookieStore = await cookies();
	const jwt = cookieStore.get('jwt');
	if (!jwt?.value) {
		return false;
	}

	const authResult = await thirdwebAuth.verifyJWT({ jwt: jwt.value });

	if (!authResult.valid) {
		return false;
	}
	return true;
}

export async function logout() {
	const cookieStore = await cookies();
	cookieStore.delete('jwt');
}
