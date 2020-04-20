import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Menu } from './menu.model';

@Injectable()
export class MenuService {

  private verticalMenuItems: Array<Menu> = [];
  private horizontalMenuItems: Array<Menu> = [];

  private home: string;
  private users: string;
  private categories: string;
  private subcategories: string;
  private prices: string;
  private states: string;
  private translation: string;

  constructor(private location: Location, private router: Router) {  }

  public getVerticalMenuItems(): Array<Menu> {

    this.verticalMenuItems.push(new Menu (1, 'Accueil', '/home', null, 'home', null, false, 0));
    this.verticalMenuItems.push(new Menu (2, 'Traçabilité', '/traceability', null, 'undo', null, false, 0));
    this.verticalMenuItems.push(new Menu (3, 'Température', '/temperature', null, 'wb_sunny', null, false, 0));

    return this.verticalMenuItems;
  }

  public getHorizontalMenuItems(): Array<Menu> {

    this.horizontalMenuItems.push(new Menu (1, 'Accueil', '/home', null, 'home', null, false, 0));
    this.horizontalMenuItems.push(new Menu (2, 'Traçabilité', '/traceability', null, 'undo', null, false, 0));
    this.horizontalMenuItems.push(new Menu (3, 'Température', '/temperature', null, 'wb_sunny', null, false, 0));

    return this.horizontalMenuItems;
  }

  public expandActiveSubMenu(menu: Array <Menu>) {
      let url = this.location.path();
      let routerLink = url; // url.substring(1, url.length);
      let activeMenuItem = menu.filter(item => item.routerLink === routerLink);
      if (activeMenuItem[0]) {
        let menuItem = activeMenuItem[0];
        while (menuItem.parentId != 0) {
          let parentMenuItem = menu.filter(item => item.id == menuItem.parentId)[0];
          menuItem = parentMenuItem;
          this.toggleMenuItem(menuItem.id);
        }
      }
  }

  public toggleMenuItem(menuId){
    let menuItem = document.getElementById('menu-item-' + menuId);
    let subMenu = document.getElementById('sub-menu-' + menuId);
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
      } else {
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId) {
    let currentMenuItem = menu.filter(item => item.id == menuId)[0];
    if(currentMenuItem.parentId == 0 && !currentMenuItem.target) {
      menu.forEach(item => {
        if (item.id != menuId) {
          let subMenu = document.getElementById('sub-menu-' + item.id);
          let menuItem = document.getElementById('menu-item-' + item.id);
          if (subMenu) {
            if (subMenu.classList.contains('show')) {
              subMenu.classList.remove('show');
              menuItem.classList.remove('expanded');
            }
          }
        }
      });
    }
  }
}
