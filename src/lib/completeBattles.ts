import { completeBattle, getFinishedBattles } from './dbHandler.server';
import { getBattleStats } from './statHandler.server';

export default async function checkAllBattles() {
	const battles = await getFinishedBattles();

	battles &&
		battles.forEach(async (battle) => {
			const stats = await getBattleStats(
				battle.user1,
				battle.user2,
				battle.statType,
				battle.startDate
			);

			if (stats) {
				const { player1: user1Stat, player2: user2Stat } = stats;

				if (user1Stat > user2Stat || !user2Stat) {
					completeBattle(battle.user1, battle.user2, 1);
				} else if (user1Stat < user2Stat || !user1Stat) {
					completeBattle(battle.user1, battle.user2, 2);
				} else {
					completeBattle(battle.user1, battle.user2, 0);
				}
			} else if (Date.now() - new Date(battle.startDate).getTime() >= 48 * 60 * 60 * 1000) {
				completeBattle(battle.user1, battle.user2, 0);
			}
		});
}
