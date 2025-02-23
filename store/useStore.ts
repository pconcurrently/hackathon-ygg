import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

interface State {
	user: {
		name: string | null;
		email: string | null;
	};
	setUser: (name: string, email: string) => void;
	clearUser: () => void;
}

export const useStore = create<State>()(
	devtools(
		immer(
			persist(
				(set) => ({
					user: {
						name: null,
						email: null,
					},
					setUser: (name, email) =>
						set(
							(state) => {
								state.user.name = name;
								state.user.email = email;
							},
							false,
							'setUser'
						),
					clearUser: () =>
						set(
							(state) => {
								state.user.name = null;
								state.user.email = null;
							},
							false,
							'clearUser'
						),
				}),
				{
					name: 'app-storage',
				}
			)
		),
		{
			name: 'User Store',
			enabled: process.env.NODE_ENV === 'development',
		}
	)
);
