import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutMinimalistComponent } from './pages/layout-minimalist/layout-minimalist.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutMinimalistComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home-minimalist/home-minimalist.module').then(
            (module) => module.HomeMinimalistModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MinimalistRoutingModule {}
