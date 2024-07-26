import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactComponent } from './contact.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ContactClasicRoutingModule {}