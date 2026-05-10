import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Home2Component } from '../shared/component/home/home.component';
import { DialogProductViewComponent } from '../shared/components/dialog-product-view/dialog-product-view.component';

@NgModule({
  declarations: [
    DialogProductViewComponent,
    Home2Component,
  ],
  imports: [CommonModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, FormsModule],
})
export class SharedModule {}
