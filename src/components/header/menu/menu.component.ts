import { Component, QueryList, ViewChildren } from '@angular/core';
import { MenuItem } from '../header.types';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatMenuTrigger } from '@angular/material/menu';

export const menu = [
  { id: 'home', label: 'Home', link: '/home', icon: 'home' },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'settings',
    link: '/settings',
    children: [
      { id: 'profile', label: 'Profile', link: '/settings/profile' },
      { id: 'security', label: 'Security', link: '/settings/security' },
    ],
  },
];

@Component({
  selector: 'app-navigation-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [MenuService],
})
export class MenuComponent {
  menu$!: Observable<MenuItem[]>;
  selectedItemId$!: Observable<string | null>;
  @ViewChildren(MatMenuTrigger) triggers!: QueryList<MatMenuTrigger>;
  childMenuMap = new Map<string, MatMenuTrigger>();


  constructor(public menuService: MenuService, private router: Router) {
    this.menu$ = this.menuService.getMenu$();
    this.selectedItemId$ = this.menuService.getSelectedItemId$();

  }

  ngOnInit() {

    this.menuService.setMenu(menu);
  }

  onClick(item: MenuItem) {
    this.menuService.selectItem(item.id);
    if (item.link) {
      this.router.navigateByUrl(item.link);
    }
  }
}
