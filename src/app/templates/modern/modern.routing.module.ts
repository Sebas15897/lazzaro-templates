import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutModernComponent } from './pages/layout-modern/layout-modern.component';
import { TermsConditionsComponent } from '../../shared/terms-conditions/terms-conditions.component';
import { TransparencyComponent } from '../../shared/transparency/transparency.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutModernComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home-modern/home-modern.module').then(
            (module) => module.HomeModernModule
          ),
      },
      {
        path: 'store',
        loadChildren: () =>
          import('./pages/store-modern/store-modern.module').then(
            (module) => module.StoreModernModule
          ),
      },
      {
        path: 'events/:eventId',
        loadChildren: () =>
          import('./pages/event-modern/event-modern.module').then(
            (module) => module.EventModernModule
          ),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./pages/blog-modern/blog-modern.module').then(
            (module) => module.BlogModernModule
          ),
      },
      {
        path: 'portafolio/:porfolioId',
        loadChildren: () =>
          import('./pages/portafolio-modern/portafolio-modern.module').then(
            (module) => module.PortafolioModernModule
          ),
      },
      {
        path: 'product/:productid',
        loadChildren: () =>
          import('./pages/product-modern/product-modern.module').then(
            (module) => module.ProductModernModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./pages/contact-modern/contact-modern.module').then(
            (module) => module.ContactModernModule
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
        path: 'pay-service/:serviceId',
        loadChildren: () =>
          import('./pages/pay-service/pay-service.module').then(
            (module) => module.PayServiceModule
          ),
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
export class ModernRoutingModule {}
