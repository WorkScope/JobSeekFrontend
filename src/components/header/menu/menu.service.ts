// menu.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { MenuItem } from '../header.types';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuItems$ = new BehaviorSubject<MenuItem[]>([]);
  private selectedItemId$ = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.syncWithRoute();
      });
  }
  setMenu(menuItems: MenuItem[]) {
    this.menuItems$.next(menuItems);
    this.syncWithRoute();
  }

  getMenu$(): Observable<MenuItem[]> {
    return this.menuItems$.asObservable();
  }

  getSelectedItemId$() {
    return this.selectedItemId$.asObservable();
  }

  selectItem(id: string) {
    this.selectedItemId$.next(id);
  }

  isActive(item: MenuItem): boolean {
    return this.selectedItemId$.getValue() === item.id;
  }

  private syncWithRoute() {
    const currentUrl = this.router.url;
    const matched = this.findMenuItemByLink(currentUrl, this.menuItems$.getValue());
    if (matched) {
      this.selectedItemId$.next(matched.id);
    }
  }

  private findMenuItemByLink(url: string, items: MenuItem[]): MenuItem | null {
    for (const item of items) {
      if (item.link === url) return item;
      if (item.children) {
        const found = this.findMenuItemByLink(url, item.children);
        if (found) return found;
      }
    }
    return null;
  }
}
