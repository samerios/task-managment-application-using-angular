import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Page {
  name: string,
  link: string,
  iconName: string
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  pages: Page[];

  constructor() {
    this.pages = [
      {
        name: 'SYSTEM.PAGES.DASHBOARD',
        link: '/tasks/dashboard',
        iconName: 'dashboard'
      },
      {
        name: 'SYSTEM.PAGES.TASKS',
        link: '/tasks/tasks',
        iconName: 'task'
      },
    ];
  }
}
