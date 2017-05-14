import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdIconModule, MdInputModule, MdToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const modules = [
  CommonModule,
  BrowserAnimationsModule,
  FlexLayoutModule,
  MdButtonModule,
  MdIconModule,
  MdInputModule,
  MdToolbarModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {
}
