import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class FaviconService {
  constructor() {}

  updateFavicon(iconUrl: string) {
    const link: HTMLLinkElement | null =
      document.querySelector("link[rel*='icon']");
    if (link) {
      link.href = iconUrl;
    } else {
      const newLink: HTMLLinkElement = document.createElement('link');
      newLink.rel = 'icon';
      newLink.href = iconUrl;
      document.head.appendChild(newLink);
    }
  }
}
