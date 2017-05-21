import {
  Component,
  OnInit,
} from '@angular/core';
import { Cafe } from './cafe.model';
import { CafeService } from './cafe.service';

@Component({
  selector: 'order-creator',
  styles: [`
    .cafe-card-container {
      margin: 0 10px;
    }
  `],
  templateUrl: './order-creator.component.html',
  providers: [CafeService],
})
export class OrderCreatorComponent implements OnInit {

  public cafes: Cafe[];

  constructor(
    private cafeService: CafeService
  ) {}

  public ngOnInit(): void {
    this.loadCafes();
  }

  private loadCafes(): void {
    this.cafeService.getCafes()
      .subscribe((cafes: Cafe[]) => this.cafes = cafes);
  }

}
