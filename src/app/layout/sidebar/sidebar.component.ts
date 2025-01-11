import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/auth/services/theme.service';
import { UserService } from 'src/app/core/auth/services/user.service';

interface Page {
  name: string,
  link: string,
  iconName: string
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {

  themeSelectedValue: 'light' | 'dark' = 'light';

  pages: Page[];

  selectedPage!: string;

  constructor(private userService: UserService, private themeService: ThemeService) {
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

  ngOnInit(): void {
    this.selectPage(this.selectedPage = localStorage.getItem('selectedPage') || this.pages[0].name);

    this.themeSelectedValue = this.userService.getCurrentUser?.userPreferences?.theme || 'light';
    this.onThemeModeChange({ value: this.themeSelectedValue });
  }

  onThemeModeChange(themeMode: any) {
    this.themeSelectedValue = themeMode.value;
    this.themeService.updateTheme(this.themeSelectedValue)
    this.userService.userPreferencesChanges('theme', this.themeSelectedValue);
  }

  selectPage(pageName: string) {
    this.selectedPage = pageName;
    localStorage.setItem('selectedPage', this.selectedPage)
  }
}
