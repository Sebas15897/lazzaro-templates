import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'clasic',
    loadChildren: () =>
      import('./templates/clasic/clasic.module').then(
        (module) => module.ClasicModule
      ),
  },
  {
    path: 'minimalist',
    loadChildren: () =>
      import('./templates/minimalist/minimalist.module').then(
        (module) => module.MinimalistModule
      ),
  },
  {
    path: 'modern',
    loadChildren: () =>
      import('./templates/modern/modern.module').then(
        (module) => module.ModernModule
      ),
  },
  {
    path: '**',
    redirectTo: 'clasic',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
