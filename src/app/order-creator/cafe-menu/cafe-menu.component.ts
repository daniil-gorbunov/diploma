import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'cafe-menu',
  styles: [`
  `],
  templateUrl: './cafe-menu.component.html',
})
export class CafeMenuComponent implements OnInit {

  public dishes: any[];
  public cafeId: number;

  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route
      .queryParams
      .subscribe((params) => {
        this.cafeId = params.cafeId || 0;
      });

    this.asyncDataWithWebpack();
  }

  public add(dish) {
    if (dish.quantity < 3){
      dish.quantity++;
    }
  }

  public remove(dish) {
    if (dish.quantity > 0){
      dish.quantity--;
    }
  }

  private asyncDataWithWebpack() {
    setTimeout(() => {

      System.import('../../../assets/mock-data/mock-menu.json')
        .then((dishes) => {
          console.log('async mockData', dishes);
          this.dishes = dishes;
          _.each(this.dishes, (dish) => _.set(dish, 'quantity', 0));
        });

    });
  }

}
