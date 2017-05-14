import { Routes } from '@angular/router';
import { OrderCreatorComponent } from './order-creator';
import { OrderManagerComponent } from './order-manager';
import { NoContentComponent } from './no-content';

export const ROUTES: Routes = [
  { path: '',      component: OrderCreatorComponent },
  { path: 'order-creator',  component: OrderCreatorComponent },
  { path: 'order-manager', component: OrderManagerComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule'},
  { path: 'barrel', loadChildren: './+barrel#BarrelModule'},
  { path: '**',    component: NoContentComponent },
];
