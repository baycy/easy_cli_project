import chalk from 'chalk';
import { GameState, CharacterScene } from './interfaces.js';
import { characters, getCraftingResult } from './story.js';
import { askPlayerName, askHallwayChoice, askAction } from './cli.js';

const state: GameState = {
    playerName: '',
    inventory: [],
    visitedRooms: []
};

export async function startGame() {
    console.log(chalk.cyan('=== ВЕЛИКИЙ БУДИНОК ===\n'));
    state.playerName = await askPlayerName();
    await hallwayLoop();
}

async function hallwayLoop() {
    let inHallway = true;

    while (inHallway) {
        // Відфільтровуємо кімнати, у яких гравець ще не був
        const unvisitedRooms = characters.filter(c => !state.visitedRooms.includes(c.id));

        console.log(chalk.gray(`\nВаш інвентар: [${state.inventory.length ? state.inventory.join(', ') : 'Порожньо'}]`));

        const choice = await askHallwayChoice(unvisitedRooms, true);

        if (choice === 'own_room') {
            inHallway = false;
            await finishGame();
        } else {
            const selectedScene = characters.find(c => c.id === choice);
            if (selectedScene) {
                await playScene(selectedScene);
            }
        }
    }
}

async function playScene(scene: CharacterScene) {
    console.log(chalk.yellow(`\n--- ${scene.roomName} ---`));
    console.log(chalk.white(scene.description));
    console.log(chalk.cyan(`${scene.characterName} каже: ${scene.problem}`));

    const action = await askAction(scene);

    if (action === 'help') {
        console.log(chalk.magenta(`\n${scene.successText}`));
        if (scene.rewardItem) {
            console.log(chalk.green(`[Отримано: ${scene.rewardItem}]`));
            state.inventory.push(scene.rewardItem);
        }
    } else {
        console.log(chalk.gray(`\n${scene.failText}`));
    }

    state.visitedRooms.push(scene.id);
    console.log(chalk.gray('Ви виходите назад у коридор.'));
}

async function finishGame() {
    console.log(chalk.yellow('\n--- Ваша Кімната ---'));
    console.log(chalk.white('Ви повертаєтеся у свою кімнату і сідаєте за робочий стіл.'));
    getCraftingResult(state.inventory);
    process.exit(0);
}