import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User, Token } from '../classes/auth';

@Injectable()
export class AuthService {
    private static readonly DOMAIN = "http://webappbackend.azurewebsites.net";

    private static readonly REGISTER_URI: string = `${AuthService.DOMAIN}/api/auth/newuser`;
    private static readonly LOGIN_URI: string = `${AuthService.DOMAIN}/api/auth/authorize`;

    constructor(private http: Http) { }

    static getToken() {
        let token = localStorage.getItem("token");
        if (token == null || token == "null" || token.length <= 5) return "token";  // HARDCODED value for test and demo
        return token;
    }

    login(user: User): Promise<Token> {
        return this.http.post(AuthService.LOGIN_URI, user)
            .map((resp:any) => {
                let r: any = JSON.parse(resp["_body"]);
                return new Token(r["token"], r["tokenExpDate"]);
            })
            .toPromise();
    }

    register(user: User): Promise<Token> {
        return this.http.post(AuthService.REGISTER_URI, user)
            .map((resp: any) => {
                let nextYear: Date = new Date();
                nextYear.setFullYear(nextYear.getFullYear() + 1);

                let r: any = JSON.parse(resp["_body"]);
                return new Token(r["token"], nextYear.getTime());
            })
            .toPromise();
    }
}