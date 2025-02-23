import { ApolloError, DocumentNode, OperationVariables } from '@apollo/client';
import { apolloClient } from '@/lib/apollo';
import { APIError } from './errors';

export async function graphqlRequest<TData>({
	query,
	variables,
}: {
	query: DocumentNode;
	variables?: OperationVariables;
}): Promise<TData> {
	try {
		const { data, errors } = await apolloClient.query({
			query,
			variables,
		});

		if (errors?.length) {
			throw new APIError(
				errors[0].message,
				undefined,
				'GRAPHQL_ERROR',
				errors.reduce((acc, err) => {
					acc[err.path?.join('.') || 'general'] = [err.message];
					return acc;
				}, {} as Record<string, string[]>)
			);
		}

		return data;
	} catch (error) {
		console.log('error', error);
		if (error instanceof ApolloError) {
			throw new APIError(
				error.message,
				undefined,
				'GRAPHQL_ERROR',
				error.graphQLErrors.reduce((acc, err) => {
					acc[err.path?.join('.') || 'general'] = [err.message];
					return acc;
				}, {} as Record<string, string[]>)
			);
		}
		throw error;
	}
}
