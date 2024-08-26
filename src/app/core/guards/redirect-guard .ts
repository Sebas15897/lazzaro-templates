import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { WebState } from '../store/web/web.state';

@Injectable({
  providedIn: 'root',
})

export class RedirectGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(): boolean {
    const template = this.store.selectSnapshot(WebState.webConfig)?.website?.template;

    if (template) {
      this.router.navigate([`/${template}/home`]);
      return false;
    }

    return true;
  }
}
