import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences.service';

interface Page {
  name: string;
  link: string;
  iconName: string;
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

  constructor(
    private userPreferencesService: UserPreferencesService,
    private themeService: ThemeService
  ) {
    this.pages = [
      {
        name: 'SYSTEM.PAGES.DASHBOARD',
        link: '/tasks/dashboard',
        iconName: 'dashboard',
      },
      {
        name: 'SYSTEM.PAGES.TASKS',
        link: '/tasks/tasks',
        iconName: 'task',
      },
    ];
  }

  ngOnInit(): void {
    this.selectPage(
      (this.selectedPage =
        localStorage.getItem('selectedPage') || this.pages[0].name)
    );

    this.themeSelectedValue =
      this.userPreferencesService.userPreferences.theme || 'light';
    this.onThemeModeChange({ value: this.themeSelectedValue });
  }

  onThemeModeChange(themeMode: any) {
    this.themeSelectedValue = themeMode.value;
    this.themeService.updateTheme(this.themeSelectedValue);
    this.userPreferencesService.userPreferences.theme = this.themeSelectedValue;
    this.userPreferencesService.userPreferencesChanges();
  }

  selectPage(pageName: string) {
    this.selectedPage = pageName;
    localStorage.setItem('selectedPage', this.selectedPage);
  }
}
