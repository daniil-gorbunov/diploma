import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdToolbarModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const modules = [
  CommonModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  MdButtonModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdToolbarModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {
}
