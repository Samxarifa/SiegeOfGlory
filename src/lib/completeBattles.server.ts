import { completeBattle, getFinishedBattles } from './dbHandler.server';
import { getBattleStats } from './statHandler.server';

export default async function checkAllBattles() {
	const battles = await getFinishedBattles();

	battles &&
		battles.forEach(async (battle) => {
			const stats = await getBattleStats(
				battle.user1R,
				battle.user2R,
				battle.statType,
				battle.startDate
			);

			if (stats && (stats.player1 || stats.player2)) {
				const { player1: user1Stat, player2: user2Stat } = stats;

				if (user1Stat > user2Stat) {
					if (battle.statType === 'd') {
						completeBattle(battle.user1, battle.user2, 2, user1Stat, user2Stat);
					} else {
						completeBattle(battle.user1, battle.user2, 1, user1Stat, user2Stat);
					}
				} else if (user1Stat < user2Stat) {
					if (battle.statType === 'd') {
						completeBattle(battle.user1, battle.user2, 1, user1Stat, user2Stat);
					} else {
						completeBattle(battle.user1, battle.user2, 2, user1Stat, user2Stat);
					}
				} else {
					completeBattle(battle.user1, battle.user2, 0, user1Stat, user2Stat);
				}
			} else if (Date.now() - new Date(battle.startDate).getTime() >= 48 * 60 * 60 * 1000) {
				completeBattle(battle.user1, battle.user2, 0, 0, 0);
			}
		});
}
