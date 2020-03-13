import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './login.component.html',
})

export class LoginComponent implements OnInit, OnDestroy {
    userName = '';
    password = '';
    adminTavernInput = '';
    selected: any;
    showSignup = false;
    isAdmin = false;
    Taverns = [{
        Id:1,
        Name:"John's Tavern"
      },
      {
        Id:2,
        Name:"Moe's Tavern"
      },
      {
       Id:3,
        Name:"Kate's Tavern"
      }];

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {
        console.log('comes on the screen');
    }

    ngOnDestroy(): void {
        console.log('its destroyed')
    }

    toggleSignup(): void {
        this.showSignup = !this.showSignup,
            this.userName = '',
            this.password = '',
            this.isAdmin = false
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
            tavern: {
                TavernID: this.selected.Id,
                TavernName: this.isAdmin ? this.adminTavernInput : this.selected.Name,
            }
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

    toggleAdmin(event) {
        if (event.target.checked) {
            this.isAdmin = true;
            this.adminTavernInput = '';
        }
    }

}