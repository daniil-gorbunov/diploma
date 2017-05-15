import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'cafe-card',
  styles: [`
    .main-image {
      height: 300px;
    }
  `],
  templateUrl: './cafe-card.component.html',
})
export class CafeCardComponent {
  @Input() public cafe: any;
}
