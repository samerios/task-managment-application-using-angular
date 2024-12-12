import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/auth/services/auth-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService, private authService: AuthService) {
    this.translate.addLangs(['en', 'he']);
    this.translate.setDefaultLang('en');

    let browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.use(browserLang.match(/en|he/) ? browserLang : 'en');
  }

  public isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
