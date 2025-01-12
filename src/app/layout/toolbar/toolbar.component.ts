import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth-service.service';
import { UserService } from 'src/app/core/services/user.service';

interface MenuItemConfig {
  icon: string;
  name: string;
}

interface ListConfig {
  option: string;
  label: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent implements OnInit {
  menuItemConfig: MenuItemConfig[];

  languages: ListConfig[];

  selectedLanguage: 'en' | 'he' = 'en';

  constructor(
    private authService: AuthService,
    private translate: TranslateService,
    private userService: UserService
  ) {
    this.menuItemConfig = [{ icon: 'logout', name: 'SYSTEM.LOGOUT' }];

    this.languages = [
      { option: 'en', label: 'English' },
      { option: 'he', label: 'עברית' },
    ];
  }

  ngOnInit(): void {
    this.selectedLanguage =
      this.userService.getCurrentUser?.userPreferences?.language || 'en';
    this.languageSelectionChange({ value: this.selectedLanguage });
  }

  menuItemOnClick(icon: MenuItemConfig) {
    switch (icon.icon) {
      case 'logout':
        this.languageSelectionChange({ value: this.selectedLanguage });
        this.authService.logout();
        break;
      default:
        break;
    }
  }

  languageSelectionChange(e: any) {
    this.userService.userPreferencesChanges('language', this.selectedLanguage);
    this.translate.use(e.value);
    document.documentElement.setAttribute(
      'dir',
      e.value == 'he' ? 'rtl' : 'ltr'
    );
  }
}
