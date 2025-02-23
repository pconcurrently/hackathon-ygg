'use server';

import { VerifyLoginPayloadParams, createAuth } from 'thirdweb/auth';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { client } from '@/lib/thirdwebClient';
import { cookies } from 'next/headers';

const privateKey = process.env.THIRDWEB_ADMIN_PRIVATE_KEY || '';

if (!privateKey) {
	throw new Error('Missing THIRDWEB_ADMIN_PRIVATE_KEY');
}

const thirdwebAuth = createAuth({
	domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN || '',
	adminAccount: privateKeyToAccount({ client, privateKey }),
	client,
});

export const generatePayload = thirdwebAuth.generatePayload;
const cookieStore = await cookies();

export async function login(payload: VerifyLoginPayloadParams) {
	const verifiedPayload = await thirdwebAuth.verifyPayload(payload);
	console.log(verifiedPayload);
	if (verifiedPayload.valid) {
		const jwt = await thirdwebAuth.generateJWT({
			payload: verifiedPayload.payload,
		});
		cookieStore.set('jwt', jwt);
	}
}

export async function isLoggedIn() {
	const jwt = cookieStore.get('jwt');
	console.log(jwt);
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
	cookieStore.delete('jwt');
}
