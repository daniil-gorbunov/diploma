import { Component, Input } from '@angular/core';

import { Order } from '../models';

@Component({
  selector: 'order-card',
  templateUrl: './order-card.component.html',
})
export class OrderCardComponent {
  @Input() public order: Order;
}
