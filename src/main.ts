import { SceneRepository } from './infrastructure/repository.js';
import { GameApp } from './application/gameLoop.js';

const repository = new SceneRepository();
const app = new GameApp(repository);

app.start();
