export const sumProperty = (arr: any[], property: string): number => {
    return arr.reduce((acc, item) => acc + item[property], 0);
};