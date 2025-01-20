import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from 'src/app/core/services/account.service';
import { take } from 'rxjs';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class LoginIndexComponent implements OnInit {
  loginForm!: FormGroup;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      // this.isLoading = true;
      // setTimeout(() => {
      this.accountService
        .login(this.loginForm.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.isLoading = false;
            this.accountService.getUserInfo().pipe(take(1)).subscribe();
            this.router.navigate(['/tasks']);
            /*              this.userService.setUser(response);
              this.isLoading = false;
              this.router.navigate(['/tasks']); */
          } /* ,
            error: (err) => {
              this.isLoading = false;
              this.openSnackBar(
                this.translate.instant('SYSTEM.LOGIN_FAILED.HEADER'),
                this.translate.instant('SYSTEM.LOGIN_FAILED.CONTENT')
              );
              console.error('Login failed', err);
            }, */,
        });
      //  }, 100);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}
