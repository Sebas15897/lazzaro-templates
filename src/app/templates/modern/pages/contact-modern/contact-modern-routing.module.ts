import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactModernComponent } from './contact-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: ContactModernComponent,
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ContactModernRoutingModule {}
