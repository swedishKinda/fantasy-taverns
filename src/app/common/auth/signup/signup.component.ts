import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TavernService, ITavern } from '../../../tavern-services/tavern.service';

@Component({
    templateUrl: './signup.component.html',
})

export class SignupComponent {
    userName = '';
    password = '';
    tavernName = '';
    Id = '';
    taverns: ITavern[];
    tavern: ITavern;
    selected: any;
    isAdmin = false;

    constructor(private authService: AuthService, private router: Router, private tavernService: TavernService) { }

    ngOnInit(): void {
        this.tavernService.getTaverns().subscribe((tavernList) => {
            this.taverns = tavernList;
        });
    }

    signup(): void {
        const payload = {
            UserName: this.userName,
            Password: this.password,
            Tavern: {
                Id: String(this.tavern.ID),
                TavernName: this.tavernName
            }
        };
        console.log(payload);

        this.authService.create(payload).subscribe(
            (user) => {
                if (user) {
                    console.log('Successfuly Signed Up!');
                }
            },
            (error) => {
                console.log(error);
            },
        );
    }

    adminSignup(): void {
        const adminUser = {
            UserName: this.userName,
            Password: this.password,
            TavernName: this.tavernName,
        };
        this.authService.create(adminUser).subscribe((answer) => {
            this.router.navigateByUrl('/login');
        });
    }

    toggleAdmin(event): void {
        if (event.target.checked) {
            this.isAdmin = true;
            this.tavernName = '';
            this.Id = '0';
        }
    }

}