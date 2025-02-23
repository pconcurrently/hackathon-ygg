'use client';

import { useState } from 'react';

const Counter = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<p>Count: {count}</p>
			<button
				className="bg-blue-500 text-white p-2 rounded"
				onClick={() => setCount(count + 1)}
			>
				Click me
			</button>
		</div>
	);
};

export default Counter;
