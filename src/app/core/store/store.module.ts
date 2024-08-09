import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../../environments/environment';
import { WebState } from './web/web.state';
import { ServicesState } from './services/services.state';
import { ShopState } from './shop/shop.store';

@NgModule({
  imports: [
    NgxsModule.forRoot([WebState, ServicesState, ShopState], {
      developmentMode: !environment.production,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
})

export class StateModule {}
