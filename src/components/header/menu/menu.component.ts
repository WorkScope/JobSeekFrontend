import { Component, QueryList, ViewChildren } from '@angular/core';
import { MenuItem } from '../header.types';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

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
    {
    id: 'settings2',
    label: 'Settings2',
    icon: 'settings',
    link: '/settings2',
    children: [
      { id: 'profile2', label: 'Profile2', link: '/settings2/profile2' },
      { id: 'security2', label: 'Security2', link: '/settings2/security2' },
    ],
  },
];

@Component({
  selector: 'app-navigation-menu',
  imports: [CommonModule, MatMenuModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [MenuService],
})
export class MenuComponent {
  menu$!: Observable<MenuItem[]>;
  selectedItemId$!: Observable<string | null>;
  @ViewChildren(MatMenuTrigger) triggers!: QueryList<MatMenuTrigger>;

  hoveredItemId: string | null = null;

  constructor(public menuService: MenuService, private router: Router) {
    this.menu$ = this.menuService.getMenu$();
    this.selectedItemId$ = this.menuService.getSelectedItemId$();
  }

  ngOnInit() {
    this.menuService.setMenu(menu);
  }

  onTriggerClick(item: MenuItem, $event: Event) {
    
    $event.preventDefault();
    $event.stopImmediatePropagation();
    this.menuService.selectItem(item.id);
    if (item.link) {
      this.router.navigateByUrl(item.link);
    }
  }

  onMouseEnter(item: MenuItem, i : number) {
    //find trigger for the item
    if (item.children && item.children.length > 0) {
      this.triggers.toArray()[i].openMenu();
      this.hoveredItemId = item.id;
    }
  }

  onMouseLeave(item: MenuItem, i: number, $event: MouseEvent) {

    const related = $event.relatedTarget as HTMLElement | null;

    if (!related) {
      this.triggers.toArray()[i].closeMenu();
      return;
    }
    if (related.closest('.mat-mdc-menu-panel') || related.closest('.cdk-overlay-pane')) {
      return;
    }
    this.triggers.toArray()[i].closeMenu();
  }

  onChildClick(childItem: MenuItem, event: Event) {
    event.stopPropagation();
    this.menuService.selectItem(childItem.id);
    if (childItem.link) {
      this.router.navigateByUrl(childItem.link);
    }
    this.hoveredItemId = null;
  }
}
