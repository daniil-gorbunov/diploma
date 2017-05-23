import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CafeService } from '../order-creator/cafe.service';
import { OrderService } from './order.service';
import { Order } from './models';
import { Cafe } from '../order-creator/cafe.model';

@Component({
  selector: 'order-manager',
  templateUrl: './order-manager.component.html',
  providers: [CafeService, OrderService],
})
export class OrderManagerComponent implements OnInit {

  public cafeId: number;
  public orders: Order[];
  public cafe: Cafe;

  constructor(
    public route: ActivatedRoute,
    private orderService: OrderService,
    private cafeService: CafeService,
  ) {}

  public ngOnInit() {
    this.route
      .queryParams
      .subscribe((params) => {
        this.cafeId = parseInt(params.cafeId, 10) || 0;
      });

    this.loadCafe(this.cafeId);
    this.loadOrders(this.cafeId);
  }

  private loadCafe(cafeId: number): void {
    this.cafeService.getCafe(cafeId)
      .subscribe((cafe: Cafe) => this.cafe = cafe);
  }

  private loadOrders(cafeId: number): void {
    this.orderService.getOrders({cafe__id: cafeId})
      .subscribe((orders: Order[]) => this.orders = orders);
  }
}
