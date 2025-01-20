import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from './core/services/account.service';
import { ThemeService } from './core/services/theme.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    public accountService: AccountService,
    public themeService: ThemeService
  ) {
    this.translate.addLangs(['en', 'he']);
    this.translate.setDefaultLang('en');

    let browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.use(browserLang.match(/en|he/) ? browserLang : 'en');

    if (accountService.getAuthState() && !accountService.getCurrentUser) {
      this.accountService.getUserInfo().pipe(take(1)).subscribe();
    }
  }
}
