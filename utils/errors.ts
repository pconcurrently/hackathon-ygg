export class APIError extends Error {
	constructor(
		message: string,
		public status?: number,
		public code?: string,
		public errors?: Record<string, string[]>
	) {
		super(message);
		this.name = 'APIError';
	}

	static fromResponse(response: Response, data?: any): APIError {
		const message = data?.message || response.statusText || 'An error occurred';
		return new APIError(message, response.status, data?.code, data?.errors);
	}

	static isAPIError(error: unknown): error is APIError {
		return error instanceof APIError;
	}
}

export async function handleAPIResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		let errorData;
		try {
			errorData = await response.json();
		} catch {
			throw new APIError(
				response.statusText || 'Network response was not ok',
				response.status
			);
		}
		throw APIError.fromResponse(response, errorData);
	}

	return response.json() as Promise<T>;
}

export function getErrorMessage(error: unknown): string {
	if (APIError.isAPIError(error)) {
		if (error.errors) {
			// Join all error messages
			return Object.values(error.errors).flat().join('. ');
		}
		return error.message;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return 'An unexpected error occurred';
}
