import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  pages: Page[] = [
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

  selectedPage!: Page;

  constructor(
    private userPreferencesService: UserPreferencesService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let selectedPage: any = localStorage.getItem('selectedPage')
      ? this.pages.find((x) => x.name == localStorage.getItem('selectedPage'))
      : this.pages[0];
    this.selectPage(selectedPage);

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

  selectPage(selectedPage: Page) {
    this.selectedPage = selectedPage;
    localStorage.setItem('selectedPage', this.selectedPage.name);
    this.router.navigate([selectedPage.link]);
  }
}
