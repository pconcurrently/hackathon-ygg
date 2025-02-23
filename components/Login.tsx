'use client';

import { ConnectButton } from 'thirdweb/react';
import { client } from '@/lib/thirdwebClient';
import { inAppWallet } from 'thirdweb/wallets';
// import { getProfiles } from 'thirdweb/wallets/in-app';
import { generatePayload, logout, isLoggedIn, login } from '@/app/server/auth';
// import { useEffect, useState } from 'react';

// const ETHEREUM_CHAIN_ID = 1;

function Login() {
	const wallets = [
		inAppWallet({
			auth: { options: ['email', 'google', 'discord', 'wallet'] },
		}),
	];

	// useEffect(() => {
	// 	const getEmail = async () => {
	// 		const profiles = await getProfiles({ client });
	// 		console.log({ profiles });
	// 		setProfiles(profiles);
	// 	};
	// 	getEmail();
	// }, []);

	return (
		<div
			className="flex flex-col items-center justify-center"
			suppressHydrationWarning
		>
			<ConnectButton
				client={client}
				theme="dark"
				wallets={wallets}
				auth={{
					isLoggedIn: async () => {
						return await isLoggedIn();
					},
					doLogin: async (params) => {
						await login(params);
					},
					getLoginPayload: async ({ address }) =>
						generatePayload({ address, chainId: 17000 }),
					doLogout: async () => {
						await logout();
					},
				}}
				connectModal={{
					showThirdwebBranding: false,
				}}
			/>
		</div>
	);
}

export default Login;
