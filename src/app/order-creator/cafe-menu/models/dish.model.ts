import { DishCategory } from './dish-category.model';

export class Dish {
  public id: number;
  public name: string;
  public weight: string;
  public price: number;
  public description: string;
  public category: DishCategory;
  public quantity: number;
  public cafeId: number;
}
