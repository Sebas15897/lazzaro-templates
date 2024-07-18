import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LayoutModernComponent } from './pages/layout-modern/layout-modern.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutModernComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home-modern/home-modern.module').then(
            (module) => module.HomeModernModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ModernRoutingModule {}
