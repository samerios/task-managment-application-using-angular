import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/auth/services/auth-service.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { take } from 'rxjs';


interface MenuItemConfig {
  icon: string,
  name: string
}

interface ListConfig {
  option: string;
  label: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})

export class ToolbarComponent implements OnInit {

  menuItemConfig: MenuItemConfig[];

  languages: ListConfig[];

  selectedLanguage: 'en' | 'he' = 'en';

  constructor(private authService: AuthService, private translate: TranslateService, private localStorageService: LocalStorageService) {
    this.menuItemConfig = [
      { icon: 'logout', name: 'SYSTEM.LOGOUT' }
    ];

    this.languages = [
      { option: 'en', label: 'English' },
      { option: 'he', label: 'עברית' }
    ];
  }

  ngOnInit(): void {
    this.selectedLanguage = this.authService.getCurrentUser()?.userPreferences?.language || 'en';

    this.languageSelectionChange({ value: this.selectedLanguage });
  }

  menuItemOnClick(icon: MenuItemConfig) {
    switch (icon.icon) {
      case 'logout':
        this.authService.getCurrentUser().userPreferences.language = this.selectedLanguage;
        this.authService.logout();
        break;
      default:
        break
    }
  }

  languageSelectionChange(e: any) {

    let currentUser = typeof this.authService.getCurrentUser() == "string" ? JSON.parse(this.authService.getCurrentUser().toString()) : this.authService.getCurrentUser();
    currentUser.userPreferences.language = this.selectedLanguage;
    this.authService.currentUser = currentUser;
    this.localStorageService.setItem('currentUser', JSON.stringify(currentUser))
    this.authService.updateUserPreferences().pipe(take(1)).subscribe(() => { });

    this.translate.use(e.value);
    document.documentElement.setAttribute('dir', e.value == 'he' ? 'rtl' : 'ltr');
  }
}
