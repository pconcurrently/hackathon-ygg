import Image from 'next/image';

import Login from '@/components/Login';

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 flex flex-col items-center justify-center text-white">
			<header className="text-center mb-8" suppressHydrationWarning>
				<h1 className="text-4xl font-bold mb-4">Welcome to YGG</h1>
			</header>
			<main className="flex flex-col items-center" suppressHydrationWarning>
				<Image
					src="https://www.yieldguild.io/images/ds4/nav/ygg-logo-primary.svg"
					alt="Web3 Logo"
					width={150}
					height={150}
					className="mb-8"
				/>
				<Login />
			</main>
			<footer className="mt-12 text-center">
				<p>© 2025 YGG</p>
			</footer>
		</div>
	);
}
