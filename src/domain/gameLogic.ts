export const ALL_ARTIFACTS_COUNT = 4;

export function isCraftingSuccessful(inventory: string[]): boolean {
    return inventory.length === ALL_ARTIFACTS_COUNT;
}
