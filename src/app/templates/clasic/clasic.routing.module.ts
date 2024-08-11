import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutClasicComponent } from './pages/layout-clasic/layout-clasic.component';
import { TermsConditionsComponent } from '../../shared/terms-conditions/terms-conditions.component';
import { TransparencyComponent } from '../../shared/transparency/transparency.component';

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
      {
        path: 'store',
        loadChildren: () =>
          import('./pages/store-clasic/store-clasic.module').then(
            (module) => module.StoreClasicModule
          ),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./pages/event-clasic/event-clasic.module').then(
            (module) => module.EventClasicModule
          ),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./pages/blog-clasic/blog-clasic.module').then(
            (module) => module.BlogClasicModule
          ),
      },
      {
        path: 'portafolio',
        loadChildren: () =>
          import('./pages/portafolio-clasic/portafolio-clasic.module').then(
            (module) => module.PortafolioModule
          ),
      },
      {
        path: 'product/:productid',
        loadChildren: () =>
          import('./pages/product-clasic/product-clasic.module').then(
            (module) => module.ProductClasicModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./pages//contact-clasic/contact-clasic.module').then(
            (module) => module.ContactClasicModule
          ),
      },
      {
        path: 'terms',
        component: TermsConditionsComponent,
      },
      {
        path: 'transparency',
        component: TransparencyComponent,
      },
      {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClasicRoutingModule {}
