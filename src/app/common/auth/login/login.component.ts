import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernsService } from './taverns.service';

@Component({
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    showSignup = false;

    constructor(private router: Router, private authService: AuthService, private tavernsService: TavernsService) { }

    ngOnInit(): void {
        console.log('comes on the screen');
    }

    ngOnDestroy(): void {
        console.log('its destroyed')
    }

    toggleSignup(): void {
        this.showSignup = !this.showSignup,
            this.userName = '',
            this.password = ''
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
            UserName: this.userName,
            Password: this.password,
            // TavernID: this.pickTavern,
            // TavernName: this.adminTavernInput
        }
        console.log(payload);

        this.authService.signup(payload).subscribe(
            (user) => {
                this.router.navigateByUrl('/login');
            },
            (error) => {
                console.log(error);
            },
        );
    }
}