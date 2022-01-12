import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-tabmenu',
  templateUrl: './tabmenu.component.html',
  styleUrls: ['./tabmenu.component.css'],
})
export class TabmenuComponent {
  items!: MenuItem[];

  activeItem!: MenuItem;

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        label: 'Posts',
        icon: 'pi pi-fw pi-table',
        routerLink: ['/posts'],
      },
      {
        label: 'Insert / Edit',
        icon: 'pi pi-fw pi-save',
        routerLink: ['/posts/form/insert'],
      },
    ];
    if (window.location.href.includes('form/')) {
      this.activeItem = this.items[1];
    } else {
      this.activeItem = this.items[0];
    }
  }
}
