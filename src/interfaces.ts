export interface CharacterScene {
    id: string;
    roomName: string;
    characterName: string;
    description: string;
    problem: string;
    helpChoice: string;
    rudeChoice: string;
    successText: string;
    failText: string;
    rewardItem: string | null;
}

export interface GameState {
    playerName: string;
    inventory: string[];
    visitedRooms: string[];
}