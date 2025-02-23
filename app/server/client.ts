import { createThirdwebClient } from 'thirdweb';

const secretKey = process.env.THIRDWEB_SECRET_KEY;

if (!secretKey) {
	throw new Error('No secret key provided');
}

export const client = createThirdwebClient({
	clientId: secretKey,
});
