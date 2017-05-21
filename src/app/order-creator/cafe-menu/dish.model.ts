class DishCategory {
  public id: number;
  public name: string;
}

class Dish {
  public id: number;
  public name: string;
  public weight: string;
  public price: number;
  public description: string;
  public category: DishCategory;
  public quantity: number;
  public cafeId: number;
}

export {
  Dish,
  DishCategory,
};
