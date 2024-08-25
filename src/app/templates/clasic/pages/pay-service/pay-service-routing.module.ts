import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PayServiceComponent } from './pay-service.component';

export const routes: Routes = [
  {
    path: '',
    component: PayServiceComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PayServiceRoutingModule {}
