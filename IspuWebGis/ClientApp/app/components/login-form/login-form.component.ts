import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { AuthService } from "../../services/auth.service";

import { User, Token } from "../../classes/auth";

@Component({
    selector: 'login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

    user: User = new User();
    @Output() onLogged: EventEmitter<Token> = new EventEmitter<Token>();

    constructor(
        private authService: AuthService) {
    }

    ngOnInit() {
    }

    get isLogged() {
        let savedToken = AuthService.getToken();
        return savedToken != null && savedToken.length > 5;
    }

    login() {
        this.authService.login(this.user)
            .then((data: Token) => this.onLoggedSuccessfully(data));
    }

    register() {
        this.authService.register(this.user)
            .then((data: Token) => this.onLoggedSuccessfully(data));
    }

    onLoggedSuccessfully(data:Token) {
        console.log(data);
        localStorage["token"] = data.token;

        this.onLogged.emit(data);
    }

    logout() {
        localStorage.removeItem("token");
    }
}