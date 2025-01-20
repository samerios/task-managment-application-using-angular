import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs';
import { AccountService } from 'src/app/core/services/account.service';
import { UserPreferencesService } from 'src/app/core/services/user-preferences.service';

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
    private translate: TranslateService,
    private userPreferencesService: UserPreferencesService,
    public accountService: AccountService
  ) {
    this.menuItemConfig = [{ icon: 'logout', name: 'SYSTEM.LOGOUT' }];

    this.languages = [
      { option: 'en', label: 'English' },
      { option: 'he', label: 'עברית' },
    ];
  }

  ngOnInit(): void {
    this.selectedLanguage =
      this.userPreferencesService?.userPreferences?.language || 'en';
    this.languageSelectionChange({ value: this.selectedLanguage });
  }

  menuItemOnClick(icon: MenuItemConfig) {
    switch (icon.icon) {
      case 'logout':
        this.languageSelectionChange({ value: this.selectedLanguage });
        this.accountService.logout().pipe(take(1)).subscribe();
        break;
      default:
        break;
    }
  }

  languageSelectionChange(e: any) {
    this.userPreferencesService.userPreferences.language =
      this.selectedLanguage;
    this.userPreferencesService.userPreferencesChanges();

    this.translate.use(e.value);
    document.documentElement.setAttribute(
      'dir',
      e.value == 'he' ? 'rtl' : 'ltr'
    );
  }
}
