export type Food = {
    id: number;
    name: string;
    portion: number;
    protein: number;
    calories: number;
    grease: number;
    salt: number;
    image?: string;
}

export type FoodInfoNutriDay = Food & {
    qtde: number;
};

