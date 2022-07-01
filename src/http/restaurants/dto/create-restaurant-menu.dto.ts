type Additional = {
  description: string;
  price: number | null;
};

export class CreateRestaurantMenuDto {
  name: string;
  description: string | null;
  active: boolean;
  price: number | null;
  category: string;
  subCategory: string | null;
  additional: Additional[];
}
