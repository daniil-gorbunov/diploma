import { Dish, DishCategory } from './models';
export const DISHES: Dish[] = [
  {
    id: 1,
    name: 'Весенний',
    weight: '100г',
    price: 10.52,
    description: 'Салат Весенний вкусный',
    category: {
      id: 1,
      name: 'Салаты'
    },
    quantity: 0,
    cafeId: 1,
  }, {
    id: 2,
    name: 'Суп',
    weight: '100г',
    price: 1.10,
    description: 'Просто суп',
    category: {
      id: 2,
      name: 'Первые блюда'
    },
    quantity: 0,
    cafeId: 1,
  }, {
    id: 3,
    name: 'Осенний',
    weight: '100г',
    price: 8.15,
    description: 'Салат Осенний невкусный',
    category: {
      id: 1,
      name: 'Салаты'
    },
    quantity: 0,
    cafeId: 1,
  }
];
