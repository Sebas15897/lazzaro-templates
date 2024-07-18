import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeModernComponent } from './home-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeModernComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HomeModernRoutingModule {}
