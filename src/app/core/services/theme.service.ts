import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  themeSignal = signal<string>("light");

  setTheme(theme: string) {
    this.themeSignal.set(theme);
  }

  updateTheme(theme: string) {
    this.themeSignal.update(() => theme);
    if (theme == 'dark') {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }
  }
}
