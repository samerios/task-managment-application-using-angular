import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'he']);
    this.translate.setDefaultLang('en');

    let browserLang = this.translate.getBrowserLang() || 'en';
    this.translate.use(browserLang.match(/en|he/) ? browserLang : 'en');
  }
}
