import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutClasicComponent } from './pages/layout-clasic/layout-clasic.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutClasicComponent,
    children: [
      
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home-clasic/home-clasic.module').then(
            (module) => module.HomeClasicModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasicRoutingModule {}
