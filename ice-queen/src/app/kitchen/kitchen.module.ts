import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { KitchenRoutingModule } from './kitchen-routing.module';
import { NavBarChefComponent } from './nav-bar-chef/nav-bar-chef.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { KitchenComponent } from './kitchen.component';
import { KitchenPipe } from './pipes/kitchen.pipe';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    OrdersComponent,
    NavBarChefComponent,
    KitchenComponent,
    KitchenPipe,
    CardComponent,
  ],
  imports: [
    CommonModule,
    KitchenRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OrdersComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class KitchenModule { }
