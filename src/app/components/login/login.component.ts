import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login!: FormGroup;
  fb = inject(FormBuilder);

  constructor(private router: Router) {}

  ngOnInit() {
    this.authLogin();
  }

  authLogin() {
    this.login = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
    });
  }

  onlogin() {
    console.log(this.login.value);
    const storeData = this.login.value;
    localStorage.setItem('user', JSON.stringify(storeData));
    this.router.navigateByUrl('/quiz');
  }
}
