import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
        // Defaults to 0 if no query param provided.
        this.cafeId = params.cafeId || 0;
      });
    console.log(this.route.data);

    this.asyncDataWithWebpack();
  }
  private asyncDataWithWebpack() {
    setTimeout(() => {

      System.import('../../../assets/mock-data/mock-menu.json')
        .then((dishes) => {
          console.log('async mockData', dishes);
          this.dishes = dishes;
        });

    });
  }

}
