import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    showSignup = false;
    // showLogin = true;

    constructor(private router: Router, private authService: AuthService) {}

    ngOnInit(): void {
        console.log('comes on the screen');
    }

    ngOnDestroy(): void {
        console.log('its destroyed')
    }

    toggleSignup(): void {
        this.showSignup = !this.showSignup,
        this.userName='',
        this.password=''
    }

    toggleLogin (): void {
        this.showSignup = !this.showSignup,
        this.userName='',
        this.password=''
    }

    login(): void {
        this.authService.login(this.userName, this.password).subscribe(
            (response) => {
                if (response.success) {
                    console.log('successful login');
                    this.router.navigateByUrl('/home');
                }
            },
            (error) => {
                console.log('username/password incorrect');
            },
        );
    }

    signup(): void {
        const payload = {
            email: this.userName,
            password: this.password
        }
        console.log(payload);
    }

}
