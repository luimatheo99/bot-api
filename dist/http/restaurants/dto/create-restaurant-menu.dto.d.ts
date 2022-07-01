declare type Additional = {
    description: string;
    price: number | null;
};
export declare class CreateRestaurantMenuDto {
    name: string;
    description: string | null;
    active: boolean;
    price: number | null;
    category: string;
    subCategory: string | null;
    additional: Additional[];
}
export {};
