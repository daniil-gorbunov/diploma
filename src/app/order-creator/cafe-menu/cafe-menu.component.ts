import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

import { Cafe } from '../cafe.model';
import { Dish } from './models';
import { Order } from '../../order-manager/models';
import { DishService } from './dish.service';
import { CafeService } from '../cafe.service';
import { OrderService } from '../../order-manager/order.service';

@Component({
  selector: 'cafe-menu',
  styleUrls: ['styles.scss'],
  templateUrl: './cafe-menu.component.html',
  providers: [CafeService, DishService, OrderService],
})
export class CafeMenuComponent implements OnInit {

  public arrangedDishes;
  public dishes: Dish[];
  public cafe: Cafe;
  public cafeId: number;
  public comment: string = '';

  constructor(
    public route: ActivatedRoute,
    private cafeService: CafeService,
    private dishService: DishService,
    private orderService: OrderService
  ) {}

  public ngOnInit(): void {
    this.route
      .queryParams
      .subscribe((params) => {
        this.cafeId = parseInt(params.cafeId, 10) || 0;
      });

    this.loadCafe(this.cafeId);
    this.loadDishes(this.cafeId);
  }

  public add(dish: Dish): void {
    if (dish.quantity < 3) {
      dish.quantity++;
    }
  }

  public remove(dish: Dish): void {
    if (dish.quantity > 0) {
      dish.quantity--;
    }
  }

  public getTotalPrice(): number {
    function sum(sum: number, dish: Dish) {
      return sum + dish.price * dish.quantity;
    }
    return +_.reduce(this.dishes, sum, 0);
  }

  public saveOrder() {
    const params = {
      cafe: {
        pk: this.cafeId,
      },
      comment: this.comment,
      user: {
        pk: 1,
      },
      dishes: _.chain(this.dishes)
        .filter((dish) => dish.quantity > 0)
        .map((dish) => {
          return {
            dish: {
              pk: dish.id,
            },
            price: dish.price,
            quantity: dish.quantity,
          };
        })
        .value(),
    };
    this.orderService.saveOrder(params)
      .subscribe(
        (respOrder: Order) => console.log(respOrder)
      );
  }

  private loadCafe(cafeId: number): void {
    this.cafeService.getCafe(cafeId)
      .subscribe((cafe: Cafe) => this.cafe = cafe);
  }

  private loadDishes(cafeId: number): void {
    const params = {
      cafe: cafeId,
      limit: 0,
    };
    this.dishService.getDishes(params)
      .subscribe(
        (dishes: Dish[]) => {
          this.dishes = dishes;
          this.arrangedDishes = this.arrangeByCategories(this.dishes);
        }
      );
  }

  private arrangeByCategories(dishes: Dish[]) {
    let arrangedDishes = _.groupBy(dishes, (dish: Dish) => dish.category.name);
    return _.map(arrangedDishes, (dish: Dish, category: string) => {
      return {
        category,
        dishes: arrangedDishes[category],
      };
    });
  }
}
