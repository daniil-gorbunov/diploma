import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

import { Cafe } from '../cafe.model';
import { Dish } from './models';
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
    private router: Router,
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
    const dishes = _.chain(this.dishes)
      .filter((dish) => dish.quantity > 0)
      .map((dish) => {
        return {
          dish: `/api/v1/cafe/${dish.id}/`,
          dish_id: dish.id,
          quantity: dish.quantity,
          category: dish.category,
          price: dish.price,
          cafe: `/api/v1/cafe/${this.cafeId}/`,
        };
      })
      .value();

    if (!dishes.length) {
      alert('Закажите что-либо');
      return;
    }

    const userId = _.random(1, 21);
    const params = {
      cafe: `/api/v1/cafe/${this.cafeId}/`,
      comment: this.comment,
      user: `/api/v1/user/${userId}/`,
      dishes,
    };

    this.orderService.saveOrder(params)
      .subscribe(
        (isOk: boolean) => isOk ? this.router.navigateByUrl('order-creator') : null
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
