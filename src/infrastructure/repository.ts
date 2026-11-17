import { CharacterScene } from '../domain/models.js';
import { characters } from './storyData.js';

export class SceneRepository {
    getUnvisitedRooms(visitedIds: string[]): CharacterScene[] {
        return characters.filter(c => !visitedIds.includes(c.id));
    }

    getSceneById(id: string): CharacterScene | undefined {
        return characters.find(c => c.id === id);
    }
}
