import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { environment } from '../../../environments/environment';
import { WebState } from './web/web.state';
import { ServicesState } from './services/services.state';
import { ShopState } from './shop/shop.store';
import { EventsState } from './events/events.state';
import { PortfolioState } from './portfolio/portfolio.state';
import { LoadingState } from './loading/loading.state';
import { ContactState } from './contact/contact.state';
import { PaymentState } from './payment/payment.state';

@NgModule({
  imports: [
    NgxsModule.forRoot(
      [
        WebState,
        ServicesState,
        ShopState,
        EventsState,
        PortfolioState,
        LoadingState,
        ContactState,
        PaymentState,
      ],
      {
        developmentMode: !environment.production,
      }
    ),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
})

export class StateModule {}
