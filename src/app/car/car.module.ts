import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { CarPageComponent } from './pages/car-page/car-page.component';
import { CardComponent } from './components/card/card.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CarPageComponent,
    CardComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    CarRoutingModule,


  ]
})
export class CarModule { }
