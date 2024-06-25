import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class LoginIndexComponent implements OnInit {

  form!: FormGroup;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar, private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      this.isLoading = true;
      // Handle the login logic here
      setTimeout(() => {

        this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value).pipe(take(1)).subscribe(
          () => {
            this.isLoading = false;
            this.router.navigate(['/tasks']);
          },
          error => {
            this.isLoading = false;
            this.openSnackBar(this.translate.instant("SYSTEM.LOGIN_FAILED.HEADER"), this.translate.instant("SYSTEM.LOGIN_FAILED.CONTENT"))
            console.error('Login failed', error);
          }
        )
      }, 1000)
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}