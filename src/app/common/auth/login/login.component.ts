import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './login.component.html',
})

export class LoginComponent {
    loginForm = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(private router: Router, private authService: AuthService) {}

    login(): void {
        
        console.log(this.loginForm);

        this.authService
            .login(this.loginForm.value.userName, this.loginForm.value.password)
            .subscribe(
                (response) => {
                    if (response.success) {
                        console.log('successful login');
                        this.router.navigateByUrl('/taverns');
                    }
                },
                (error) => {
                    console.log('username/password incorrect');
                },
            );
    }
}