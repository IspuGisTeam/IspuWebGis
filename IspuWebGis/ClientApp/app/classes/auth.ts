export class User {
    public username: string;
    public password: string;
}

export class Token {
    constructor(
        public token: String = "",
        public tokenExpTime: number = 0)
    { }
}