import inquirer from 'inquirer';
import chalk from 'chalk';
import { CharacterScene } from './interfaces.js';

export async function askPlayerName(): Promise<string> {
    const answer = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: chalk.blue('Введіть ваше ім\'я, щоб увійти в коридор:')
    }]);
    return answer.name || 'Мандрівник';
}

export async function askHallwayChoice(availableRooms: CharacterScene[], hasVisitedOwnRoom: boolean): Promise<string> {
    const choices = availableRooms.map(room => ({
        name: chalk.green(`Зайти в ${room.roomName}`),
        value: room.id
    }));

    choices.push({
        name: chalk.yellow('Повернутися у свою кімнату (Майстерня)'),
        value: 'own_room'
    });

    const answer = await inquirer.prompt([{
        type: 'select',
        name: 'choice',
        message: chalk.blue('Ви стоїте у довгому коридорі. Куди підете?'),
        choices
    }]);

    return answer.choice;
}

export async function askAction(scene: CharacterScene): Promise<'help' | 'rude'> {
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