import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    templateUrl: './signup.component.html',
})

export class SignupComponent {
    userName = '';
    password = '';
    // tavernName = '';
    tavernID = '';

    constructor(private authService: AuthService, private router: Router) { }

    signup(): void {
        const user = {
            UserName: this.userName,
            Password: this.password,
            Tavern: {
                Id: this.tavernID
                
            }
        };
        console.log(user)
        this.authService.create(user).subscribe((answer) => {
            this.router.navigateByUrl('/login');
        });
    }

    adminSignup(): void {
        const adminUser = {
            UserName: this.userName,
            Password: this.password,
            // TavernName: this.tavernName,
        };
        this.authService.create(adminUser).subscribe((answer) => {
            this.router.navigateByUrl('/login');
        });
    }
}