import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './test/carousel/carousel.component';

const routes: Routes = [
  { path: 'car', loadChildren: ()=> import('./car/car.module').then( m => m.CarModule)},
  { path: 'test', component: CarouselComponent}
  ,{ path: '**', redirectTo: 'car' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
