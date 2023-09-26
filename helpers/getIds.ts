// Função genérica para extrair IDs de um array de objetos
export const extractIds = <T extends { id: number }>(objects: T[]): number[] => {
    return objects.map(obj => obj.id);
}

// Exemplo de uso com objetos que têm uma propriedade "id"
const foods = [
    { id: 1, name: "Food 1" },
    { id: 2, name: "Food 2" },
];

const users = [
    { id: 101, name: "User 1" },
    { id: 102, name: "User 2" },
];

const foodIds = extractIds(foods);
const userIds = extractIds(users);

console.log(foodIds); // [1, 2]
console.log(userIds); // [101, 102]