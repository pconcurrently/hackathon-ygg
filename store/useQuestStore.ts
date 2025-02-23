import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

import type { Quest } from '@/graphql/queries';

interface QuestState {
	quest: Quest | null;
	setQuest: (quest: Quest) => void;
	clearQuest: () => void;
}

export const useQuestStore = create<QuestState>()(
	devtools(
		immer(
			persist(
				(set) => ({
					quest: null,
					setQuest: (quest) =>
						set(
							(state) => {
								state.quest = quest;
							},
							false,
							'setQuest'
						),
					clearQuest: () =>
						set(
							(state) => {
								state.quest = null;
							},
							false,
							'clearQuest'
						),
				}),
				{
					name: 'quest-storage',
				}
			)
		),
		{
			name: 'Quest Store',
			enabled: process.env.NODE_ENV === 'development',
		}
	)
);
