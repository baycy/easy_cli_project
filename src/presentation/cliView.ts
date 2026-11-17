import inquirer from 'inquirer';
import chalk from 'chalk';
import { CharacterScene } from '../domain/models.js';

export async function askPlayerName(): Promise<string> {
    console.log(chalk.cyan('=== ВЕЛИКИЙ БУДИНОК ===\n'));
    const answer = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: chalk.blue('Введіть ваше ім\'я, щоб увійти в коридор:')
    }]);
    return answer.name || 'Мандрівник';
}

export function showInventory(inventory: string[]): void {
    console.log(chalk.gray(`\nВаш інвентар: [${inventory.length ? inventory.join(', ') : 'Порожньо'}]`));
}

export async function askHallwayChoice(availableRooms: CharacterScene[]): Promise<string> {
    const choices = availableRooms.map(room => ({
        name: chalk.green(`Зайти в ${room.roomName}`),
        value: room.id
    }));
    choices.push({ name: chalk.yellow('Повернутися у свою кімнату (Майстерня)'), value: 'own_room' });

    const answer = await inquirer.prompt([{
        type: 'select',
        name: 'choice',
        message: chalk.blue('Ви стоїте у довгому коридорі. Куди підете?'),
        choices
    }]);
    return answer.choice;
}

export async function playSceneView(scene: CharacterScene): Promise<'help' | 'rude'> {
    console.log(chalk.yellow(`\n--- ${scene.roomName} ---`));
    console.log(chalk.white(scene.description));
    console.log(chalk.cyan(`${scene.characterName} каже: ${scene.problem}`));

    const answer = await inquirer.prompt([{
        type: 'select',
        name: 'action',
        message: chalk.blue('Як ви вчините?'),
        choices: [
            { name: chalk.green(scene.helpChoice), value: 'help' },
            { name: chalk.red(scene.rudeChoice), value: 'rude' }
        ]
    }]);
    return answer.action;
}

export function showSceneResult(success: boolean, text: string, item: string | null): void {
    if (success) {
        console.log(chalk.magenta(`\n${text}`));
        if (item) console.log(chalk.green(`[Отримано: ${item}]`));
    } else {
        console.log(chalk.gray(`\n${text}`));
    }
    console.log(chalk.gray('Ви виходите назад у коридор.'));
}

export function showCraftingEnding(isSuccess: boolean): void {
    console.log(chalk.yellow('\n--- Ваша Кімната ---'));
    console.log(chalk.white('Ви повертаєтеся у свою кімнату і сідаєте за робочий стіл.'));
    
    if (isSuccess) {
        console.log(chalk.yellow('\nВи розкладаєте на столі зібрані матеріали.'));
        console.log(chalk.magenta('З\'єднавши їх, ви створюєте Магічний компас затишку! Він завжди вказуватиме шлях додому.'));
        console.log(chalk.green('*** ВИ ЗДОБУЛИ ІСТИННУ КІНЦІВКУ ***\n'));
    } else {
        console.log(chalk.gray('\nВи дивитеся на свої порожні руки (або неповний набір речей).'));
        console.log(chalk.gray('Вам не вистачає матеріалів, щоб створити щось особливе.'));
        console.log(chalk.gray('*** ЗВИЧАЙНА КІНЦІВКА ***\n'));
    }
}
