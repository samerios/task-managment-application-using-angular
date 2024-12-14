import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class LoginIndexComponent implements OnInit {

  form!: FormGroup;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private _snackBar: MatSnackBar, private translate: TranslateService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      emailOrUsername: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.form.valid) {
      this.isLoading = true
      setTimeout(() => {
        this.authService.login(this.form.value).subscribe({
          next: (response: { token: string, user: User }) => {
            this.userService.setUser(response)
            this.isLoading = false;
            this.router.navigate(['/tasks']);
          },
          error: (err) => {
            this.isLoading = false;
            this.openSnackBar(this.translate.instant("SYSTEM.LOGIN_FAILED.HEADER"), this.translate.instant("SYSTEM.LOGIN_FAILED.CONTENT"))
            console.error('Login failed', err);
          },
        });
      }, 1000);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}