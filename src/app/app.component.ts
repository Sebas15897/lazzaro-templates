import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetWebConfigction, GetWebDataAction } from './core/store/web/web.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private store: Store) {
    this.store.dispatch(new GetWebConfigction());
  }
}
