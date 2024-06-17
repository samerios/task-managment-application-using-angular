import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth-service.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  form!: FormGroup;

  isLoading: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) {
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

        this.authService.login(this.form.get('username')?.value, this.form.get('password')?.value).subscribe((res: null | {}) => {
          this.isLoading = false;
          if (!res) console.error('Login failed', 'Incorrect Username or password');
          else {
            this.localStorageService.setItem('isLoggedIn', true)
            this.router.navigate(['/dashboard']);
          }
        })
      }, 1000)
    }
  }
}