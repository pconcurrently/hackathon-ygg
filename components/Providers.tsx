'use client';

import { ThirdwebProvider } from 'thirdweb/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode } from 'react';
import { getQueryClient } from '@/utils/getQueryClient';

function Providers({ children }: { children: ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<ThirdwebProvider>
			<QueryClientProvider client={queryClient}>
				{children}
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</ThirdwebProvider>
	);
}

export default Providers;
