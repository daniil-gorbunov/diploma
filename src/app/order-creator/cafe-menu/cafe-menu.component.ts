import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Cafe } from '../cafe.model';
import { Dish } from './dish.model';
import { DishService } from './dish.service';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'cafe-menu',
  styles: [`
    .dish-item:hover {
      background-color: aliceblue;
    }
  `],
  templateUrl: './cafe-menu.component.html',
  providers: [CafeService, DishService],
})
export class CafeMenuComponent implements OnInit {

  public arrangedDishes;
  public dishes: Dish[];
  public cafe: Cafe;
  public cafeId: number;

  constructor(
    public route: ActivatedRoute,
    private cafeService: CafeService,
    private dishService: DishService
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
