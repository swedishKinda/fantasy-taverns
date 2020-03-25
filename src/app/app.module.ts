import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './common/auth/login/login.component';
import { TokenInterceptor } from './common/auth/token.interceptor';
import { HomeComponent } from './home.component';
import { SignupComponent } from './common/auth/signup/signup.component';
import { MyTavernComponent } from './my-tavern/my-tavern.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, LoginComponent, HomeComponent, SignupComponent, MyTavernComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        AppRoutingModule,
        CookieModule.forRoot(),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ],
})
export class AppModule {}
