import { completeBattle, getFinishedBattles } from './dbHandler.server';
import { getBattleStats } from './statHandler.server';

export default async function checkAllBattles() {
	// Get all finished battles from db
	const battles = await getFinishedBattles();

	// Check each battle
	battles &&
		battles.forEach(async (battle) => {
			// Get stats for each player in battle
			const stats = await getBattleStats(
				battle.user1R,
				battle.user2R,
				battle.statType,
				battle.startDate
			);

			// Check if stats api is updated
			if (stats && (stats.player1 || stats.player2)) {
				const { player1: user1Stat, player2: user2Stat } = stats;

				const statType = battle.statType === 'd' ? 2 : 1;

				// Check if one player didn't play
				if (!user2Stat) {
					completeBattle(battle.user1, battle.user2, 1, user1Stat, 0);
				} else if (!user1Stat) {
					completeBattle(battle.user1, battle.user2, 2, 0, user2Stat);
				}

				// Check if player 1 won
				else if (user1Stat > user2Stat) {
					// Inverts Winner if Stat Type is Deaths (2)
					completeBattle(battle.user1, battle.user2, statType, user1Stat, user2Stat);
				}
				// Check if player 2 won
				else if (user1Stat < user2Stat) {
					// Inverts Winner if Stat Type is Deaths (2)
					completeBattle(battle.user1, battle.user2, Math.abs(statType - 3), user1Stat, user2Stat);
				}
				// Else, it's a draw
				else {
					completeBattle(battle.user1, battle.user2, 0, user1Stat, user2Stat);
				}
			}
			// Assumes that after 24 hours from completion, if no stats have updated, then both players didn't play
			else if (Date.now() - new Date(battle.startDate).getTime() >= 48 * 60 * 60 * 1000) {
				completeBattle(battle.user1, battle.user2, 0, 0, 0);
			}
		});
}
