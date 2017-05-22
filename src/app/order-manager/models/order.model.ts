import { OrderDish } from './order-dish.model';

export class Order {
  public id: number | null;
  public status: number;
  public comment: string;
  public userId: number;
  public cafeId: number;
  public dishes: OrderDish[];
}
