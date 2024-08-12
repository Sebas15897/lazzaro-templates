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
      {
        path: 'portafolio',
        loadChildren: () =>
          import(
            './pages/portafolio-minimalist/portafolio-minimalist.module'
          ).then((module) => module.PortafolioMinimalistModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./pages/events-minimalist/events-minimalist.module').then(
            (module) => module.EventsMinimalistModule
          ),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./pages/blog-minimalist/blog-minimalist.module').then(
            (module) => module.BlogMinimalistModule
          ),
      },
      {
        path: 'store',
        loadChildren: () =>
          import('./pages/store-minimalist/store-minimalist.module').then(
            (module) => module.StoreMinimalistModule
          ),
      },
      {
        path: 'product/:productid',
        loadChildren: () =>
          import('./pages/product-minimalist/product-minimalist.module').then(
            (module) => module.ProductMinimalistModule
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
