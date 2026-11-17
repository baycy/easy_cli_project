import { GameState } from '../domain/models.js';
import { isCraftingSuccessful } from '../domain/gameLogic.js';
import { SceneRepository } from '../infrastructure/repository.js';
import * as cliView from '../presentation/cliView.js';

export class GameApp {
    private state: GameState = { playerName: '', inventory: [], visitedRooms: [] };

    constructor(private repository: SceneRepository) { }

    async start() {
        this.state.playerName = await cliView.askPlayerName();
        await this.runHallwayLoop();
    }

    private async runHallwayLoop() {
        let inHallway = true;

        while (inHallway) {
            const unvisited = this.repository.getUnvisitedRooms(this.state.visitedRooms);
            cliView.showInventory(this.state.inventory);

            const choice = await cliView.askHallwayChoice(unvisited);

            if (choice === 'own_room') {
                inHallway = false;
                this.finishGame();
            } else {
                const scene = this.repository.getSceneById(choice);
                if (scene) await this.processScene(scene);
            }
        }
    }

    private async processScene(scene: import('../domain/models.js').CharacterScene) {
        const action = await cliView.playSceneView(scene);
        const isHelp = action === 'help';

        cliView.showSceneResult(isHelp, isHelp ? scene.successText : scene.failText, isHelp ? scene.rewardItem : null);

        if (isHelp && scene.rewardItem) {
            this.state.inventory.push(scene.rewardItem);
        }
        this.state.visitedRooms.push(scene.id);
    }

    private finishGame() {
        const canCraft = isCraftingSuccessful(this.state.inventory);
        cliView.showCraftingEnding(canCraft);
        process.exit(0);
    }
}
