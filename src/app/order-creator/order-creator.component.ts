import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'order-creator',
  styles: [`
  `],
  templateUrl: './order-creator.component.html',
})
export class OrderCreatorComponent implements OnInit {
  @Input() public cafes: any[];

  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        // your resolved data from route
        this.localState = data.yourData;
      });

    console.log('hello `About` component');
    this.asyncDataWithWebpack();
  }

  private asyncDataWithWebpack() {
    setTimeout(() => {

      System.import('../../assets/mock-data/mock-cafe.json')
        .then((cafes) => {
          console.log('async mockData', cafes);
          this.cafes = cafes;
        });

    });
  }

}
