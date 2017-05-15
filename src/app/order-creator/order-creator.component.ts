import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'order-creator',
  styles: [`
    .cafe-card-container {
      margin: 0 10px;
    }
  `],
  templateUrl: './order-creator.component.html',
})
export class OrderCreatorComponent implements OnInit {

  public cafes: any[];

  public ngOnInit() {
    this.asyncDataWithWebpack();
  }

  private asyncDataWithWebpack() {
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-cafe.json')
        .then((cafes) => {
          this.cafes = cafes;
        });

    });
  }
}
