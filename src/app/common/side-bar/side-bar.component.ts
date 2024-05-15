import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  openSidebar: boolean = true;

  menuSidebar = [
    {
      link_name: 'Register',
      link: '/home/register',
      icon: 'fa fa-edit',
      sub_menu: [],
    },
    {
      link_name: 'List',
      link: './list',
      icon: 'fa fa-table',
      sub_menu: [],
    },
  ];

  constructor(private router: Router) {}
  showSubmenu(itemEl: HTMLElement) {
    itemEl.classList.toggle('showMenu');
  }
  onShowHide() {
    this.openSidebar = !this.openSidebar;
  }
  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
